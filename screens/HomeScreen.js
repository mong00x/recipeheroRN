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
import { Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { auth } from "../firebase";

import { useNavigation } from "@react-navigation/core";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import ShoppingList from "../components/ShoppingList/ShoppingList";
import Storage from "../components/Storage/Storage";

const HomeScreen = () => {
  const [tab, setTab] = useState("ShopList");

  const navigation = useNavigation();
  const Tab = createBottomTabNavigator();

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
    <Tab.Navigator>
      <Tab.Screen
        name="Shop List"
        component={ShoppingList}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Storage"
        component={Storage}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default HomeScreen;
