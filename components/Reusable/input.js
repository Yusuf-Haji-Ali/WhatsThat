import { View, Text, StyleSheet, TextInput, Platform } from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Colours from "../Reusable/colours";

const Input = ({
  iconName,
  error,
  password,
  label,
  onFocus = () => {},
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hidePassword, setHidePassword] = useState(password);

  return (
    <View style={styles.container}>
      {label && <Text style={styles.inputLabel}>{label}</Text>}

      <View
        style={[
          styles.inputWrapper,
          {
            borderColor: error ? "red" : isFocused ? Colours.blue : "#E8E8E8",
          },
        ]}
      >
        <Icon name={iconName} size={22} color={Colours.blue} />

        <TextInput
          style={[styles.input, Platform.OS === "web" && { outline: "none" }]}
          {...props}
          autoCorrect={false}
          placeholderTextColor={"gray"}
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
          // true by default if password is passed into the input
          secureTextEntry={hidePassword}
        />

        {/* renders show passwords icon if input is a password */}
        {password && (
          <Icon
            name={hidePassword ? "eye-outline" : "eye-off-outline"}
            size={20}
            color={Colours.blue}
            onPress={() => setHidePassword(!hidePassword)}
          />
        )}
      </View>

      {/* conditional render... displays if error exists */}
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
  },
  inputLabel: {
    marginVertical: 7,
    color: "grey",
    fontSize: 14,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E8E8E8",
    borderRadius: 5,
    borderWidth: 1,
    padding: 10,
  },
  input: {
    flex: 1,
    color: Colours.blue,
    paddingHorizontal: 10,
  },
  error: {
    color: "red",
    fontSize: 12,
    marginTop: 7,
  },
});
