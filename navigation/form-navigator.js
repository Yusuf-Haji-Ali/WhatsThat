import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import SignIn from "../screens/SignIn";
import SignUp from "../screens/SignUp";
import TabNavigator from "./tab-navigator";
import { NavigationContainer } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

const FormNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="sign-in"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          display: "none",
        },
      }}
    >
      <Tab.Screen name="sign-in" component={SignIn} />
      <Tab.Screen name="sign-up" component={SignUp} />
      <Tab.Screen name="tab-navigation" component={TabNavigator} />
    </Tab.Navigator>
  );
};

export default FormNavigator;
