import { FlatList, StyleSheet, View } from "react-native";
import React, { useState, useCallback } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NoContactsImage from "../assets/images/no_contacts.png";
// Components
import ContactListItem from "../components/Contacts/contact-list-item";
import EmptyTemplate from "../components/Reusable/empty-template";
// Authenticator
import AuthenticateUser from "../navigation/main-authentication";

const Contacts = () => {
  const [contacts, setContacts] = useState("");
  const Navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      getContacts();
      AuthenticateUser(Navigation);
    }, [])
  );

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
          setContacts(response.data);
        } else {
          setContacts("");
          console.log("No Contacts... :(");
        }
      })
      .catch((error) => {
        console.log(
          `Status: ${error.response.status} ~ ${error.response.data}`
        );
      });
  };

  return contacts ? (
    <View style={styles.container}>
      <FlatList
        data={contacts}
        renderItem={({ item }) => (
          <ContactListItem contact={item} myContacts={contacts} contactsPage />
        )}
      />
    </View>
  ) : (
    // If the user has no contacts yet... render empty template message showing that
    <EmptyTemplate
      image={NoContactsImage}
      text={"You have no contacts :("}
      buttonTitle={"Add new contact"}
      onPress={() => {
        console.log("Navigating to search...");
        Navigation.navigate("Search");
      }}
    />
  );
};

export default Contacts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: "white",
  },
});
