import {
  Text,
  Modal,
  SafeAreaView,
  StyleSheet,
  View,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
// Components
import Input from "../Reusable/input";
import Colours from "../Reusable/colours";
import ContactListItem from "../Contacts/contact-list-item";

const SearchContactModal = ({ modalVisible, setModalVisible, chatId }) => {
  const searchIn = "contacts";
  const [offset, setOffset] = useState(0);
  const [searchResults, setSearchResults] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const isContact = searchIn === "contacts";

  useEffect(() => {
    // Re-search every time offset, searchIn or searchValue state changes
    searchFor();
  }, [offset, searchIn, searchValue]);

  // SEARCH FOR CONTACTS
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
          `Status: ${response.status} ~ Searching...${searchValue}  In: ${searchIn}...  Offset: ${offset}`
        );
        setSearchResults(response.data);
      })
      .catch((error) => {
        console.log(
          `Status: ${error.response.status} ~ ${error.response.data}`
        );
      });
  };

  const addToChat = async (user_id) => {
    // Session token for authorization
    const userToken = JSON.parse(await AsyncStorage.getItem("@session_token"));

    await axios
      .post(`http://localhost:3333/api/1.0.0/chat/${chatId}/user/${user_id}`, {
        headers: {
          "X-Authorization": userToken,
        },
      })
      .then((response) => {
        console.log(`Status: ${response.status} ~ Adding user to chat...`);
      })
      .catch((error) => {
        console.log(
          `Status: ${error.response.status} ~ ${error.response.data}`
        );
      });
  };

  return (
    <Modal animationType="slide" visible={modalVisible}>
      <SafeAreaView style={styles.container}>
        <MaterialCommunityIcons
          name="close"
          size={30}
          style={styles.close}
          onPress={() => setModalVisible(!modalVisible)}
        />

        <Text style={styles.modalText}>Search From Contacts:</Text>

        <View style={styles.search}>
          <Input
            iconName={"account-search-outline"}
            placeholder={"Who are you looking for?"}
            onChangeText={(value) => {
              setSearchValue(value);
            }}
          />

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
              <ContactListItem
                contact={item}
                isContact={isContact}
                addToChat={addToChat}
              />
            )}
          />
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default SearchContactModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  close: {
    alignSelf: "flex-end",
    marginRight: 15,
    color: Colours.blue,
    fontWeight: "bold",
  },
  modalText: {
    marginTop: 15,
    textAlign: "center",
  },
  search: {
    flex: 1,
    paddingTop: 24,
    paddingHorizontal: 24,
    backgroundColor: "white",
  },
  pagination: {
    marginBottom: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "transparent",
  },
});
