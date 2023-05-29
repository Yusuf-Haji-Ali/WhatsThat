import { Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import Colours from "./colours";

const Button = ({ title, style, ...props }) => {
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      activeOpacity={0.7}
      {...props}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    height: 50,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colours.blue,
    borderRadius: 5,
    marginVertical: 12,
  },
  buttonText: {
    color: Colours.light,
    fontWeight: "bold",
    fontSize: 14,
  },
});
