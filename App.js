import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Navigators
import MainTabNavigator from "./navigation/main-tab-navigator";
import FormNavigator from "./navigation/form-navigator";
// Screens
import ChatScreen from "./screens/ChatScreen";
import ContactDetails from "./screens/ContactDetails";
import EditProfile from "./screens/EditProfile";
import ChatDetails from "./screens/ChatDetails";
import BlockedUsers from "./screens/BlockedUsers";
// Components
import Colours from "./components/Reusable/colours";
import Loader from "./components/Reusable/loader";

export default function App() {
  const [initialRouteName, setInitialRouteName] = useState("");

  useEffect(() => {
    setTimeout(() => {
      authUser();
    }, 1000);
  }, []);

  const authUser = async () => {
    try {
      const loggedIn = JSON.parse(await AsyncStorage.getItem("@logged_in"));
      console.log("Logged in:", loggedIn);
      if (loggedIn) {
        setInitialRouteName("Home");
      } else {
        setInitialRouteName("Registration");
      }
    } catch (error) {
      setInitialRouteName("Registration");
    }
  };

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      {/* Wait for initial route value based on user's login status */}

      {!initialRouteName ? (
        //While it's waiting for initial route render loading...
        <Loader visible={true} loadingMessage={"Loading"} />
      ) : (
        <Stack.Navigator
          initialRouteName={initialRouteName}
          screenOptions={{
            headerStyle: { backgroundColor: Colours.blue },
            headerTintColor: "white",
            headerShown: false,
            headerBackTitleVisible: false,
          }}
        >
          <Stack.Screen name="Home" component={MainTabNavigator} />
          <Stack.Screen name="Registration" component={FormNavigator} />
          <Stack.Screen name="Chat Screen" component={ChatScreen} />
          <Stack.Screen name="Edit Profile" component={EditProfile} />
          <Stack.Screen name="Blocked Users" component={BlockedUsers} />
          <Stack.Screen name="Contact Details" component={ContactDetails} />
          <Stack.Screen name="Chat Details" component={ChatDetails} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
