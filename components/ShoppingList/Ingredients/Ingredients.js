import React from "react";
import { View, StyleSheet } from "react-native";

import {
  Box,
  FlatList,
  Heading,
  Avatar,
  HStack,
  VStack,
  Text,
  Spacer,
  Center,
  NativeBaseProvider,
} from "native-base";

const Ingredients = ({ ingredients, onDelete, onFinish, a }) => {
  return (
    <Box>
      {ingredients.map((ingredient) => (
        <Box
          key={ingredient.id}
          borderBottomWidth="1"
          _dark={{
            borderColor: "gray.600",
          }}
          borderColor="coolGray.200"
          pl="4"
          pr="5"
          py="2"
        >
          <HStack space={3} justifyContent="space-between">
            <VStack>
              <Text
                _dark={{
                  color: "warmGray.50",
                }}
                color="coolGray.800"
                bold
              >
                {ingredient.ingredientName}
              </Text>
              <Text
                color="coolGray.600"
                _dark={{
                  color: "warmGray.200",
                }}
              >
                {ingredient.ingredientQTY}
              </Text>
            </VStack>
            <Spacer />

            <Text
              fontSize="xs"
              _dark={{
                color: "warmGray.50",
              }}
              color="coolGray.800"
              alignSelf="flex-start"
            ></Text>
          </HStack>
        </Box>
      ))}
    </Box>
  );
};

const styles = StyleSheet.create({});

export default Ingredients;
