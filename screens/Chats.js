import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  Image,
  StyleSheet,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import ChatListItem from "../components/Chats/chat-list-item";
import axios from "axios";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NoChatsImage from "../assets/images/no_chats.png";
import Button from "../components/Reusable/button";
import EmptyTemplate from "../components/Reusable/empty-template";
import { useNavigation } from "@react-navigation/native";

const Chats = () => {
  const Navigation = useNavigation();
  const [chatData, setChatData] = useState();

  const getChats = async () => {
    console.log("loading chats...");
    const userToken = JSON.parse(await AsyncStorage.getItem("@session_token"));

    await axios
      .get("http://localhost:3333/api/1.0.0/chat", {
        headers: {
          "X-Authorization": userToken,
        },
      })
      .then((response) => {
        console.log(response.status);
        console.log(response.data);
        setChatData(response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  useEffect(() => {
    getChats();
  }, []);

  return chatData ? (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={chatData}
        renderItem={({ item }) => <ChatListItem chat={item} />}
      />
    </SafeAreaView>
  ) : (
    // If the user has no chats yet... render empty template message showing that
    <EmptyTemplate
      image={NoChatsImage}
      text={"You have no chats :("}
      buttonTitle={"Create new chat"}
      onPressFunction={() => console.log("Clicked")}
    />
  );
};

export default Chats;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 5,
  },
});
