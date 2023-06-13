import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import moment from "moment";
import Colours from "../Reusable/colours";

const ChatListItem = ({ chat }) => {
  const Navigation = useNavigation();

  // Format timestamp relatively
  const relativeTimestamp = moment(chat.last_message.timestamp).calendar({
    // if same day just display military time
    sameDay: "HH:mm ",
    // otherwise display military time with relative day/date
    lastDay: "[Yesterday] HH:mm",
    lastWeek: "DD/MM/YYYY HH:mm",
    sameElse: "DD/MM/YYYY HH:mm",
  });

  return (
    <Pressable
      style={styles.container}
      onPress={() => {
        Navigation.navigate("Chat Screen", {
          id: chat.chat_id,
          name: chat.name,
        });
      }}
    >
      <View style={styles.image}>
        <MaterialCommunityIcons
          name="account-group"
          color={"white"}
          size={24}
        />
      </View>

      <View style={styles.content}>
        <View style={styles.row}>
          <Text style={styles.chatName} numberOfLines={1}>
            {chat.name}
          </Text>
          <Text style={styles.timeStamp}>
            {
              // If timestamp exist render it relatively
              chat.last_message.timestamp && relativeTimestamp
            }
          </Text>
        </View>

        {/* Last message: author + message */}
        <Text style={styles.lastMessage} numberOfLines={2}>
          <Text style={styles.author}>
            {
              // If there is a last message then render it otherwise render '...'
              chat.last_message.author
                ? `${chat.last_message.author.first_name}: `
                : "..."
            }
          </Text>
          <Text>{chat.last_message.message}</Text>
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginHorizontal: 10,
    marginVertical: 5,
    height: 80,
    padding: 10,
    backgroundColor: "#E8E8E8",
    borderRadius: 12,
    alignItems: "center",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
    backgroundColor: Colours.lightblack,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    height: "100%",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  chatName: {
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  timeStamp: {
    color: "gray",
    fontSize: 12,
    fontWeight: "500",
  },
  lastMessage: {
    color: "gray",
  },
  author: {
    fontWeight: "bold",
  },
});

export default ChatListItem;
