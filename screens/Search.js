import { View, Text, TextInput, StyleSheet } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";

const Search = () => {
  return (
    <View style={styles.inputWrapper}>
      <MaterialIcons name="search" size={24} color="black" />
      <TextInput
        style={styles.input}
        placeholder="Who are you looking for?"
        placeholderTextColor={"gray"}
      />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    margin: 24,
    backgroundColor: "#E8E8E8",
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  input: {
    padding: 15,
    flex: 1,
  },
});
