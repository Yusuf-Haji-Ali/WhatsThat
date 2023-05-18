import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import Button from "./button";

const EmptyTemplate = ({ image, text, buttonTitle, onPressFunction }) => {
  return (
    <View style={styles.container}>
      <Image source={image} style={styles.image} />
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
    justifyContent: "center",
    padding: 60,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 12,
  },
  image: {
    width: "100%",
    height: 400,
  },
});
