import React, { useState, useCallback } from "react";
import {
  useNavigation,
  useRoute,
  useFocusEffect,
} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ChatDetailsUi from "../components/Chats/chat-details-ui";

const ChatDetails = () => {
  const Navigation = useNavigation();
  const Route = useRoute();
  const chatId = Route.params.chatId;
  const [chatDetails, setChatDetails] = useState("");
  const [myId, setMyId] = useState("");
  const [edit, setEdit] = useState(false);

  useFocusEffect(
    useCallback(() => {
      Navigation.setOptions({
        headerShown: true,
        headerRight: () =>
          isUserCreator() && (
            <MaterialCommunityIcons
              name="pencil"
              size={20}
              style={{ marginRight: 5 }}
              color="white"
              onPress={() => {
                setEdit(!edit);
              }}
            />
          ),
      });
      getChatDetails();
    }, [])
  );

  const getChatDetails = async () => {
    // Hit single chat details endpoint

    setMyId(JSON.parse(await AsyncStorage.getItem("@user_id")));
    const userToken = JSON.parse(await AsyncStorage.getItem("@session_token"));

    // request data from get chat by id endpoint
    await axios
      .get(`http://localhost:3333/api/1.0.0/chat/${chatId}`, {
        headers: {
          "X-Authorization": userToken,
        },
      })
      .then((response) => {
        console.log(`Status: ${response.status} ~ Getting Chat details...`);
        setChatDetails(response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  // Check if current user's id matches creator of the chat
  const isUserCreator = () => {
    return chatDetails ? chatDetails.creator.user_id === myId : false;
  };

  return (
    <ChatDetailsUi
      chatDetails={chatDetails}
      isUserCreator={isUserCreator}
      edit={edit}
      myId={myId}
    />
  );
};

export default ChatDetails;
