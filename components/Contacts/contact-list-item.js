import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import Colours from "../Reusable/colours";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ContactListItem = ({
  contact,
  contactsPage,
  searchPage,
  isContact,
  isBlocked,
  myId,
  addToChat,
  removeFromChat,
}) => {
  const Navigation = useNavigation();

  return contact ? (
    //  If the contact id matches your passed in ID show that is you
    contact.user_id === myId ? (
      <TouchableOpacity style={styles.contact}>
        <View style={styles.image}>
          <MaterialCommunityIcons name="account" size={24} color={"white"} />
        </View>
        <Text style={styles.name} numberOfLines={1}>
          You
        </Text>
      </TouchableOpacity>
    ) : (
      // Otherwise Show contact
      <TouchableOpacity
        style={styles.contact}
        onPress={() => {
          if (contactsPage || searchPage) {
            Navigation.navigate("Contact Details", {
              user_id: contact.user_id,
              first_name: contact.first_name || contact.given_name,
              last_name: contact.last_name || contact.family_name,
              email: contact.email,
              isContact: isContact,
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
              name={"account-plus"}
              color={Colours.blue}
              size={22}
              style={styles.option}
              onPress={() => {
                addToChat(contact.user_id);
              }}
            />
          )}

          {removeFromChat && (
            <MaterialCommunityIcons
              name={"delete"}
              color={"red"}
              size={22}
              style={styles.option}
            />
          )}
        </>
      </TouchableOpacity>
    )
  ) : (
    <></>
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
