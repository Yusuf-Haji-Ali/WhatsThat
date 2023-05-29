import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import Colours from "../Reusable/colours";

const ContactListItem = ({ contact, isContact }) => {
  const Navigation = useNavigation();

  return (
    <Pressable
      style={styles.contact}
      onPress={() =>
        Navigation.navigate("Contact Details", {
          user_id: contact.user_id,
          first_name: contact.first_name || contact.given_name,
          last_name: contact.last_name || contact.family_name,
          email: contact.email,
          isContact: isContact,
        })
      }
    >
      <View style={styles.image}>
        <Text style={styles.imageText}>
          {contact.first_name ? contact.first_name[0] : contact.given_name[0]}
        </Text>
      </View>

      <View style={styles.contactDetails}>
        <Text style={styles.name} numberOfLines={1}>
          {contact.first_name || contact.given_name}{" "}
          {contact.last_name || contact.family_name}
        </Text>

        <Text style={styles.email} numberOfLines={1}>
          {contact.email}
        </Text>
      </View>
    </Pressable>
  );
};

export default ContactListItem;

const styles = StyleSheet.create({
  contact: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
    height: 80,
    padding: 10,
    backgroundColor: "#E8E8E8",
    borderRadius: 5,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
    backgroundColor: "#242424",
    justifyContent: "center",
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
});
