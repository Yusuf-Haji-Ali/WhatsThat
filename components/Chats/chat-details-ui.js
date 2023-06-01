import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Components
import ContactListItem from "../Contacts/contact-list-item";
import Input from "../Reusable/input";
import Colours from "../Reusable/colours";
import Title from "../Reusable/title";
import SearchContactModal from "../Contacts/searchContactModal";

const ChatDetailsUi = ({ chatDetails, isUserCreator, edit, myId }) => {
  const chatCreator = chatDetails
    ? `${chatDetails.creator.first_name} ${chatDetails.creator.last_name}`
    : "";

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
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
          (edit && (
            <View style={styles.edit}>
              <Input
                placeholder={chatDetails.name}
                defaultValue={chatDetails.name}
              />
              <MaterialCommunityIcons
                name="check-circle"
                size={30}
                color={Colours.blue}
                onPress={() => setEdit(false)}
              />
            </View>
          )) || <Text style={styles.title}>{chatDetails.name}</Text>
        }
      </View>

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
          />
        </TouchableOpacity>

        <FlatList
          data={chatDetails.members}
          renderItem={({ item }) => (
            // Members are contacts by default pass in contact true
            // By default you are a member of the chat
            <ContactListItem contact={item} isContact={true} myId={myId} />
          )}
        />
      </View>

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
});
