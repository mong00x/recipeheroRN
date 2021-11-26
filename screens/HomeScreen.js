import React, { useState, useEffect } from "react";

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
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Dimensions } from "react-native";

import { auth } from "../firebase";

import { useNavigation } from "@react-navigation/core";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import ShoppingList from "../components/ShoppingList/ShoppingList";
import Storage from "../components/Storage/Storage";

const HomeScreen = () => {
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

  return (
    // <SafeAreaView>
    //
    //
    //       <Flex direction="row" justifyContent="space-between" flexWrap="wrap">
    //         <Heading>Good Day</Heading>
    //         <TouchableOpacity onPress={handleSignOut}>
    //           <Circle size={36} bg="secondary.400">
    //             <Ionicons name="log-out-outline" size={24} color="white" />
    //           </Circle>
    //         </TouchableOpacity>
    //       </Flex>

    //       {/* <TouchableOpacity onPress={addList}>
    //       <Text>Create a new Shopping List</Text>
    //     </TouchableOpacity> */}
    //     </Box>
    //   </ScrollView>
    <Tab.Navigator
      backBehavior="none"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#e91e63",
        tabBarStyle: {
          zIndex: 99,
          position: "absolute",
          height: wh7_5,
          paddingBottom: 10,
        },
      }}
    >
      <Tab.Screen
        name="Shop List"
        component={ShoppingList}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cart-outline" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Storage"
        component={Storage}
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
  );
};

export default HomeScreen;
