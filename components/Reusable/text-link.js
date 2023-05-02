import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Colours from "./colours";

const TextLink = ({ text, linkText, ...props }) => {
  return (
    <Text style={{ textAlign: "center" }}>
      {text}
      <Text style={styles.linkText} {...props}>
        {linkText}
      </Text>
    </Text>
  );
};

export default TextLink;

const styles = StyleSheet.create({
  linkText: {
    color: Colours.blue,
    fontWeight: "bold",
  },
});
