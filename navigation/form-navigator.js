import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SignIn from "../screens/SignIn";
import SignUp from "../screens/SignUp";
import SignUpConfirmation from "../screens/SignUpConfirmation";

const Stack = createNativeStackNavigator();

const FormNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Sign In"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Sign In" component={SignIn} />
      <Stack.Screen name="Sign Up" component={SignUp} />
      <Stack.Screen name="Confirmation" component={SignUpConfirmation} />
    </Stack.Navigator>
  );
};

export default FormNavigator;
