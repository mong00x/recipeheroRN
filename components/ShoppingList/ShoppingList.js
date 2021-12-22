import React, { useState, useEffect, useContext } from "react";

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

import { FontAwesome5, Feather } from "@expo/vector-icons";
import { Dimensions, TouchableOpacity } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

// import Context as data

// const { EmojiService } = require("m3o/emoji");
import { EmojiService } from "m3o/emoji";

import Ingredients from "./Ingredients/Ingredients";

const Shoppinglist = ({
  Data,
  setData,
  shopList,
  setShopList,
  storage,
  setStorage,
}) => {
  console.log(storage);

  // const [storage, setStorage] = useState(Data.storage);
  const [ingName, setIngName] = useState("");
  const [ingQTY, setIngQTY] = useState();
  const [unit, setUnit] = useState("");
  const [alert, setAlert] = useState(false);

  const [emojis, setEmojis] = useState([]);
  const [emojiIcon, setEmojiIcon] = useState("");

  // actionsheet state
  const { isOpen, onOpen, onClose } = useDisclose();

  const wh82_5 = Dimensions.get("window").height * 0.825;

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
    } else {
      return await "🤷";
    }
  };

  const isEmptyOrSpaces = (input) => {
    return input.toString() === null || input.toString().match(/^ *$/) !== null;
  };

  // add new ingredient into shoplist
  const addIngredient = (ingredient) => {
    if (
      ingName &&
      ingQTY &&
      !isEmptyOrSpaces(ingName) &&
      !isEmptyOrSpaces(ingQTY)
    ) {
      if (ingName.slice(-1) === " ") {
        ingredient.ingredientName = ingName.slice(0, -1);
      }
      const id = shopList.length !== 0 ? shopList.slice(-1)[0].id + 1 : 0;
      // auto incerased ID id is the new ID for newTask, id = lastestId + 1 OR 0
      // When task list is not empty, read the id of last object in the list then + 1; else assign with 0
      const newIngredient = { id, ...ingredient, accquired: false };
      findEmoji(ingredient.ingredientName).then((res) => {
        newIngredient.ingredientIcon = res;
        setShopList([...shopList, newIngredient]);
      });
      // console.log(newIngredient);
      setEmojiIcon("");
      setIngName("");
      setIngQTY("");
      setUnit("");
    } else {
      setAlert(true);
    }
    setData({ shopList, storage });
  };

  // delete ingredient from data
  const deleteIngredient = (id) => {
    setShopList(shopList.filter((ingredient) => ingredient.id !== id));
  };

  // finish ingredient, ingredient finished will be diasabled
  // what have I done...............
  const finishIngredient = (id) => {
    //
    setShopList(
      shopList.map((ingredient) =>
        ingredient.id === id ? { ...ingredient, accquired: true } : ingredient
      )
    );
    const newStorageIng = shopList.filter((ingredient) => ingredient.id === id);
    // console.log(storage);
    newStorageIng[0].id =
      storage.length !== 0 ? storage.slice(-1)[0].id + 1 : 0;
    newStorageIng[0].expiration = 7;
    // console.log(...newStorageIng);

    setStorage([...storage, ...newStorageIng]);
    // console.log(storage);
  };

  // // useEffect to update to Context everytime rerender
  // useEffect(() => {
  //   // console.log("useEffect triggered");
  //   setData({
  //     shopList: [...shopList],
  //     storage: [...storage],
  //   });
  //   // console.log(Data);
  // }, [shopList, storage]);

  return (
    <Box>
      <VStack space={2} mt={3}>
        <Heading px={3} fontSize="28">
          Shopping List
        </Heading>

        <ScrollView px={3} height="90%">
          {shopList.length > 0 ? (
            // pass function props into shopList component
            <Ingredients
              ingredients={shopList}
              onFinish={finishIngredient}
              onDelete={deleteIngredient}
            />
          ) : (
            <Text fontSize="xl">
              🛒 Nothing here, click + to add a new item
            </Text>
          )}
          <Box height="20" bottom="0">
            {" "}
          </Box>
        </ScrollView>
      </VStack>
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <Box w="100%" px={4}>
            <Button
              zIndex="99"
              w={8}
              h={8}
              position="absolute"
              right="4"
              borderRadius="sm"
              variant="solid"
              onPress={() => {
                addIngredient({
                  ingredientName: ingName,
                  ingredientQTY: ingQTY,
                  ingredientUnit: unit,
                });
              }}
            >
              <Icon as={Feather} name="plus" color="warmGray.50" />
            </Button>

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
                <FormControl.Label>Quantity</FormControl.Label>
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
      <Button
        zIndex="99"
        right="6%"
        top="84%"
        borderRadius="full"
        onPress={onOpen}
        position="absolute"
        width="48px"
        height="48px"
        bg="white"
        shadow="9"
      >
        <Icon color="black" as={<Feather name="plus" />} size="sm" />
      </Button>
      {/* add button  */}
    </Box>
  );
};

export default Shoppinglist;
