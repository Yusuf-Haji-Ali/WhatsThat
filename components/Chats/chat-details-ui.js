import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Components
import ContactListItem from "../Contacts/contact-list-item";
import Input from "../Reusable/input";
import Colours from "../Reusable/colours";
import Title from "../Reusable/title";
import SearchContactModal from "../Contacts/searchContactModal";

const ChatDetailsUi = ({
  chatId,
  chatDetails,
  getChatDetails,
  isUserCreator,
  edit,
  setEdit,
  myId,
  newChatName,
}) => {
  const chatCreator = chatDetails
    ? `${chatDetails.creator.first_name} ${chatDetails.creator.last_name}`
    : "";

  const [modalVisible, setModalVisible] = useState(false);
  const [newName, setNewName] = useState({ name: "" });

  // REMOVE USER FROM CHAT
  const removeFromChat = async (user_id) => {
    // Session token for authorization
    const userToken = JSON.parse(await AsyncStorage.getItem("@session_token"));

    await axios
      .delete(
        `http://localhost:3333/api/1.0.0/chat/${chatId}/user/${user_id}`,
        {
          headers: {
            "X-Authorization": userToken,
          },
        }
      )
      .then((response) => {
        console.log(
          `Status: ${response.status} ~ Removing user from the chat...`
        );
        // Rerender Chat Details Page
        getChatDetails();
      })
      .catch((error) => {
        console.log(
          `Status: ${error.response.status} ~ ${error.response.data}`
        );
      });
  };

  return (
    <View style={styles.container}>
      {/* IMAGE & TITLE */}
      <View style={styles.header}>
        <View style={styles.image}>
          <MaterialCommunityIcons
            name="account-group"
            size={75}
            color="white"
          />
        </View>

        {
          // Check if title is being edited, if so show supply input to edit
          edit ? (
            <View style={styles.edit}>
              <Input
                placeholder={chatDetails.name}
                defaultValue={chatDetails.name}
                onChangeText={(value) =>
                  setNewName({ ...newName, name: value })
                }
                style={styles.input}
              />
              <MaterialCommunityIcons
                name="check-circle"
                size={36}
                color={
                  // check new name is not empty and is not the same as default value
                  newName.name && newName.name !== chatDetails.name
                    ? Colours.blue
                    : // gray out the button if so...
                      "gray"
                }
                onPress={() => {
                  // check new name is not empty and is not the same as default value
                  if (newName.name && newName.name !== chatDetails.name) {
                    setEdit(!edit);
                    newChatName(newName);
                  }
                }}
              />
            </View>
          ) : (
            // If not being edited display chat name
            <Text style={styles.title}>{chatDetails.name}</Text>
          )
        }
      </View>

      {/* MEMBERS SECTION */}
      <View style={styles.members}>
        <Title title={"Members"} size={18} />

        <TouchableOpacity
          style={styles.addMember}
          onPress={() => setModalVisible(!modalVisible)}
        >
          <MaterialCommunityIcons
            name={"account-plus"}
            size={24}
            style={{ marginRight: 5 }}
            color={Colours.blue}
          />
          <Text style={{ color: Colours.blue, fontWeight: "500" }}>
            Add member
          </Text>
          <SearchContactModal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            chatId={chatId}
          />
        </TouchableOpacity>

        <FlatList
          data={chatDetails.members}
          renderItem={({ item }) => (
            // Members are contacts by default... pass in contact true
            <ContactListItem
              contact={item}
              isContact
              myId={myId}
              removeFromChat={removeFromChat}
            />
          )}
        />
      </View>

      {/* CREATOR */}
      <Text style={styles.creator}>
        Created by: {isUserCreator() ? "You" : chatCreator}
      </Text>
    </View>
  );
};

export default ChatDetailsUi;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "white",
  },
  header: {
    alignItems: "center",
  },
  image: {
    backgroundColor: Colours.lightblack,
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    textAlign: "center",
    fontWeight: "bold",
    marginVertical: 24,
  },
  subtitle: {
    marginVertical: 5,
    fontWeight: "bold",
  },
  members: {
    marginBottom: 24,
  },
  edit: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  creator: {
    fontStyle: "italic",
    fontWeight: "bold",
    fontSize: 12,
  },
  addMember: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  input: {
    width: "70%",
  },
});
