import { View, Text, TextInput, StyleSheet } from "react-native";
import React from "react";
import Input from "../components/Reusable/input";

const Search = () => {
  return (
    <View style={styles.container}>
      <Input
        iconName={"account-search-outline"}
        placeholder={"Who are you looking for?"}
      />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});
