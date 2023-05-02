import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  Image,
  StyleSheet,
} from "react-native";
import chats from "../assets/data/chats.json";
import ChatListItem from "../components/Chats/chat-list-item";
import {
  Feather,
  MaterialIcons,
  Ionicons,
  AntDesign,
  Entypo,
} from "@expo/vector-icons";
import axios from "axios";
import { useEffect, useState } from "react";

const Chats = () => {
  const [chatData, setChatData] = useState();

  async function getChats() {
    console.log("getChats clicked!");
    const { data } = await axios.get("http://localhost:3333/api/1.0.0/chat", {
      headers: {
        "X-Authorization": "1629f00ad8c5209974f48116e85db6cf",
      },
    });
    setChatData(data);
    console.log(data);
  }

  useEffect(() => {
    getChats();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={chatData}
        renderItem={({ item }) => <ChatListItem chat={item} />}
      />
    </SafeAreaView>
  );
};

export default Chats;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 5,
  },
});
