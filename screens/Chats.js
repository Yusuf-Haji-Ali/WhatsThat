import { FlatList, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useCallback, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NoChatsImage from "../assets/images/no_chats.png";
import axios from "axios";

// Components
import EmptyTemplate from "../components/Reusable/empty-template";
import ChatListItem from "../components/Chats/chat-list-item";
import NewChatModal from "../components/Chats/new-chat-modal";

const Chats = () => {
  const [chatData, setChatData] = useState();
  const [modalVisible, setModalVisible] = useState(false);

  const Navigation = useNavigation();

  Navigation.setOptions({
    headerRight: () => (
      <Ionicons
        name="create-outline"
        size={24}
        color="white"
        style={{ marginRight: 15 }}
        onPress={() => setModalVisible(!modalVisible)}
      />
    ),
  });

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

  const createNewChat = async (chatName) => {
    const userToken = JSON.parse(await AsyncStorage.getItem("@session_token"));

    await axios
      .post("http://localhost:3333/api/1.0.0/chat", chatName, {
        headers: {
          "X-Authorization": userToken,
        },
      })
      .then((response) => {
        console.log(`Status: ${response.status} ~ Creating chat...`);
        console.log(`Chat Created with ID: ${response.data.chat_id}`);
        // Rerender chats
        getChats();
      })
      .catch((error) => {
        console.log(
          `Status: ${error.response.status} ~ ${error.response.data}`
        );
      });
  };

  useFocusEffect(
    useCallback(() => {
      getChats();
    }, [])
  );

  return chatData ? (
    <View style={styles.container}>
      <FlatList
        data={chatData}
        renderItem={({ item }) => <ChatListItem chat={item} />}
      />
      <NewChatModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        createChat={createNewChat}
      />
    </View>
  ) : (
    // If the user has no chats yet... render empty template message showing that
    <>
      <EmptyTemplate
        image={NoChatsImage}
        text={"You have no chats :("}
        buttonTitle={"Create new chat"}
        onPress={() => setModalVisible(!modalVisible)}
      />
      <NewChatModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        createChat={createNewChat}
      />
    </>
  );
};

export default Chats;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
