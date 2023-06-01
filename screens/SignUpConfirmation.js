import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Button from "../components/Reusable/button";
import { useNavigation } from "@react-navigation/native";

const SignUpConfirmation = () => {
  const Navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>You've successfully registered!</Text>
      <Button
        title={"Sign in"}
        onPress={() => Navigation.navigate("Sign In")}
      />
    </View>
  );
};

export default SignUpConfirmation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    margin: 24,
  },
  text: {
    textAlign: "center",
    fontSize: 16,
  },
});
