import React, { useState, useEffect, useContext } from "react";

import { StyleSheet, TouchableOpacity } from "react-native";
import {
  Box,
  Circle,
  Center,
  VStack,
  Flex,
  Heading,
  ScrollView,
  Text,
  View,
  HStack,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Dimensions } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { auth } from "../firebase";

import { useNavigation } from "@react-navigation/core";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import ShoppingList from "../components/ShoppingList/ShoppingList";
import Storage from "../components/Storage/Storage";
import { AppContext } from "../services/AppContext";

const HomeScreen = () => {
  const { Data, setData } = useContext(AppContext);
  const [storage, setStorage] = useState(Data.storage);
  // console.log(storage);
  const [shopList, setShopList] = useState(Data.shopList);
  useEffect(() => {
    // console.log("useEffect triggered");
    setData({
      shopList: [...shopList],
      storage: [...storage],
    });
    setStorage(Data.storage);
    // console.log(Data);
  }, []);

  const [tab, setTab] = useState("ShopList");

  const navigation = useNavigation();
  const Tab = createBottomTabNavigator();
  const wh7_5 = Dimensions.get("window").height * 0.075;

  const user = auth.currentUser;

  const handleSignOut = () => {
    auth.signOut().then(() => {
      console.log(user.email, "Signed out");
      navigation.replace("Login");
    });
  };

  const vh = Dimensions.get("window").height;
  return (
    // <SafeAreaView>
    //
    //

    <SafeAreaView height="100%">
      <HStack px={3} justifyContent="space-between">
        <Heading>Hi {user.email.match(/^([^@]*)@/)[1]} 👋</Heading>
        <TouchableOpacity onPress={handleSignOut}>
          <HStack
            px={2}
            borderRadius="full"
            bg="white"
            shadow="2"
            alignItems="center"
          >
            <Text fontSize="14" fontWeight="bold" paddingRight="4">
              Log out
            </Text>

            <Ionicons name="log-out-outline" size={24} color="black" />
          </HStack>
        </TouchableOpacity>
      </HStack>

      <Tab.Navigator
        backBehavior="none"
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#e91e63",
          tabBarStyle: {
            zIndex: 99,
            position: "absolute",
            height: "8%",
            paddingBottom: 10,
          },
        }}
      >
        <Tab.Screen
          name="Shop List"
          children={() => (
            <ShoppingList
              Data={Data}
              setData={setData}
              shopList={shopList}
              setShopList={setShopList}
              storage={storage}
              setStorage={setStorage}
            />
          )}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="cart-outline" color={color} size={24} />
            ),
          }}
        />
        <Tab.Screen
          name="Storage"
          children={() => (
            <Storage
              Data={Data}
              setData={setData}
              storage={storage}
              setStorage={setStorage}
            />
          )}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="fridge-outline"
                color={color}
                size={24}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default HomeScreen;
