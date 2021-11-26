import React, { useState, useEffect } from "react";

import {
  Actionsheet,
  Box,
  Button,
  Input,
  Select,
  ScrollView,
  FormControl,
  HStack,
  Heading,
  IconButton,
  Icon,
  VStack,
  useDisclose,
  Text,
} from "native-base";

import { FontAwesome5, Feather, Entypo } from "@expo/vector-icons";

import { SafeAreaView } from "react-native-safe-area-context";

import Data from "../../data.json";
// const { EmojiService } = require("m3o/emoji");
import { EmojiService } from "m3o/emoji";

import Ingredients from "./Ingredients/Ingredients";

const Shoppinglist = () => {
  const [shopList, setShopList] = useState([...Data["shopList"]]);
  const [ingName, setIngName] = useState("");
  const [ingQTY, setIngQTY] = useState();
  const [unit, setUnit] = useState("");
  const [alert, setAlert] = useState(false);

  const [emojis, setEmojis] = useState([]);
  const [emojiIcon, setEmojiIcon] = useState("");

  // actionsheet state
  const { isOpen, onOpen, onClose } = useDisclose();

  // useEffect(() => {
  //   fetch(
  //     "https://emoji-api.com/categories/food-drink?access_key=716a1b2db883f658674ad95754873abc0e727ab0"
  //   )
  //     .then((res) => res.json())
  //     .then(
  //       (result) => {
  //         setEmojis(result);
  //       },
  //       // Note: it's important to handle errors here
  //       // instead of a catch() block so that we don't swallow
  //       // exceptions from actual bugs in components.
  //       (error) => {}
  //     );
  // }, []);
  const emojiService = new EmojiService(
    "Njc5ZGMyYzYtNzBlNC00MTBjLTkxMmMtNmU1MzQ0OTZiMTQx"
  );

  const findEmoji = async (name) => {
    name = name.toLowerCase();

    const rsp = await emojiService
      .find({
        alias: ":" + name + ":",
      })
      .catch(() => {
        return "";
      });
    if (await rsp.emoji) {
      return await rsp.emoji;
    }
  };

  // const getEmojIcon = (ingName) => {
  //   console.log("it runs");
  //   const found = emojis.filter((data) => {
  //     // console.log(data.slug.match(`\\b${ingName}\\b`));
  //     var matchRes = data.slug.match(`\\b${ingName}\\b`);
  //     console.log(matchRes);
  //     return data.slug == matchRes ? matchRes[0] : null;
  //   });
  //   console.log(found);
  //   if (found.length) {
  //     return found[0].character;
  //   }
  // };

  const isEisEmptyOrSpaces = (input) => {
    return input.toString() === null || input.toString().match(/^ *$/) !== null;
  };

  // add new ingredient into shoplist
  const addIngredient = (ingredient) => {
    if (
      ingName &&
      ingQTY &&
      !isEisEmptyOrSpaces(ingName) &&
      !isEisEmptyOrSpaces(ingQTY)
    ) {
      const id = shopList.length !== 0 ? shopList.slice(-1)[0].id + 1 : 0;
      // auto incerased ID id is the new ID for newTask, id = lastestId + 1 OR 0
      // When task list is not empty, read the id of last object in the list then + 1; else assign with 0
      const newIngredient = { id, ...ingredient, accquired: false };
      findEmoji(ingredient.ingredientName).then((res) => {
        newIngredient.ingredientIcon = res;
        setShopList([...shopList, newIngredient]);
      });
      console.log(newIngredient);
      setEmojiIcon("");
      setIngName("");
      setIngQTY("");
      setUnit("");
      console.log(shopList);
    } else {
      setAlert(true);
    }
  };

  // delete ingredient from data
  const deleteIngredient = (id) => {
    setShopList(shopList.filter((ingredient) => ingredient.id !== id));
    console.log([...shopList]);
  };

  // finish ingredient, ingredient finished will be diasabled
  const finishIngredient = (id) => {
    setShopList(
      shopList.map((ingredient) =>
        ingredient.id === id
          ? { ...ingredient, accquired: !ingredient.accquired }
          : ingredient
      )
    );
  };

  return (
    <SafeAreaView>
      <VStack space={2} mt={3} px={3}>
        <Heading fontSize="28">Shopping List</Heading>
        <Button
          onPress={onOpen}
          position="absolute"
          size="sm"
          icon={<Icon color="white" as={<Feather name="plus" />} size="sm" />}
        />
        {/* add button  */}

        <ScrollView mt={3} pb={20} height="85vh">
          {shopList.length > 0 ? (
            // pass function props into shopList component
            <Ingredients
              ingredients={shopList}
              onFinish={finishIngredient}
              onDelete={deleteIngredient}
              a="a"
            />
          ) : (
            <Text fontSize="xl">🛒 Nothing here, click + to add new item</Text>
          )}
        </ScrollView>
      </VStack>
      <Actionsheet isOpen={isOpen} onClose={onClose} disableOverlay>
        <Actionsheet.Content>
          <Box w="100%" px={4}>
            <IconButton
              position="absolute"
              right="4"
              borderRadius="sm"
              variant="solid"
              icon={<Icon as={Feather} name="plus" color="warmGray.50" />}
              onPress={() => {
                addIngredient({
                  ingredientName: ingName,
                  ingredientQTY: ingQTY,
                  ingredientUnit: unit,
                });
              }}
            />

            <Heading>+ Add item</Heading>

            <HStack my={12} space={4}>
              <FormControl flexShrink="1">
                <FormControl.Label>Name</FormControl.Label>
                <Input
                  placeholder="ingredient name"
                  value={ingName}
                  onChangeText={(v) => {
                    setIngName(v);
                    setAlert(false);
                  }}
                />
              </FormControl>

              <FormControl w={20}>
                <FormControl.Label>qty.</FormControl.Label>
                <Input
                  placeholder="QTY"
                  value={ingQTY}
                  keyboardType="decimal-pad"
                  onChangeText={(v) => {
                    setIngQTY(v);
                    setAlert(false);
                  }}
                />
              </FormControl>

              <FormControl w={20}>
                <FormControl.Label>unit</FormControl.Label>
                <Select
                  id="unit"
                  selectedValue={unit}
                  accessibilityLabel="Choose ingredient Unit"
                  _selectedItem={{
                    bg: "teal.100",
                  }}
                  onValueChange={(itemValue) => {
                    setUnit(itemValue);
                    setAlert(false);
                  }}
                >
                  <Select.Item label=" — " value="" fontSize="16" />
                  <Select.Item label="Bottle" value="bottle" fontSize="16" />
                  <Select.Item label="Box" value="box" fontSize="16" />
                  <Select.Item label="Can" value="can" fontSize="16" />
                  <Select.Item label="Dozen" value="dozen" fontSize="16" />
                  <Select.Item label="Pack" value="pack" fontSize="16" />
                </Select>
              </FormControl>
            </HStack>
            {alert && <Text color="red.500">Please input Name and QTY</Text>}
          </Box>
        </Actionsheet.Content>
      </Actionsheet>
    </SafeAreaView>
  );
};

export default Shoppinglist;
