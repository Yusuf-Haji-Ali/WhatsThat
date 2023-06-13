import {
  View,
  Text,
  Modal,
  SafeAreaView,
  StyleSheet,
  Alert,
} from "react-native";
import React, { useState } from "react";
import Colours from "../Reusable/colours";
import Input from "../Reusable/input";
import Button from "../Reusable/button";

const NewChatModal = ({ modalVisible, setModalVisible, createChat }) => {
  const [chatName, setChatName] = useState({ name: "" });

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setVisible(!modalVisible);
        }}
      >
        <SafeAreaView style={styles.container}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Enter new chat name:</Text>
            <Input
              iconName={"chat-plus-outline"}
              placeholder={"Chat Name..."}
              defaultValue={chatName.name}
              style={styles.input}
              onChangeText={(value) =>
                setChatName({ ...chatName, name: value })
              }
            />
            <View style={styles.modalButtons}>
              <Button
                title={"Cancel"}
                extraButtonStyle={{ backgroundColor: "#d0342c", width: "45%" }}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              />
              <Button
                title={"Create Chat!"}
                extraButtonStyle={{
                  width: "45%",
                  backgroundColor: chatName.name ? Colours.blue : "gray",
                }}
                onPress={
                  // Only allow user to create chat if a name is entered
                  chatName.name
                    ? () => {
                        createChat(chatName);
                        // Empty Input Box
                        setChatName({ ...chatName, name: "" });
                        // Close Modal
                        setModalVisible(!modalVisible);
                      }
                    : //  Otherwise promt user to enter a name
                      () => Alert.alert("Error", "Please enter a name")
                }
              />
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  );
};

export default NewChatModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 20,
    paddingVertical: 35,
    paddingHorizontal: 40,
    alignItems: "center",
    // Shadows
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    width: "100%",
    paddingHorizontal: 10,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  modalButtons: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
