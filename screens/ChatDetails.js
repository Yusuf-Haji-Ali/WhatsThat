import { View, Text, StyleSheet, FlatList } from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import {
  useNavigation,
  useRoute,
  useFocusEffect,
} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Components
import ContactListItem from "../components/Contacts/contact-list-item";
import Input from "../components/Reusable/input";
import Colours from "../components/Reusable/colours";
import Title from "../components/Reusable/title";

const ChatDetails = () => {
  const Navigation = useNavigation();
  const Route = useRoute();
  const chatId = Route.params.chatId;
  const [chatDetails, setChatDetails] = useState("");
  const [myId, setMyId] = useState("");
  const [edit, setEdit] = useState(false);
  const chatCreator = chatDetails
    ? `${chatDetails.creator.first_name} ${chatDetails.creator.last_name}`
    : "";

  useFocusEffect(
    useCallback(() => {
      Navigation.setOptions({
        headerShown: true,
        headerRight: () => (
          <MaterialCommunityIcons
            name="pencil"
            size={20}
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
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.image}>
          <MaterialCommunityIcons
            name="account-group"
            size={75}
            color="white"
          />
        </View>
        {(edit && (
          <View style={styles.edit}>
            <Input
              placeholder={chatDetails.name}
              defaultValue={chatDetails.name}
            />
            <MaterialCommunityIcons
              name="check-circle"
              size={30}
              color={Colours.blue}
              onPress={() => setEdit(false)}
            />
          </View>
        )) || <Text style={styles.title}>{chatDetails.name}</Text>}
      </View>

      <View style={styles.members}>
        <Title title={"Members"} size={18} />

        {/* By default you are a member of the chat */}
        <ContactListItem you />
        <FlatList
          data={chatDetails.members}
          renderItem={({ item }) => (
            // Members are contacts by default pass in contact true
            <ContactListItem contact={item} isContact={true} />
          )}
        ></FlatList>
      </View>

      <Text style={styles.creator}>
        Created by: {isUserCreator() ? "You" : chatCreator}
      </Text>
    </View>
  );
};

export default ChatDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  header: {
    alignItems: "center",
  },
  image: {
    backgroundColor: Colours.lightblack,
    width: 150,
    height: 150,
    borderRadius: 75,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    textAlign: "center",
    fontWeight: "bold",
    marginVertical: 24,
  },
  subtitle: {
    marginVertical: 5,
    fontWeight: "bold",
  },
  members: {
    marginBottom: 24,
  },
  edit: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  creator: {
    fontStyle: "italic",
    fontWeight: "bold",
    fontSize: 12,
  },
});
