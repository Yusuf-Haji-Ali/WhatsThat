import { useState } from "react";
import { View, StyleSheet, SafeAreaView, Alert } from "react-native";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

// Components
import Colours from "../Reusable/colours";
import Input from "../Reusable/input";

const InputMessage = ({ chatId, getChatData }) => {
  const [message, setMessage] = useState({ message: "" });

  const sendMessage = async () => {
    const userToken = JSON.parse(await AsyncStorage.getItem("@session_token"));

    // POST message to chat
    await axios
      .post(`http://localhost:3333/api/1.0.0/chat/${chatId}/message`, message, {
        headers: {
          "X-Authorization": userToken,
        },
      })
      .then((response) => {
        console.log(
          `Status: ${response.status} ~ Sending message: ${message.message}`
        );
        // once message is sent... empty message input box
        setMessage({ ...message, message: "" });
        // Rerender chatscreen
        getChatData();
      })
      .catch((error) => {
        console.log(
          `Status: ${error.response.status} ~ ${error.response.data}`
        );
        Alert.alert("Error", error.response.data);
      });
  };

  return (
    <SafeAreaView style={{ backgroundColor: Colours.light }}>
      <View style={styles.container}>
        {/* Input Box */}
        <View style={styles.inputWrapper}>
          <Input
            style={styles.input}
            inputMessage
            placeholder={"Type your message..."}
            onChangeText={(value) => setMessage({ ...message, message: value })}
            defaultValue={message.message}
          />
        </View>

        {/* Send Icon */}
        {message.message && (
          // Render if message box is not empty
          <View style={styles.send}>
            <Feather
              name="send"
              size={24}
              color={Colours.light}
              onPress={sendMessage}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default InputMessage;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  inputWrapper: {
    flex: 1,
    marginHorizontal: 5,
    justifyContent: "center",
  },
  input: {
    flex: 1,
  },
  send: {
    backgroundColor: Colours.blue,
    color: Colours.light,
    padding: 7,
    borderRadius: 10,
  },
});
