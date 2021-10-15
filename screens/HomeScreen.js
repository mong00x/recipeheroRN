import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Center, VStack, HStack, Heading, Text } from "native-base";

import { Ionicons } from "@expo/vector-icons";
import { auth } from "../firebase";

import { useNavigation } from "@react-navigation/core";

const HomeScreen = () => {
  const navigation = useNavigation();
  const handleSignOut = () => {
    auth.signOut().then(() => {
      navigation.replace("Login");
    });
  };

  return (
    <Center flex={1} px="3">
      <VStack flex="1" justifyContent="space-around">
        <Heading>Hi,{auth.currentUser?.email}</Heading>
        <TouchableOpacity style={[styles.button]} onPress={handleSignOut}>
          <Text style={styles.buttonText}>Sign out</Text>
          <Ionicons name="log-out-outline" size={36} color="white" />
        </TouchableOpacity>
      </VStack>
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
    width: "85%",
    maxHeight: 40,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
    width: "60%",
  },
});
