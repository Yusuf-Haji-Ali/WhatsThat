import { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import moment from "moment";
// Components
import MessageOptionModal from "./message-option-modal";
import Colours from "../Reusable/colours";

const Message = ({ messageData, myUserId, getChatData, chatId }) => {
  const [modalVisible, setModalVisible] = useState(false);

  // Check if message is from current logged in user
  const myMessage = messageData.author.user_id === myUserId;

  // FORMAT DATA RELATIVELY
  const relativeTimestamp = moment(messageData.timestamp).calendar({
    // if same day just display military time
    sameDay: "HH:mm ",
    // otherwise display military time with relative day/date
    lastDay: "[Yesterday] HH:mm",
    lastWeek: "DD/MM/YYYY HH:mm",
    sameElse: "DD/MM/YYYY HH:mm",
  });

  // UPDATE MESSAGE
  const updateMessage = async (message_id, updatedMessage) => {
    const userToken = JSON.parse(await AsyncStorage.getItem("@session_token"));
    // send updated message data
    await axios
      .patch(
        `http://localhost:3333/api/1.0.0/chat/${chatId}/message/${message_id}`,
        updatedMessage,
        {
          headers: {
            "X-Authorization": userToken,
          },
        }
      )
      .then((response) => {
        console.log(`Status: ${response.status} ~ Updating Message...`);
        // Then rerender chatscreen
        getChatData();
        // Finally close modal
        setModalVisible(!modalVisible);
      })
      .catch((error) => {
        console.log(
          `Status: ${error.response.status} ~ ${error.response.data}`
        );
        Alert.alert("Update Error", error.response.data);
      });
  };

  // DELETE MESSAGE
  const deleteMessage = async (message_id) => {
    const userToken = JSON.parse(await AsyncStorage.getItem("@session_token"));
    // send message data of message to be deleted
    await axios
      .delete(
        `http://localhost:3333/api/1.0.0/chat/${chatId}/message/${message_id}`,
        {
          headers: {
            "X-Authorization": userToken,
          },
        }
      )
      .then((response) => {
        console.log(`Status: ${response.status} ~ Deleting Message...`);
        // Then rerender chatscreen
        getChatData();
        // Finally close modal
        setModalVisible(!modalVisible);
      })
      .catch((error) => {
        console.log(
          `Status: ${error.response.status} ~ ${error.response.data}`
        );
      });
  };

  return (
    <View style={[styles.container, myMessage && styles.myMessageContainer]}>
      {
        // Only show authors name if it's not my message
        !myMessage && (
          <Text style={styles.author}>
            {messageData.author.first_name} {messageData.author.last_name}
          </Text>
        )
      }

      <View style={styles.message}>
        {
          // If it's my message display chevron for options
          myMessage && (
            <MaterialCommunityIcons
              name="chevron-down"
              size={16}
              style={styles.messageButton}
              onPress={() => setModalVisible(!modalVisible)}
            />
          )
        }
        <Text style={styles.messageText}>{messageData.message}</Text>
      </View>

      <Text style={[styles.timestamp, myMessage && styles.myMessageTimestamp]}>
        {relativeTimestamp}
      </Text>

      <MessageOptionModal
        messageData={messageData}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        updateMessage={updateMessage}
        deleteMessage={deleteMessage}
      />
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
    backgroundColor: "white",
    alignSelf: "flex-start",

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
  myMessageContainer: {
    // if it's my message show message on right with blue background
    backgroundColor: "#42A1FF",
    alignSelf: "flex-end",
  },
  author: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  message: {
    marginBottom: 5,
  },
  messageButton: {
    color: Colours.light,
    alignSelf: "flex-end",
  },
  timestamp: {
    alignSelf: "flex-end",
    marginTop: 5,
    fontSize: 10,
    fontWeight: "500",
    color: "gray",
  },
  myMessageTimestamp: {
    color: Colours.light,
  },
});
