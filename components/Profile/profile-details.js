import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

const ProfileItem = ({ firstname, lastname, email, ...props }) => {
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
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileItem;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
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
