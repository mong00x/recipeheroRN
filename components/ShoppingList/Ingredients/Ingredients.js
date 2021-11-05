import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";

import {
  Box,
  Button,
  Checkbox,
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

import { TouchableOpacity } from "react-native";

import { Ionicons } from "@expo/vector-icons";

const Ingredients = ({ ingredients, onDelete, onFinish, a }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Box>
      {ingredients.map((ingredient) => (
        <Box
          key={ingredient.id}
          borderTopWidth="1"
          borderBottomWidth="1"
          _dark={{
            borderColor: "gray.600",
          }}
          borderColor="coolGray.200"
          pl="4"
          pr="5"
          py="3"
        >
          <HStack space={3} justifyContent="space-between">
            <VStack>
              <HStack space={3}>
                {ingredient.accquired ? (
                  <TouchableOpacity onPress={() => onFinish(ingredient.id)}>
                    <Ionicons name="checkbox-outline" size={24} color="#333" />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity onPress={() => onFinish(ingredient.id)}>
                    <Ionicons name="square-outline" size={24} color="#333" />
                  </TouchableOpacity>
                )}
                <Heading>{ingredient.ingredientIcon}</Heading>
                <Text
                  strikeThrough={ingredient.accquired}
                  color={!ingredient.accquired ? "#333" : "#999"}
                  fontSize="lg"
                  bold
                  w={100}
                >
                  {ingredient.ingredientName}
                </Text>
                <Text
                  color="coolGray.400"
                  _dark={{
                    color: "warmGray.200",
                  }}
                  alignSelf="center"
                >
                  {ingredient.ingredientQTY}
                </Text>
                <Text
                  fontSize="xs"
                  _dark={{
                    color: "warmGray.50",
                  }}
                  color="coolGray.400"
                  alignSelf="center"
                >
                  {ingredient.ingredientUnit}
                </Text>
              </HStack>
            </VStack>
            {/* <HStack> */}

            <TouchableOpacity onPress={() => onDelete(ingredient.id)}>
              <Ionicons name="trash-outline" size={24} color="#ff4949" />
            </TouchableOpacity>
            {/* </HStack> */}
          </HStack>
        </Box>
      ))}
    </Box>
  );
};

const styles = StyleSheet.create({});

export default Ingredients;
