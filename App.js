import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { useEffect } from "react";
import { StyleSheet, Text, SafeAreaView, View } from "react-native";

import StackNavigator from "./navigation/stack-navigator";
import FormNavigator from "./navigation/form-navigator";
import Input from "./components/Reusable/input";
import Chats from "./screens/Chats";

export default function App() {
  // useEffect(() => {
  //   setTimeout(() => {
  //     authUser();
  //   }, 2000);
  // }, []);

  // const authUser = async () => {
  //   try {
  //     let userData = await AsyncStorage.getItem("userData");
  //     if (userData) {
  //       userData = JSON.parse(userData);
  //       if (userData.loggedIn) {
  //         setInitialRouteName("Home");
  //       } else {
  //         setInitialRouteName("Login");
  //       }
  //     } else {
  //       setInitialRouteName("RegistrationScreen");
  //     }
  //   } catch (error) {
  //     setInitialRouteName("RegistrationScreen");
  //   }
  // };

  return <StackNavigator />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
