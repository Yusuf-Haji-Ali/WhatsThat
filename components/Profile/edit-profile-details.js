import { View, Text, TextInput, StyleSheet } from "react-native";
import React from "react";
import Colours from "../Reusable/colours";
import Input from "../Reusable/input";

const EditProfileDetails = ({ firstname, lastname, email }) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <View style={styles.image} />
        <Text style={{ color: Colours.blue }}>Edit</Text>
      </View>

      <View style={styles.inputs}>
        <Input label={"First Name"} placeholder={firstname} />
        <Input label={"Last Name"} placeholder={lastname} />
        <Input label={"Email"} placeholder={email} />
      </View>
    </View>
  );
};

export default EditProfileDetails;

const styles = StyleSheet.create({
  container: {
    marginTop: 48,
  },
  imageWrapper: {
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "black",
    marginHorizontal: 24,
    marginBottom: 5,
  },
  inputs: {
    margin: 24,
  },
});
