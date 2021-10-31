import React, { useState, useEffect } from "react";
import {
  Actionsheet,
  Box,
  Button,
  Input,
  Select,
  CheckIcon,
  Fab,
  FormControl,
  HStack,
  Heading,
  IconButton,
  Icon,
  FlatList,
  Avatar,
  Flex,
  VStack,
  Text,
  Spacer,
  Center,
  useDisclose,
} from "native-base";

import { FontAwesome5, Feather, Entypo } from "@expo/vector-icons";

import { auth } from "../firebase";
import { database } from "../firebase";
const Shoppinglist = () => {
  const [shoppingList, setShoppingList] = useState(null);

  const [ingName, setIngName] = useState("");
  const [ingQTY, setIngQTY] = useState("");
  const [unit, setUnit] = useState("");

  useEffect(() => {
    const ref = database.ref("ShoppingList/");
    ref.on("value", (snapshot) => {
      setShoppingList(snapshot.val());
      console.log(snapshot.val());
    });
    return ref.off();
  }, []);

  const { isOpen, onOpen, onClose } = useDisclose();

  const writeShopplingList = (IngId, IngName, IngQTY) => {
    database.ref("shoppingList/" + IngId).set({
      ingredientname: IngName,
      ingredientQTY: IngQTY,
    });
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
                addItem(inputValue);
                setInputValue("");
              }}
            />
            <Heading>+ Add item</Heading>
            <HStack my={12} space={4}>
              <FormControl isRequired isInvalid flexShrink="1">
                <FormControl.Label>Name</FormControl.Label>
                <Input
                  placeholder="ingredient name"
                  onChangeText={(v) => setIngName(v)}
                />
              </FormControl>
              <FormControl isRequired isInvalid w={20}>
                <FormControl.Label>qty.</FormControl.Label>
                <Input placeholder="QTY" keyboardType="decimal-pad" />
              </FormControl>
              <FormControl isRequired isInvalid w={20}>
                <FormControl.Label>unit.</FormControl.Label>
                <Select
                  selectedValue={unit}
                  accessibilityLabel="Choose ingredient Unit"
                  placeholder="-"
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
          </Box>

          {/* <Box w="100%" h={60} px={4} justifyContent="center">
            <Text
              fontSize="16"
              color="gray.500"
              _dark={{
                color: "gray.300",
              }}
            >
              Albums
            </Text>
          </Box>
          <Actionsheet.Item>Delete</Actionsheet.Item>
          <Actionsheet.Item>Share</Actionsheet.Item>
          <Actionsheet.Item>Play</Actionsheet.Item>
          <Actionsheet.Item>Favourite</Actionsheet.Item>
          <Actionsheet.Item>Cancel</Actionsheet.Item>*/}
        </Actionsheet.Content>
      </Actionsheet>
    </VStack>
  );
};

export default Shoppinglist;
