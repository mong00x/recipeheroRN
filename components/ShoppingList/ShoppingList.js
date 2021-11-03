import React, { useState, useEffect } from "react";

import {
  Actionsheet,
  Box,
  Input,
  Select,
  Fab,
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

import Data from "../../data.json";

import Ingredients from "./Ingredients/Ingredients";

const Shoppinglist = () => {
  const [shopList, setshopList] = useState([...Data["shopList"]]);
  const [ingName, setIngName] = useState("");
  const [ingQTY, setIngQTY] = useState("");
  const [unit, setUnit] = useState("");
  const [alert, setAlert] = useState(false);

  // actionsheet state
  const { isOpen, onOpen, onClose } = useDisclose();

  const isEisEmptyOrSpaces = (input) => {
    return input.toString() === null || input.toString().match(/^ *$/) !== null;
  };

  // add new ingredient into shoplist
  const addIngredient = (ingredient) => {
    if (!isEisEmptyOrSpaces(ingName) && !isEisEmptyOrSpaces(ingQTY)) {
      const id = shopList.length !== 0 ? shopList.slice(-1)[0].id + 1 : 0;
      // auto incerased ID id is the new ID for newTask, id = lastestId + 1 OR 0
      // When task list is not empty, read the id of last object in the list then + 1; else assign with 0
      const newIngredient = { id, ...ingredient, accquired: false };
      setshopList([...shopList, newIngredient]);
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
    setshopList(shopList.filter((ingredient) => ingredient.id !== id));
    console.log([...shopList]);
  };

  // finish ingredient, ingredient finished will be diasabled
  const finishIngredient = (id) => {
    setshopList(
      shopList.map((ingredient) =>
        ingredient.id === id
          ? { ...ingredient, accquired: !ingredient.accquired }
          : ingredient
      )
    );
  };

  return (
    <VStack space={2} mt={3}>
      <Heading fontSize="28">Shopping List</Heading>
      <Fab
        onPress={onOpen}
        position="absolute"
        size="sm"
        icon={<Icon color="white" as={<Feather name="plus" />} size="sm" />}
      />

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
                  onChangeText={(v) => setIngName(v)}
                />
              </FormControl>

              <FormControl w={20}>
                <FormControl.Label>qty.</FormControl.Label>
                <Input
                  placeholder="QTY"
                  value={ingQTY}
                  keyboardType="decimal-pad"
                  onChangeText={(v) => setIngQTY(parseInt(v))}
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
                  onValueChange={(itemValue) => setUnit(itemValue)}
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
      {shopList.length > 0 ? (
        // pass function props into shopList component
        <Ingredients
          Ingredients={shopList}
          onFinish={finishIngredient}
          onDelete={deleteIngredient}
        />
      ) : (
        "🛒 is empty, click + to add new shopList"
      )}
    </VStack>
  );
};

export default Shoppinglist;
