import React, { useState, useEffect } from "react";
import { View, StyleSheet, Pressable } from "react-native";

import { SimpleGrid } from "native-base";
import Ingredient from "./Ingredient";

const Ingredients = ({ ingredients, IDList, setIDList }) => {
  return (
    <SimpleGrid columns={3} width="100%">
      {ingredients.map((ingredient) => (
        <Ingredient
          key={ingredient.id}
          ingredient={ingredient}
          IDList={IDList}
          setIDList={setIDList}
        />
      ))}
    </SimpleGrid>
  );
};

export default Ingredients;
