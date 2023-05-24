import { View, Text, StyleSheet } from "react-native";
import * as React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Message = ({ message }) => {
  // Check if message was from current logged in user
  async function myMessage() {
    const myUserId = JSON.parse(await AsyncStorage.getItem("@user_id"));
    return myUserId;
  }

  console.log(myMessage());
  return (
    <View
      style={[
        styles.container,
        // if it's my message show message on right with blue background, else left and white background
        {
          backgroundColor: myMessage ? "#4194E1" : "white",
          alignSelf: myMessage ? "flex-end" : "flex-start",
        },
      ]}
    >
      {!myMessage && (
        <Text style={styles.author}>
          {message.author.first_name} {message.author.last_name}
        </Text>
      )}
      <Text style={styles.message}>{message.message}</Text>
      <Text style={styles.timestamp}>{message.timestamp}</Text>
    </View>
  );
};

export default Message;

const styles = StyleSheet.create({
  container: {
    margin: 5,
    padding: 10,
    borderRadius: 10,
    maxWidth: "80%",

    // Shadows
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  author: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  message: {
    marginBottom: 5,
  },
  timestamp: {
    color: "gray",
    alignSelf: "flex-end",
    marginTop: 5,
    fontSize: 10,
  },
});
