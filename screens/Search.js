import { View, StyleSheet, FlatList } from "react-native";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
// Components
import Input from "../components/Reusable/input";
import Button from "../components/Reusable/button";
import ContactListItem from "../components/Contacts/contact-list-item";
import Colours from "../components/Reusable/colours";

const Search = () => {
  // default search in -> "all" / offset -> 0
  const [searchIn, setSearchIn] = useState("all");
  const [offset, setOffset] = useState(0);
  const [searchResults, setSearchResults] = useState("");
  const isContact = searchIn === "contacts";

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
        console.log(
          `Status: ${response.status} ~ Searching... ~ In: ${searchIn}`
        );
        setSearchResults(response.data);
      })
      .catch((error) => {
        console.log(
          `Status: ${error.response.status} ~ ${error.response.data}`
        );
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
          extraButtonStyle={
            searchIn === "contacts" ? styles.buttonClicked : styles.button
          }
          extraTextStyle={{
            color: searchIn === "contacts" ? Colours.blue : "white",
          }}
          onPress={() => {
            setSearchIn("contacts");
            searchFor("", "contacts", offset);
          }}
        />
        <Button
          title={"All"}
          extraButtonStyle={
            searchIn === "all" ? styles.buttonClicked : styles.button
          }
          extraTextStyle={{
            color: searchIn === "all" ? Colours.blue : "white",
          }}
          onPress={() => {
            setSearchIn("all");
            searchFor("", "all", offset);
          }}
        />
      </View>

      <FlatList
        data={searchResults}
        renderItem={({ item }) => (
          <ContactListItem contact={item} isContact={isContact} searchPage />
        )}
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
    backgroundColor: "white",
  },
  searchIn: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  button: {
    width: "45%",
  },
  buttonClicked: {
    width: "45%",
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: Colours.blue,
    color: Colours.blue,
  },
});
