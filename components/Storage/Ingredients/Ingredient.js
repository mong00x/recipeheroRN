import React, { useState, useEffect } from "react";
import { Pressable, StyleSheet } from "react-native";
import { Box, VStack, Text } from "native-base";
import Chart from "./Chart";

const Ingredient = ({ ingredient, IDList, setIDList }) => {
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    if (selected) {
      setIDList([...IDList, ingredient.id]);
      console.log(IDList);
    } else {
      setIDList(IDList.filter((ID) => ID !== ingredient.id));
      console.log(IDList);
    }
  }, [selected]);

  return (
    <Pressable
      onPress={() => {
        setSelected(!selected);
        console.log(selected);
      }}
    >
      <Box
        px="1"
        py="3"
        mx={selected ? "1" : "2"}
        my={selected ? "1" : "2"}
        background="white"
        borderRadius={5}
        alignItems="center"
        borderWidth={selected ? "4px" : "0"}
        borderColor="cyan.500"
      >
        <VStack alignItems="center" justifyContent="center">
          <Chart Data={ingredient.expiration} />
          <Box position="absolute">
            <Text fontSize="50px">{ingredient.ingredientIcon}</Text>
          </Box>
        </VStack>
        <Text fontSize="20px" fontWeight="bold" textAlign="center">
          {ingredient.ingredientName}
        </Text>
        <Text color="coolGray.400" textAlign="center">
          {ingredient.ingredientQTY} {ingredient.ingredientUnit}
        </Text>
        {ingredient.expiration < 1 ? (
          <Text
            fontSize="12px"
            color="red"
            fontWeight="bold"
            textAlign="center"
          >
            Expired
          </Text>
        ) : ingredient.expiration < 2 ? (
          <Text
            fontSize="12px"
            color="#ff1f1f"
            fontWeight="bold"
            textAlign="center"
          >
            {ingredient.expiration} Day
          </Text>
        ) : (
          <Text fontSize="12px" fontWeight="bold" textAlign="center">
            {ingredient.expiration} Days
          </Text>
        )}
      </Box>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  selected: {},
});
export default Ingredient;
