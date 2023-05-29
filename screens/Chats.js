import { FlatList, SafeAreaView, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NoChatsImage from "../assets/images/no_chats.png";
import axios from "axios";

// Components
import EmptyTemplate from "../components/Reusable/empty-template";
import ChatListItem from "../components/Chats/chat-list-item";

const Chats = () => {
  const [chatData, setChatData] = useState();

  const getChats = async () => {
    const userToken = JSON.parse(await AsyncStorage.getItem("@session_token"));

    await axios
      .get("http://localhost:3333/api/1.0.0/chat", {
        headers: {
          "X-Authorization": userToken,
        },
      })
      .then((response) => {
        console.log(`Status: ${response.status} ~ Loading Chats...`);
        setChatData(response.data);
      })
      .catch((error) => {
        console.log(
          `Status: ${error.response.status} ~ ${error.response.data}`
        );
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
