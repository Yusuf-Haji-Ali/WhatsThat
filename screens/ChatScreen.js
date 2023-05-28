import {
  ImageBackground,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRoute, useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import bg from "../assets/images/BG.png";
import Message from "../components/Chats/message-list-item";
import InputMessage from "../components/Chats/input-message";

const ChatScreen = () => {
  const Route = useRoute();
  const Navigation = useNavigation();

  useEffect(() => {
    Navigation.setOptions({
      title: Route.params.name,
      headerShown: true,
      headerRight: () => (
        <MaterialIcons
          name="menu-open"
          size={24}
          color="white"
          style={{ marginRight: 10 }}
          onPress={() => Navigation.navigate("Chat Details")}
        />
      ),
    });
    getMessages();
  }, [Route.params.name, messageData]);

  const chatId = Route.params.id;
  const [messageData, setMessageData] = useState();
  const [userId, setUserId] = useState();

  async function getMessages() {
    setUserId(JSON.parse(await AsyncStorage.getItem("@user_id")));
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
          renderItem={({ item }) => (
            <Message message={item} myUserId={userId} />
          )}
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
