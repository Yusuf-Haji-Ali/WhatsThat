import { View, Text, StyleSheet } from "react-native";
import Colours from "../Reusable/colours";
import * as React from "react";
import moment from "moment";

const Message = ({ message, myUserId }) => {
  // Check if message is from current logged in user
  const myMessage = message.author.user_id === myUserId;

  // Format timestamp relatively
  const relativeTimestamp = moment(message.timestamp).calendar({
    // if same day just display military time
    sameDay: "HH:mm ",
    // otherwise display military time with relative day/date
    lastDay: "[Yesterday] HH:mm",
    lastWeek: "DD/MM/YYYY HH:mm",
    sameElse: "DD/MM/YYYY HH:mm",
  });

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
      {
        // Only show authors name if it's not my message
        !myMessage && (
          <Text style={styles.author}>
            {message.author.first_name} {message.author.last_name}
          </Text>
        )
      }
      <Text style={styles.message}>{message.message}</Text>
      <Text
        style={[
          styles.timestamp,
          {
            color: myMessage ? Colours.lightgray : "gray",
          },
        ]}
      >
        {relativeTimestamp}
      </Text>
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
    alignSelf: "flex-end",
    marginTop: 5,
    fontSize: 10,
    fontWeight: "500",
  },
});
