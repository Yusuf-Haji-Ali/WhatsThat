import { View, Text, Modal, SafeAreaView, StyleSheet } from "react-native";
import React, { useState } from "react";
// Components
import Colours from "../Reusable/colours";
import Button from "../Reusable/button";

const AlertModal = ({ modal, setModal, alertFunction }) => {
  return (
    <Modal animationType="slide" transparent={true} visible={modal.visibility}>
      <SafeAreaView style={styles.container}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{modal.message}</Text>

          <View style={styles.modalButtons}>
            <Button
              title={alertFunction ? "Cancel" : "OK"}
              extraButtonStyle={styles.modalButton}
              onPress={() => setModal({ ...modal, visibility: false })}
            />

            {alertFunction && (
              <Button
                title={modal.buttonTitle}
                extraButtonStyle={[
                  styles.modalButton,
                  { backgroundColor: "#d0342c" },
                ]}
                onPress={() => {
                  setModal({ ...modal, visibility: false });
                  alertFunction();
                }}
              />
            )}
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default AlertModal;

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
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "500",
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
