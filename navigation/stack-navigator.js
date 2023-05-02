import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import TabNavigator from "./tab-navigator";
import ChatScreen from "../screens/ChatScreen";
import Contacts from "../screens/Contacts";
import EditProfile from "../screens/EditProfile";
import Profile from "../screens/Profile";
import FormNavigator from "./form-navigator";
import SignUpConfirmation from "../screens/SignUpConfirmation";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: "#0058BE" },
          headerTintColor: "white",
        }}
      >
        <Stack.Screen
          name="Registration"
          component={FormNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
        <Stack.Screen
          name="RegistrationConfirmation"
          component={SignUpConfirmation}
          options={{ headerShown: false }}
        />
        {/* <Stack.Screen name="Contact Details" component={ContactDetails} /> */}
        <Stack.Screen name="Edit Profile" component={EditProfile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
