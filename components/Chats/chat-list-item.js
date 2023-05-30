import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";

export default function ChatListItem({ chat }) {
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
        Navigation.navigate("ChatScreen", {
          id: chat.chat_id,
          name: chat.name,
        });
      }}
    >
      {/* <Image style={styles.image} source={{ uri: chat.user.image }} /> */}

      <View style={styles.content}>
        <View style={styles.row}>
          <Text style={styles.name} numberOfLines={1}>
            {chat.name}
          </Text>
          <Text style={styles.timeStamp}>{relativeTimestamp}</Text>
        </View>

        {/* Last message: author + message */}
        <Text style={styles.subTitle} numberOfLines={2}>
          {chat.last_message.author.first_name}: {chat.last_message.message}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginHorizontal: 10,
    marginVertical: 5,
    height: 80,
    padding: 10,
    backgroundColor: "#E8E8E8",
    borderRadius: 5,
    alignItems: "center",
  },
  content: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
  },
  name: {
    flex: 1,
    fontWeight: "bold",
    marginBottom: 5,
    textTransform: "capitalize",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  subTitle: {
    color: "black",
  },
  timeStamp: {
    color: "gray",
    fontSize: 12,
    fontWeight: "500",
  },
});
