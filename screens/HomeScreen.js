import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Center, VStack, HStack, Heading, Text } from "native-base";

import { Ionicons } from "@expo/vector-icons";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { database } from "../firebase";
import { ref, child, get, set } from "firebase/database";

import { useNavigation } from "@react-navigation/core";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = () => {
  const navigation = useNavigation();
  const user = auth.currentUser;

  const handleSignOut = () => {
    signOut(auth).then(() => {
      console.log(user.email, "Signed out");
      navigation.replace("Login");
    });
  };

  const dbRef = ref(database);
  get(child(dbRef, "Hello"))
    .then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });

  const addData = (IngredientId = 0, IngredientName = "banana") => {
    set(ref(database, "Hello/"), {
      ingredientName: IngredientName,
    });
  };

  return (
    <Center flex={1} px="3">
      <SafeAreaView>
        <VStack flex="1" justifyContent="space-around">
          <Heading>Hi,{auth.currentUser?.email}</Heading>
          <TouchableOpacity style={[styles.button]} onPress={handleSignOut}>
            <Text style={styles.buttonText}>Sign out</Text>
            <Ionicons name="log-out-outline" size={36} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button]} onPress={addData}>
            <Ionicons name="add-circle-outline" size={36} color="white" />
          </TouchableOpacity>
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
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },
});
