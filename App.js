import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { useEffect, useState } from "react";
import { StyleSheet, Text, SafeAreaView, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StackNavigator from "./navigation/stack-navigator";

export default function App() {
  const [initialRouteName, setInitialRouteName] = useState("");

  useEffect(() => {
    authUser();
  }, []);

  const authUser = async () => {
    try {
      let loggedIn = JSON.parse(await AsyncStorage.getItem("@logged_in"));
      console.log(loggedIn);
      if (loggedIn) {
        setInitialRouteName("Home");
        console.log(initialRouteName);
      } else {
        setInitialRouteName("Registration");
      }
    } catch (error) {
      setInitialRouteName("Registration");
    }
  };

  return <StackNavigator initialRoute={initialRouteName} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
