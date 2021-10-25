import React, { useState, useEffect } from "react";

import { StyleSheet, TouchableOpacity } from "react-native";
import { Center, VStack, HStack, Heading, Text, View } from "native-base";

import { Ionicons } from "@expo/vector-icons";
import { auth } from "../firebase";
import { database } from "../firebase";

import { useNavigation } from "@react-navigation/core";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = () => {
  const [name, setName] = useState();
  const dbRef = database.ref("hello/");
  console.log(dbRef);

  const navigation = useNavigation();
  const user = auth.currentUser;

  useEffect(() => {
    const getData = async () => {
      await dbRef.once("value").then((snap) => {
        const data = snap.val();
        updateData(data);
      });
    };
    getData();
  }, []);

  const updateData = (data) => {
    const D = data;
    console.log(D);
  };

  const handleSignOut = () => {
    auth.signOut().then(() => {
      console.log(user.email, "Signed out");
      navigation.replace("Login");
    });
  };

  const addList = () => {
    navigation.replace("ShopList");
  };

  const addData = (ingredientName = "Meat") => {
    set(ref(database, "shopList/"), {
      ingredientName: IngredientName,
    });
  };

  return (
    <Center flex={1} px="3">
      <SafeAreaView>
        <VStack flex="1" justifyContent="space-around">
          <HStack>
            <Heading>Hi,{auth.currentUser?.email}</Heading>
            <TouchableOpacity style={[styles.button]} onPress={handleSignOut}>
              <Text style={styles.buttonText}>Sign out</Text>
              <Ionicons name="log-out-outline" size={36} color="white" />
            </TouchableOpacity>
          </HStack>

          {/* {shopList ? (
            <View>
              <Text>You have one on-going shopping list</Text>
              <Center>
                <TouchableOpacity onPress={addData}>
                  <Ionicons name="add-circle-outline" size={36} color="#333" />
                </TouchableOpacity>
              </Center>
            </View>
          ) : (
            <TouchableOpacity style={styles.button} onPress={addList}>
              <Text style={styles.buttonText}>Add new Shopping List</Text>
            </TouchableOpacity>
          )} */}
        </VStack>
      </SafeAreaView>
    </Center>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  button: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#333",
    padding: 5,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    maxHeight: 40,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },
});
