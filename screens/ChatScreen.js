import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  FlatList,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRoute, useNavigation } from "@react-navigation/native";

import bg from "../assets/images/BG.png";
import Message from "../components/Chats/message-list-item";
import InputMessage from "../components/Chats/input-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ChatScreen = () => {
  const Route = useRoute();
  const Navigation = useNavigation();

  useEffect(() => {
    Navigation.setOptions({ title: Route.params.name });
    getMessages();
  }, [Route.params.name, messageData]);

  const chatId = Route.params.id;

  const [messageData, setMessageData] = useState();

  async function getMessages() {
    const userToken = JSON.parse(await AsyncStorage.getItem("@session_token"));

    // request data from get chat by id endpoint
    await axios
      .get("http://localhost:3333/api/1.0.0/chat/" + chatId, {
        headers: {
          "X-Authorization": userToken,
        },
      })
      .then((response) => {
        console.log(response.data.messages);
        setMessageData(response.data.messages);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 90}
      style={styles.bg}
    >
      <ImageBackground source={bg} style={styles.bg}>
        <FlatList
          data={messageData}
          renderItem={({ item }) => <Message message={item} />}
          style={styles.list}
          inverted
        />
        <InputMessage />
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },
  list: {
    margin: 5,
  },
});
