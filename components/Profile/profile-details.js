import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Colours from "../Reusable/colours";

const ProfileItem = ({ firstname, lastname, email, buttonText, ...props }) => {
  return (
    <View style={styles.container}>
      <View style={styles.image} />

      <View style={styles.content}>
        <Text style={styles.name}>
          {firstname} {lastname}
        </Text>
        <Text style={styles.email}>{email}</Text>
      </View>

      <TouchableOpacity style={styles.button} {...props}>
        <Text style={styles.buttonText}>{buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileItem;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 25,
    width: "100%",
    backgroundColor: Colours.lightgray,
  },
  image: {
    width: 125,
    height: 125,
    borderRadius: 125 / 2,
    backgroundColor: "black",
  },
  content: {
    margin: 24,
    alignItems: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  email: {
    fontSize: 16,
    marginTop: 10,
    color: Colours.gray,
  },
  button: {
    borderWidth: 1.5,
    borderColor: "#0058BE",
    borderRadius: 10,
    padding: 10,
    width: 200,
    alignItems: "center",
    color: "#0058BE",
  },
  buttonText: {
    color: "#0058BE",
    fontWeight: 500,
  },
});
