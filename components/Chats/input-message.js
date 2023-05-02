import { useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, MaterialIcons, Feather } from "@expo/vector-icons";
import Colours from "../Reusable/colours";
import Input from "../Reusable/input";

const InputMessage = () => {
  const [newMessage, setNewMessage] = useState("");

  const onSend = () => {
    console.warn("Sending a message: ", newMessage);
    setNewMessage("");
  };

  return (
    <SafeAreaView edges={["bottom"]} style={styles.container}>
      {/* Input Box */}
      <View style={styles.inputWrapper}>
        <Input
          style={styles.input}
          placeholder={"Type your message"}
          onChangeText={(value) => setNewMessage(value)}
        />
      </View>

      {/* Send Icon */}
      <View style={styles.send}>
        <Feather name="send" size={24} color={"whitesmoke"} onPress={onSend} />
      </View>
    </SafeAreaView>
  );
};

export default InputMessage;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "whitesmoke",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  inputWrapper: {
    flex: 1,
    marginHorizontal: 5,
    justifyContent: "center",
  },
  input: {
    padding: 10,
  },
  send: {
    backgroundColor: Colours.blue,
    color: "whitesmoke",
    padding: 7,
    borderRadius: 10,
    overflow: "hidden",
  },
});
