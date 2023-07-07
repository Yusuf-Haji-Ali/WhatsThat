import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import Colours from "../Reusable/colours";

const ProfileDetails = ({ firstname, lastname, email, profilePhoto }) => {
  return (
    <View style={styles.container}>
      {profilePhoto ? (
        <Image source={{ uri: profilePhoto }} style={styles.image} />
      ) : (
        <View style={styles.image}>
          <Text style={styles.imageText}>{firstname[0]}</Text>
        </View>
      )}

      <View style={styles.content}>
        <Text style={styles.name}>
          {firstname} {lastname}
        </Text>
        <Text style={styles.email}>{email}</Text>
      </View>
    </View>
  );
};

export default ProfileDetails;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 25,
    width: "100%",
  },
  image: {
    width: 125,
    height: 125,
    borderRadius: 125 / 2,
    backgroundColor: Colours.lightblack,
    justifyContent: "center",
    alignItems: "center",
  },
  imageText: {
    textAlign: "center",
    color: Colours.light,
    fontSize: 24,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  content: {
    margin: 24,
    alignItems: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  email: {
    fontSize: 16,
    marginTop: 10,
    color: Colours.gray,
  },
});
