import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import Button from "./button";

const EmptyTemplate = ({ image, text, buttonTitle, ...props }) => {
  return (
    <View style={styles.container}>
      {image && <Image source={image} style={styles.image} />}
      <Text style={styles.text}>{text}</Text>
      {buttonTitle && <Button title={buttonTitle} {...props} />}
    </View>
  );
};

export default EmptyTemplate;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 50,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 16,
  },
  image: {
    width: "100%",
    height: "60%",
    overflow: "visible",
  },
});
