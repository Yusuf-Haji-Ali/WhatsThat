import { View, StyleSheet, FlatList } from "react-native";
import React, { useCallback, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
// Components
import Input from "../components/Reusable/input";
import Button from "../components/Reusable/button";
import ContactListItem from "../components/Contacts/contact-list-item";
import Colours from "../components/Reusable/colours";
import { useFocusEffect } from "@react-navigation/native";

const Search = () => {
  // default search in -> "all" / offset -> 0
  const [searchIn, setSearchIn] = useState("all");
  const [offset, setOffset] = useState(0);
  const [searchResults, setSearchResults] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [myContacts, setMyContacts] = useState("");

  useFocusEffect(
    useCallback(() => {
      getContacts();
      // Re-search every time offset, searchIn or searchValue state changes
      searchFor();
    }, [offset, searchIn, searchValue])
  );

  // SEARCH
  const searchFor = async () => {
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
          `Status: ${response.status} ~ Searching...  In: ${searchIn}...  Offset: ${offset}`
        );
        setSearchResults(response.data);
      })
      .catch((error) => {
        console.log(
          `Status: ${error.response.status} ~ ${error.response.data}`
        );
      });
  };

  // GET USER'S CONTACTS
  const getContacts = async () => {
    const userToken = JSON.parse(await AsyncStorage.getItem("@session_token"));

    await axios
      .get("http://localhost:3333/api/1.0.0/contacts", {
        headers: {
          "X-Authorization": userToken,
        },
      })
      .then((response) => {
        // check if user has contacts (if array length of data returned > 0)
        if (response.data.length > 0) {
          console.log(`Status: ${response.status} ~ Getting contacts...`);
          setMyContacts(response.data);
        } else {
          setMyContacts("");
          console.log("No Contacts... :(");
        }
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
        onChangeText={(value) => {
          setSearchValue(value);
        }}
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
            // reset offset
            setOffset(0);
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
            // reset offset
            setOffset(0);
          }}
        />
      </View>

      <View style={styles.pagination}>
        <MaterialCommunityIcons
          name="skip-previous"
          size={24}
          color={offset >= 20 ? Colours.blue : "gray"}
          onPress={() => {
            if (offset >= 20) {
              setOffset(offset - 20);
            }
          }}
        />

        <MaterialCommunityIcons
          name="skip-next"
          size={24}
          // if search results reaches 20 contacts give option to go to next page
          color={searchResults.length >= 20 ? Colours.blue : "gray"}
          onPress={() => {
            if (searchResults.length >= 20) {
              setOffset(offset + 20);
            }
          }}
        />
      </View>

      <FlatList
        data={searchResults}
        renderItem={({ item }) => (
          <ContactListItem contact={item} myContacts={myContacts} searchPage />
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
  pagination: {
    marginBottom: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "transparent",
  },
});
