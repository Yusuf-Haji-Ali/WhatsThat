import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MaterialIcons } from "@expo/vector-icons";

// Navigators
import MainTabNavigator from "./main-tab-navigator";
import FormNavigator from "./form-navigator";
// Screens
import ChatScreen from "../screens/ChatScreen";
import ContactDetails from "../screens/ContactDetails";
import EditProfile from "../screens/EditProfile";
import SignUpConfirmation from "../screens/SignUpConfirmation";
// Components
import Colours from "../components/Reusable/colours";
import Loader from "../components/Reusable/loader";

const Stack = createNativeStackNavigator();

const StackNavigator = ({ initialRoute }) => {
  console.log(initialRoute);
  return (
    <NavigationContainer>
      {!initialRoute ? (
        <Loader visible={true} loadingMessage={"Loading"} />
      ) : (
        <Stack.Navigator
          initialRouteName={initialRoute}
          screenOptions={{
            headerStyle: { backgroundColor: Colours.blue },
            headerTintColor: "white",
            headerShown: false,
          }}
        >
          <Stack.Screen name="Registration" component={FormNavigator} />
          <Stack.Screen name="Confirmation" component={SignUpConfirmation} />
          <Stack.Screen name="Home" component={MainTabNavigator} />
          <Stack.Screen
            name="ChatScreen"
            component={ChatScreen}
            options={{
              headerShown: true,
              headerRight: () => (
                <MaterialIcons
                  name="menu-open"
                  size={24}
                  color="white"
                  style={{ marginRight: 10 }}
                  onPress={() => console.log("Loading chat details...")}
                />
              ),
            }}
          />
          {/* <Stack.Screen
          name="Chat Details"
          component={ChatDetails}
          options={{ headerShown: true }}
        /> */}
          <Stack.Screen
            name="Contact Details"
            component={ContactDetails}
            options={{ headerShown: true }}
          />
          <Stack.Screen
            name="Edit Profile"
            component={EditProfile}
            options={{ headerShown: true }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default StackNavigator;
