import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { StyleSheet, Text, SafeAreaView, View } from "react-native";

import StackNavigator from "./navigation/stack-navigator";
import FormNavigator from "./navigation/form-navigator";
import Input from "./components/Reusable/input";
import Chats from "./screens/Chats";

export default function App() {
  return <StackNavigator />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
