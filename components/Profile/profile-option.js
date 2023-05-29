import { Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ProfileOption = ({ optionColor, optionText, iconName, ...props }) => {
  return (
    <TouchableOpacity style={styles.container} {...props}>
      <MaterialCommunityIcons name={iconName} size={30} color={optionColor} />
      <Text style={[styles.text, { color: optionColor }]}>{optionText}</Text>
    </TouchableOpacity>
  );
};

export default ProfileOption;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: "50%",
  },
  text: {
    fontWeight: "500",
  },
});
