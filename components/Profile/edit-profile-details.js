import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Colours from "../Reusable/colours";
import Input from "../Reusable/input";

const EditProfileInfo = ({
  userInfo,
  newUserInfo,
  setNewUserInfo,
  setEditing,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <View style={styles.image}>
          <Text style={styles.imageText}>{userInfo.first_name[0]}</Text>
        </View>
        <Text style={styles.editText} onPress={() => {}}>
          Edit
        </Text>
      </View>

      <View style={styles.inputs}>
        <Input
          label={"First Name"}
          placeholder={userInfo.first_name}
          defaultValue={userInfo.first_name}
          onChangeText={(value) => {
            // Only show options & add new Info if input is not empty and does not match existing Info
            if (value && value !== userInfo.first_name) {
              setEditing(true);
              setNewUserInfo({ ...newUserInfo, first_name: value });
            } else {
              setEditing(null);
            }
          }}
        />
        <Input
          label={"Last Name"}
          placeholder={userInfo.last_name}
          defaultValue={userInfo.last_name}
          onFocus={() => {
            // Automatically show options cancel/done options onFocus
          }}
          onChangeText={(value) => {
            // Only show options & add new Info if input is not empty and does not match existing Info
            if (value && value !== userInfo.last_name) {
              setEditing(true);
              setNewUserInfo({ ...newUserInfo, last_name: value });
            } else {
              setEditing(null);
            }
          }}
        />
        <Input
          label={"Email"}
          placeholder={userInfo.email}
          defaultValue={userInfo.email}
          onChangeText={(value) => {
            // Only show options & add new Info if input is not empty and does not match existing Info
            value && value !== userInfo.email
              ? () => {
                  setEditing(true);
                  setNewUserInfo({ ...newUserInfo, email: value });
                }
              : setEditing(null);
          }}
        />
        <Input
          label={"Password"}
          password
          placeholder={"Enter New Password..."}
          onChangeText={(value) => {
            // Only show options & add new Info if input is not empty and does not match existing Info
            if (value) {
              setEditing(true);
              setNewUserInfo({ ...newUserInfo, password: value });
            } else {
              setEditing(null);
            }
          }}
        />
      </View>
    </View>
  );
};

export default EditProfileInfo;

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
  editText: {
    color: Colours.blue,
    fontWeight: "500",
  },
  inputs: {
    margin: 24,
  },
});
