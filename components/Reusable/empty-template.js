import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import Button from "./button";

const EmptyTemplate = ({ image, text, buttonTitle, onPressFunction }) => {
  return (
    <View style={styles.container}>
      {image && <Image source={image} style={styles.image} />}
      <Text style={styles.text}>{text}</Text>
      <Button title={buttonTitle} onPress={onPressFunction} />
    </View>
  );
};

export default EmptyTemplate;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "space-evenly",
    alignItems: "center",
    padding: 75,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  image: {
    width: "100%",
    height: "70%",
    overflow: "visible",
  },
});
