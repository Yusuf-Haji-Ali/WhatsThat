import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import TabNavigator from "./tab-navigator";
import ChatScreen from "../screens/ChatScreen";
import Contacts from "../screens/Contacts";
import ContactDetails from "../screens/ContactDetails";
import EditProfile from "../screens/EditProfile";
import Profile from "../screens/Profile";
import FormNavigator from "./form-navigator";
import SignUpConfirmation from "../screens/SignUpConfirmation";
import Colours from "../components/Reusable/colours";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: Colours.blue },
          headerTintColor: "white",
          headerShown: false,
        }}
      >
        <Stack.Screen name="Registration" component={FormNavigator} />
        <Stack.Screen name="Home" component={TabNavigator} />
        <Stack.Screen name="Confirmation" component={SignUpConfirmation} />
        <Stack.Screen
          name="ChatScreen"
          component={ChatScreen}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Edit Profile"
          component={EditProfile}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Contact Details"
          component={ContactDetails}
          options={{ headerShown: true }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
