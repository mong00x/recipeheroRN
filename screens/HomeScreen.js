import React, { useState, useEffect } from "react";

import { StyleSheet, TouchableOpacity } from "react-native";
import {
  Box,
  Circle,
  Center,
  VStack,
  Flex,
  Heading,
  Text,
  View,
} from "native-base";

import { Ionicons } from "@expo/vector-icons";
import { auth } from "../firebase";

import { useNavigation } from "@react-navigation/core";
import { SafeAreaView } from "react-native-safe-area-context";

import ShoppingList from "../components/ShoppingList/ShoppingList";

const HomeScreen = () => {
  const [shopList, setShopList] = useState(null);

  const navigation = useNavigation();
  const user = auth.currentUser;

  useEffect(() => {});

  const handleSignOut = () => {
    auth.signOut().then(() => {
      console.log(user.email, "Signed out");
      navigation.replace("Login");
    });
  };

  const addList = () => {
    navigation.replace("ShopList");
  };

  return (
    <SafeAreaView>
      <Box mt={3} mx={5}>
        <Flex direction="row" justifyContent="space-between" flexWrap="wrap">
          <Heading>Hi, {auth.currentUser?.email}</Heading>
          <TouchableOpacity onPress={handleSignOut}>
            <Circle size={36} bg="secondary.400">
              <Ionicons name="log-out-outline" size={24} color="white" />
            </Circle>
          </TouchableOpacity>
        </Flex>
        <ShoppingList />
        {/* <TouchableOpacity onPress={addList}>
          <Text>Create a new Shopping List</Text>
        </TouchableOpacity> */}
      </Box>
    </SafeAreaView>
  );
};

export default HomeScreen;
