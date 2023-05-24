import { View, Text, TextInput, StyleSheet, FlatList } from "react-native";
import React, { useState } from "react";
import Input from "../components/Reusable/input";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Search = () => {
  // default search in -> "all" / offset -> 0
  const [searchIn, setSearchIn] = useState("all");
  const [offset, setOffset] = useState(0);
  const [searchResults, setSearchResults] = useState("");

  const searchFor = async (searchValue, searchIn) => {
    const userToken = JSON.parse(await AsyncStorage.getItem("@session_token"));

    await axios
      .get(
        `http://localhost:3333/api/1.0.0/search?q=${searchValue}&search_in=${searchIn}&limit=20&offset=${offset}`
      )
      .then((response) => {
        console.log(response.status);
        console.log(response.data);
        setSearchResults(response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  return (
    <View style={styles.container}>
      <Input
        iconName={"account-search-outline"}
        placeholder={"Who are you looking for?"}
        onChangeText={(value) => searchFor(value)}
      />
      <FlatList
        data={searchResults}
        renderItem={({ item }) => <ChatListItem contact={item} />}
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
