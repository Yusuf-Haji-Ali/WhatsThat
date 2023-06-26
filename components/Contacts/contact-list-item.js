import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
// Components
import Colours from "../Reusable/colours";
import AlertModal from "../Reusable/alert-modal";

const ContactListItem = ({
  contact,
  myContacts,
  isBlocked,
  myId,
  chatMembers,
  addToChat,
  removeFromChat,
  contactsPage,
  searchPage,
  blockedPage,
}) => {
  // Check the contact is in User's contact list by matching ID
  const isMyContact =
    myContacts &&
    myContacts.some((element) => element.user_id === contact.user_id);
  // Check if contact is in Chat by matching ID
  const isInChat =
    chatMembers &&
    chatMembers.some((element) => element.user_id === contact.user_id);

  const Navigation = useNavigation();
  const [added, setAdded] = useState(isInChat);
  const [addModal, setAddModal] = useState({
    visibility: false,
    message: "Add user to the chat?",
    buttonTitle: "Add",
  });
  const [removeModal, setRemoveModal] = useState({
    visibility: false,
    message: "Are you sure you want to remove this user?",
    buttonTitle: "Remove",
  });

  return contact.user_id === myId ? (
    //  If the contact id matches your passed in ID, show that it is you
    <TouchableOpacity style={styles.contact}>
      <View style={styles.image}>
        <MaterialCommunityIcons name="account" size={24} color={"white"} />
      </View>
      <Text style={styles.name} numberOfLines={1}>
        You
      </Text>
    </TouchableOpacity>
  ) : (
    // Otherwise display contact
    <TouchableOpacity
      style={styles.contact}
      onPress={() => {
        // only excute from contacts, search or blocked pages
        if (contactsPage || searchPage || blockedPage) {
          Navigation.navigate("Contact Details", {
            user_id: contact.user_id,
            first_name: contact.first_name || contact.given_name,
            last_name: contact.last_name || contact.family_name,
            email: contact.email,
            isMyContact: isMyContact,
            isBlocked: isBlocked,
          });
        }
      }}
    >
      <View style={styles.image}>
        <Text style={styles.imageText}>
          {contact.first_name ? contact.first_name[0] : contact.given_name[0]}
        </Text>
      </View>

      <View style={styles.contactDetails}>
        <Text style={styles.name} numberOfLines={1}>
          {/* If first & last name exist from API display that else use given and family name (from search results) */}
          {contact.first_name || contact.given_name}{" "}
          {contact.last_name || contact.family_name}{" "}
        </Text>

        <Text style={styles.email} numberOfLines={1}>
          {contact.email}
        </Text>
      </View>

      <>
        {addToChat && (
          <MaterialCommunityIcons
            // if the user is added show checked icon
            name={added ? "account-check" : "account-plus"}
            color={added ? "green" : Colours.blue}
            size={22}
            style={styles.option}
            onPress={() =>
              !isInChat && setAddModal({ ...addModal, visibility: true })
            }
          />
        )}

        {removeFromChat && (
          <MaterialCommunityIcons
            name={"delete"}
            color={"red"}
            size={22}
            style={styles.option}
            onPress={() => setRemoveModal({ ...removeModal, visibility: true })}
          />
        )}
      </>

      {/* ADD ALERT MODAL */}
      <AlertModal
        modal={addModal}
        setModal={setAddModal}
        alertFunction={() => {
          addToChat(contact.user_id);
          setAdded(true);
        }}
      />
      {/* REMOVE ALERT MODAL */}
      <AlertModal
        modal={removeModal}
        setModal={setRemoveModal}
        alertFunction={() => removeFromChat(contact.user_id)}
      />
    </TouchableOpacity>
  );
};

export default ContactListItem;

const styles = StyleSheet.create({
  contact: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
    height: 75,
    padding: 10,
    backgroundColor: "#E8E8E8",
    borderRadius: 12,
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
  imageText: {
    textAlign: "center",
    color: Colours.light,
    fontSize: 14,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
  },
  email: {
    marginTop: 5,
    fontSize: 12,
  },
  option: {
    position: "absolute",
    right: 12,
  },
});
