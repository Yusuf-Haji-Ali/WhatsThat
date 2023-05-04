import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const ContactListItem = ({ chat }) => {
  const Navigation = useNavigation();

  return (
    <Pressable
      style={styles.contact}
      onPress={() =>
        Navigation.navigate("Contact Details", {
          name: chat.user.name,
          email: chat.user.email,
        })
      }
    >
      <Image style={styles.image} source={{ uri: chat.user.image }} />

      <View style={styles.contactDetails}>
        <Text style={styles.name} numberOfLines={1}>
          {chat.user.name}
        </Text>

        <Text style={styles.email} numberOfLines={1}>
          {chat.user.email}
        </Text>
      </View>
    </Pressable>
  );
};

export default ContactListItem;

const styles = StyleSheet.create({
  contact: {
    flexDirection: "row",
    marginHorizontal: 10,
    marginVertical: 5,
    height: 80,
    padding: 10,
    backgroundColor: "#E8E8E8",
    borderRadius: 5,
    alignItems: "center",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
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
