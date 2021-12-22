import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, Alert, BackHandler } from "react-native";
import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AppContext } from "./services/AppContext";

import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";

// import { AppContextProvider } from "./services/AppContext";

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    const backAction = () => {
      Alert.alert("Hold on", "Are you sure you want to quit?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        { text: "YES", onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const [Data, setData] = useState({
    shopList: [
      {
        id: 1,
        ingredientIcon: "🥕",
        ingredientName: "Carrot",
        ingredientQTY: 2,
        ingredientUnit: "pack",
        accquired: false,
      },
    ],
    storage: [
      {
        expiration: 1,
        id: 1,
        ingredientIcon: "🥕",
        ingredientName: "Carrot",
        ingredientQTY: 2,
        ingredientUnit: "pack",
        accquired: false,
      },
      {
        expiration: 3,
        id: 2,
        ingredientIcon: "🍅",
        ingredientName: "Tomato",
        ingredientQTY: 2,
        ingredientUnit: "pack",
        accquired: false,
      },
      {
        expiration: 5,
        id: 3,
        ingredientIcon: "🍇",
        ingredientName: "Grape",
        ingredientQTY: 1,
        ingredientUnit: "Box",
        accquired: false,
      },
    ],
  });
  console.log(Data);
  return (
    <NativeBaseProvider>
      <AppContext.Provider value={{ Data, setData }}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              options={{ headerShown: false }}
              name="Login"
              component={LoginScreen}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="Home"
              component={HomeScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </AppContext.Provider>
    </NativeBaseProvider>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
