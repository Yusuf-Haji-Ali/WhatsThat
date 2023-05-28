import * as React from "react";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StackNavigator from "./navigation/main-stack-navigator";

export default function App() {
  const [initialRouteName, setInitialRouteName] = useState("");

  useEffect(() => {
    setTimeout(() => {
      authUser();
    }, 1000);
  }, []);

  const authUser = async () => {
    try {
      let loggedIn = JSON.parse(await AsyncStorage.getItem("@logged_in"));
      console.log("Logged in:", loggedIn);
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
