import { View, Text, Modal, SafeAreaView, StyleSheet } from "react-native";
import React, { useState } from "react";
// Components
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Colours from "../Reusable/colours";
import Input from "../Reusable/input";
import Button from "../Reusable/button";

const MessageOptionModal = ({
  modalVisible,
  setModalVisible,
  messageData,
  updateMessage,
  deleteMessage,
}) => {
  const [updatedMessage, setUpdatedMessage] = useState({ message: "" });
  const [update, setUpdate] = useState(false);
  const isMessageUpdated =
    updatedMessage.message && updatedMessage.message !== messageData.message;

  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <SafeAreaView style={styles.container}>
        <View style={styles.modalView}>
          {/* Close Modal Button */}
          <MaterialCommunityIcons
            name={"close"}
            size={24}
            style={styles.closeButton}
            onPress={() => {
              setUpdate(false);
              setModalVisible(!modalVisible);
            }}
          />

          {!update ? (
            <View style={styles.modalButtons}>
              <Button
                title={"Update"}
                extraButtonStyle={styles.modalButton}
                onPress={() => {
                  setUpdate(!update);
                }}
              />

              <Button
                title={"Delete"}
                extraButtonStyle={[
                  styles.modalButton,
                  { backgroundColor: "#d0342c" },
                ]}
                onPress={() => {
                  // Delete message then chatscreen rerender and modal close within delete function
                  deleteMessage(messageData.message_id);
                }}
              />
            </View>
          ) : (
            <View style={styles.update}>
              <Text style={styles.modalText}>Update Message:</Text>
              <Input
                iconName={"update"}
                placeholder={messageData.message}
                defaultValue={messageData.message}
                onChangeText={(value) => {
                  setUpdatedMessage({ ...updatedMessage, message: value });
                }}
              />
              <View style={styles.modalButtons}>
                <Button
                  title={"Cancel"}
                  extraButtonStyle={[
                    styles.modalButton,
                    { backgroundColor: "#d0342c" },
                  ]}
                  onPress={() => {
                    setUpdate(!update);
                  }}
                />
                <Button
                  title={"Update"}
                  extraButtonStyle={{
                    width: "45%",
                    backgroundColor:
                      // Check if message is not empty & the same as original message
                      isMessageUpdated ? Colours.blue : "gray",
                  }}
                  onPress={() => {
                    if (isMessageUpdated) {
                      // Update Message then chatscreen rerender and modal close within update function
                      updateMessage(
                        messageData.message_id,
                        updatedMessage.message
                      );
                    }
                  }}
                />
              </View>
            </View>
          )}
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default MessageOptionModal;

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
    paddingVertical: 30,
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
  closeButton: {
    position: "absolute",
    color: Colours.blue,
    alignSelf: "flex-end",
    padding: 5,
  },
  update: {
    width: "100%",
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
  modalButton: {
    backgroundColor: Colours.blue,
    width: "45%",
  },
});
