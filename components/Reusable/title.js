import { View, Text, StyleSheet } from "react-native";
import React from "react";

const Title = ({ title, size }) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.title, { fontSize: size }]}>{title}</Text>
    </View>
  );
};

export default Title;

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 3,
    borderBottomColor: "#0058BE",
    paddingBottom: 5,
    marginVertical: 24,
    alignSelf: "flex-start",
  },
  title: {
    borderColor: "#0058BE",
    fontWeight: "bold",
  },
});
