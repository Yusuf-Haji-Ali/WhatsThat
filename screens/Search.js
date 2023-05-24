import { View, Text, TextInput, StyleSheet, FlatList } from "react-native";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Input from "../components/Reusable/input";
import SearchListItem from "../components/Contacts/search-list-item";
import Button from "../components/Reusable/button";

const Search = () => {
  // default search in -> "all" / offset -> 0
  const [searchIn, setSearchIn] = useState("all");
  const [offset, setOffset] = useState(0);
  const [searchResults, setSearchResults] = useState("");

  const searchFor = async (searchValue, searchIn, offset) => {
    const userToken = JSON.parse(await AsyncStorage.getItem("@session_token"));

    await axios
      .get(
        `http://localhost:3333/api/1.0.0/search?q=${searchValue}&search_in=${searchIn}&limit=20&offset=${offset}`,
        {
          headers: {
            "X-Authorization": userToken,
          },
        }
      )
      .then((response) => {
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
        onChangeText={(value) => searchFor(value, searchIn, offset)}
      />
      <View style={styles.searchIn}>
        <Button
          title={"Contacts"}
          style={{ width: "45%" }}
          onPress={() => setSearchIn("contacts")}
        />
        <Button
          title={"All"}
          style={{ width: "45%" }}
          onPress={() => setSearchIn("all")}
        />
      </View>
      <FlatList
        data={searchResults}
        renderItem={({ item }) => <SearchListItem contact={item} />}
      />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24,
    paddingHorizontal: 24,
  },
  searchIn: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});
