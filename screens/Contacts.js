import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NoContactsImage from "../assets/images/no_contacts.png";
import ContactListItem from "../components/Contacts/contact-list-item";
import EmptyTemplate from "../components/Reusable/empty-template";

const Contacts = () => {
  const [contacts, setContacts] = useState();

  useEffect(() => {
    getContacts();
  }, []);

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
          console.log(response.status);
          console.log(response.data);
          setContacts(response.data);
        } else {
          console.log("No Contacts... :(");
        }
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const addContact = async (user_id) => {
    const userToken = JSON.parse(await AsyncStorage.getItem("@session_token"));

    await axios
      .post(`http://localhost:3333/api/1.0.0/user/${user_id}/contact`, {
        headers: {
          "X-Authorization": userToken,
        },
      })
      .then((response) => {
        console.log("Contact added!");
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  return contacts ? (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={contacts}
        renderItem={({ item }) => <ContactListItem contact={item} />}
      />
    </SafeAreaView>
  ) : (
    // If the user has no contacts yet... render empty template message showing that
    <EmptyTemplate
      image={NoContactsImage}
      text={"You have no contacts yet :("}
      buttonTitle={"Add new contact"}
      onPressFunction={async () => console.log("Clicked")}
    />
  );
};

export default Contacts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
});
