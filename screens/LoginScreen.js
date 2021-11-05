import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";

import {
  StyleSheet,
  Platform,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import {
  Box,
  Center,
  Heading,
  KeyboardAvoidingView,
  useToast,
  Text,
  Input,
  View,
  VStack,
  HStack,
} from "native-base";
import { auth } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { SafeAreaView } from "react-native-safe-area-context";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  const toast = useToast();

  // login listener, if logged in navigate to home screen
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate("Home");
        console.log(user);
      }
    });
    return unsubscribe;
  }, []);

  const handleSignUp = () => {
    console.log(auth);

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log(user.email, "Signed up");
      })
      .catch((error) => alert(error.message));
  };

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        toast.show({
          placement: "top",
          render: () => {
            return (
              <Box bg="emerald.500" px="2" rounded="sm" mb={5} fontSize="16">
                Hi {user.email}
              </Box>
            );
          },
        });
        navigation.navigate("Home");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <Center flex={1} px="3">
      <SafeAreaView>
        <KeyboardAvoidingView
          h={"400px"}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
            accessible={false}
          >
            <VStack p="6" flex="1" justifyContent="flex-end">
              <Heading fontSize={36} mb="3">
                Welcome to Recipe Hero 🥬
              </Heading>
              <Text>Please login or sign up</Text>
              <View>
                <Input
                  placeholder="Email"
                  mt="5"
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                />
                <Input
                  placeholder="Password"
                  mt="5"
                  mb="4"
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                  secureTextEntry
                />
              </View>
              <HStack>
                <TouchableHighlight
                  activeOpacity={0.9}
                  underlayColor="#666"
                  onPress={handleLogin}
                  style={styles.button}
                >
                  <Text style={styles.buttonText}>Login</Text>
                </TouchableHighlight>
                <TouchableOpacity
                  onPress={handleSignUp}
                  style={[styles.button, styles.buttonOutline]}
                >
                  <Text style={styles.buttonOutlineText}>Sign up</Text>
                </TouchableOpacity>
              </HStack>
            </VStack>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Center>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  //   container: {
  //     flex: 1,
  //   },
  //   innerContainer: {
  //     padding: 24,
  //     flex: 1,
  //     justifyContent: "space-around",
  //     alignItems: "center",
  //   },

  //   inputContainer: {
  //     flex: 2,
  //     width: "80%",
  //     justifyContent: "flex-end",
  //   },
  //   input: {
  //     backgroundColor: "white",
  //     paddingHorizontal: 15,
  //     paddingVertical: 10,
  //     borderRadius: 5,
  //     marginTop: 5,
  //   },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  button: {
    backgroundColor: "#333",
    padding: 10,
    borderRadius: 50,
    alignItems: "center",
    width: "45%",
    margin: 3,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },
  buttonOutline: {
    backgroundColor: "rgba(255,255,255,0.1)",
  },

  buttonOutlineText: {
    fontSize: 16,
    fontWeight: "700",
  },
});
