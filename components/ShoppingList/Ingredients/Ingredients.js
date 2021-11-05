import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";

import {
  Box,
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

const Ingredients = ({ ingredients, onDelete, onFinish, a }) => {
  const [error, setError] = useState(null);

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
                <Heading>{ingredient.ingredientIcon}</Heading>
                <Text
                  _dark={{
                    color: "warmGray.50",
                  }}
                  color="coolGray.800"
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
            <Checkbox
              value="test"
              accessibilityLabel="This is a dummy checkbox"
              size="lg"
            />
          </HStack>
        </Box>
      ))}
    </Box>
  );
};

const styles = StyleSheet.create({});

export default Ingredients;
