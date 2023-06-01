import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Navigators
import MainTabNavigator from "./main-tab-navigator";
import FormNavigator from "./form-navigator";
// Screens
import ChatScreen from "../screens/ChatScreen";
import ContactDetails from "../screens/ContactDetails";
import EditProfile from "../screens/EditProfile";
import ChatDetails from "../screens/ChatDetails";
import BlockedUsers from "../screens/BlockedUsers";
// Components
import Colours from "../components/Reusable/colours";
import Loader from "../components/Reusable/loader";

const Stack = createNativeStackNavigator();

const StackNavigator = ({ initialRoute }) => {
  return (
    <NavigationContainer>
      {/* Wait for initial route value based on session token existing */}

      {!initialRoute ? (
        //While it's waiting for initial route render loading...
        <Loader visible={true} loadingMessage={"Loading"} />
      ) : (
        <Stack.Navigator
          initialRouteName={initialRoute}
          screenOptions={{
            headerStyle: { backgroundColor: Colours.blue },
            headerTintColor: "white",
            headerShown: false,
            headerBackTitleVisible: false,
          }}
        >
          <Stack.Screen name="Home" component={MainTabNavigator} />
          <Stack.Screen name="Registration" component={FormNavigator} />
          <Stack.Screen name="ChatScreen" component={ChatScreen} />
          <Stack.Screen name="Edit Profile" component={EditProfile} />
          <Stack.Screen name="Blocked Users" component={BlockedUsers} />
          <Stack.Screen name="Contact Details" component={ContactDetails} />
          <Stack.Screen name="Chat Details" component={ChatDetails} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default StackNavigator;
