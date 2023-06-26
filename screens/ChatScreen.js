import {
  ImageBackground,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  View,
} from "react-native";
import {
  useRoute,
  useNavigation,
  useFocusEffect,
} from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
// Components
import bg from "../assets/images/BG.png";
import Message from "../components/Chats/message-list-item";
import InputMessage from "../components/Chats/input-message";
// Authenticator
import AuthenticateUser from "../navigation/main-authentication";

const ChatScreen = () => {
  const Route = useRoute();
  const Navigation = useNavigation();

  const chatId = Route.params.id;
  const [chatName, setChatName] = useState("");
  const [messageData, setMessageData] = useState();
  const [userId, setUserId] = useState();

  useEffect(() => {
    AuthenticateUser(Navigation);
    Navigation.setOptions({
      title: chatName ? chatName : Route.params.name,
      headerShown: true,
      headerRight: () => (
        <MaterialIcons
          name="menu-open"
          size={24}
          color="white"
          style={{ marginRight: 5 }}
          onPress={() =>
            Navigation.navigate("Chat Details", {
              // pass Chat ID into route for chat details
              chatId: chatId,
            })
          }
        />
      ),
    });
  }, [chatName]);

  useFocusEffect(
    useCallback(() => {
      getChatData();
    }, [])
  );

  // GET CHAT DATA
  const getChatData = async () => {
    setUserId(JSON.parse(await AsyncStorage.getItem("@user_id")));
    const userToken = JSON.parse(await AsyncStorage.getItem("@session_token"));
    // request data from get chat by id endpoint
    await axios
      .get(`http://localhost:3333/api/1.0.0/chat/${chatId}`, {
        headers: {
          "X-Authorization": userToken,
        },
      })
      .then((response) => {
        console.log(`Status: ${response.status} ~ Loading Chat Screen...`);
        setMessageData(response.data.messages);
        setChatName(response.data.name);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 90}
      style={styles.bg}
    >
      <ImageBackground source={bg} style={styles.bg}>
        <FlatList
          data={messageData}
          renderItem={({ item }) => (
            <Message
              messageData={item}
              myUserId={userId}
              chatId={chatId}
              getChatData={getChatData}
            />
          )}
          style={styles.messages}
          inverted
        />
        <InputMessage chatId={chatId} getChatData={getChatData} />
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: "whitesmoke",
  },
  messages: {
    paddingHorizontal: 5,
  },
});
