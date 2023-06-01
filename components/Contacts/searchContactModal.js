import { Text, Modal, SafeAreaView, StyleSheet, Alert } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Search from "../../screens/Search";
import Colours from "../Reusable/colours";

const SearchContactModal = ({ modalVisible, setModalVisible }) => {
  return (
    <>
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setVisible(!modalVisible);
        }}
      >
        <SafeAreaView style={styles.container}>
          <MaterialCommunityIcons
            name="close"
            size={30}
            style={styles.close}
            onPress={() => setModalVisible(!modalVisible)}
          />
          <Text style={styles.modalText}>Enter User to add to chat:</Text>
          <Search />
        </SafeAreaView>
      </Modal>
    </>
  );
};

export default SearchContactModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  close: {
    alignSelf: "flex-end",
    marginRight: 15,
    color: Colours.blue,
    fontWeight: "bold",
  },
  modalText: {
    marginTop: 15,
    textAlign: "center",
  },
});
