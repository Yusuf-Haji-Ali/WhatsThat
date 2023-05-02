import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import React from "react";
import axios from "axios";

import chats from "../assets/data/chats.json";
import ContactListItem from "../components/Contacts/contact-list-item";

// const { data } = axios.get("http://localhost:3333/api/1.0.0/chat");

const Contacts = () => {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={chats}
        renderItem={({ item }) => <ContactListItem chat={item} />}
      />
    </SafeAreaView>
  );
};

export default Contacts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 5,
  },
});
