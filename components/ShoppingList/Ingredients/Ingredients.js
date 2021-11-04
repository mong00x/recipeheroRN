import React, { useState, useEffect } from "react";
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
  const [error, setError] = useState(null);
  const [emojis, setEmojis] = useState([]);
  const [emjIcon, setEmjIcon] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   fetch(
  //     "https://emoji-api.com/categories/food-drink?access_key=b6370aa8fa0cae5f52f26ff86be122de40169e6d"
  //   )
  //     .then((res) => res.json())
  //     .then(
  //       (result) => {
  //         setEmojis(result);
  //       },
  //       // Note: it's important to handle errors here
  //       // instead of a catch() block so that we don't swallow
  //       // exceptions from actual bugs in components.
  //       (error) => {
  //         setError(error);
  //       }
  //     );
  // }, []);

  // const getEmjIcon = (ingName) => {
  //   console.log("it runs");
  //   ingName = ingName.toLowerCase();
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
              <HStack space={3}>
                {/* <Heading>{getEmjIcon(ingredient.ingredientName)}</Heading> */}
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
              </HStack>
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
