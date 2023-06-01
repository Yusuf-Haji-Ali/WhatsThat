import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Colours from "../Reusable/colours";
import Input from "../Reusable/input";

const EditProfileDetails = ({ firstname, lastname, email }) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <View style={styles.image}>
          <Text style={styles.imageText}>{firstname[0]}</Text>
        </View>
        <Text style={{ color: Colours.blue }}>Edit</Text>
      </View>

      <View style={styles.inputs}>
        <Input
          label={"First Name"}
          placeholder={firstname}
          defaultValue={firstname}
        />
        <Input
          label={"Last Name"}
          placeholder={lastname}
          defaultValue={lastname}
        />
        <Input label={"Email"} placeholder={email} defaultValue={email} />
      </View>
    </View>
  );
};

export default EditProfileDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 48,
    backgroundColor: "white",
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
    justifyContent: "center",
  },
  imageText: {
    textAlign: "center",
    color: Colours.light,
    fontSize: 20,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  inputs: {
    margin: 24,
  },
});
