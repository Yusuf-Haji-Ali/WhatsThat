import { View, StyleSheet, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
// Components
import ProfileDetails from "../components/Profile/profile-details";
import ProfileOption from "../components/Profile/profile-option";
import Colours from "../components/Reusable/colours";
import AlertModal from "../components/Reusable/alert-modal";

const ContactDetails = () => {
  const Route = useRoute();
  const Navigation = useNavigation();
  const [deleteModal, setDeleteModal] = useState({
    visibility: false,
    message: "Are you sure you want to delete this contact?",
    buttonTitle: "Delete",
  });
  const [blockModal, setBlockModal] = useState({
    visibility: false,
    message: "Are you sure you want to block this contact?",
    buttonTitle: "Block",
  });
  const [isContact, setIsContact] = useState(Route.params.isContact);
  const isBlocked = Route.params.isBlocked;
  const user_id = Route.params.user_id;

  useEffect(() => {
    Navigation.setOptions({
      headerShown: true,
    });
  }, []);

  // ADD USER
  const addUser = async (user_id) => {
    const userToken = JSON.parse(await AsyncStorage.getItem("@session_token"));

    // POST user details to be added as contact
    await axios
      .post(`http://localhost:3333/api/1.0.0/user/${user_id}/contact`, "", {
        headers: {
          "X-Authorization": userToken,
        },
      })
      .then((response) => {
        console.log(`Status: ${response.status} ~ Adding user...`);
        setIsContact(true);
      })
      .catch((error) => {
        console.log(
          `Status: ${error.response.status} ~ ${error.response.data}`
        );
        Alert.alert("Add Contact Error", error.response.data);
      });
  };

  // DELETE USER
  const deleteUser = async (user_id) => {
    const userToken = JSON.parse(await AsyncStorage.getItem("@session_token"));
    console.log(userToken);

    // DELETE request to contact enpoint with user details
    await axios
      .delete(`http://localhost:3333/api/1.0.0/user/${user_id}/contact`, {
        headers: {
          "X-Authorization": userToken,
        },
      })
      .then((response) => {
        console.log(`Status: ${response.status} ~ Deleting user...`);
        // Go back to previous screen
        Navigation.goBack();
      })
      .catch((error) => {
        console.log(
          `Status: ${error.response.status} ~ ${error.response.data}`
        );
        Alert.alert("Error", error.response.data);
      });
  };

  // BLOCK USER
  const blockUser = async (user_id) => {
    const userToken = JSON.parse(await AsyncStorage.getItem("@session_token"));
    console.log(userToken);

    // POST user details to be blocked
    await axios
      .post(`http://localhost:3333/api/1.0.0/user/${user_id}/block`, "", {
        headers: {
          "X-Authorization": userToken,
        },
      })
      .then((response) => {
        console.log(`Status: ${response.status} ~ Blocking user...`);
        // Go back to previous screen
        Navigation.goBack();
      })
      .catch((error) => {
        console.log(
          `Status: ${error.response.status} ~ ${error.response.data}`
        );
        Alert.alert("Block User Error", error.response.data);
      });
  };

  // UNBLOCK USER
  const unblockUser = async (user_id) => {
    const userToken = JSON.parse(await AsyncStorage.getItem("@session_token"));

    // DELETE request to block endpoint with user details
    await axios
      .delete(`http://localhost:3333/api/1.0.0/user/${user_id}/block`, {
        headers: {
          "X-Authorization": userToken,
        },
      })
      .then((response) => {
        console.log(`Status: ${response.status} ~ Unblocking user...`);
        // Go back to previous screen
        Navigation.goBack();
      })
      .catch((error) => {
        console.log(
          `Status: ${error.response.status} ~ ${error.response.data}`
        );
        Alert.alert("Unblock User Error", error.response.data);
      });
  };

  return (
    <View style={styles.container}>
      <ProfileDetails
        firstname={Route.params.first_name}
        lastname={Route.params.last_name}
        email={Route.params.email}
      />

      <View style={styles.options}>
        {isContact && !isBlocked ? (
          // Check if the user is a contact and not blocked... if so render the options to delete/block user
          <>
            <ProfileOption
              iconName={"account-remove"}
              optionText={"Delete Contact"}
              optionColor={"red"}
              onPress={() =>
                setDeleteModal({ ...deleteModal, visibility: true })
              }
            />
            <View style={styles.divider} />
            <ProfileOption
              iconName={"account-cancel"}
              optionText={isBlocked ? "Unblock Contact" : "Block Contact"}
              optionColor={"gray"}
              onPress={() => setBlockModal({ ...blockModal, visibility: true })}
            />
          </>
        ) : isBlocked ? (
          // Else check if the user is blocked...if so show option to unblock
          <ProfileOption
            iconName={"account-plus"}
            optionText={"Unblock User"}
            optionColor={Colours.blue}
            onPress={() => unblockUser(user_id)}
          />
        ) : (
          // else show option to add user
          <ProfileOption
            iconName={"account-plus"}
            optionText={"Add Contact"}
            optionColor={Colours.blue}
            onPress={() => addUser(user_id)}
          />
        )}

        {/* DELETE ALERT MODAL */}
        <AlertModal
          modal={deleteModal}
          setModal={setDeleteModal}
          alertFunction={() => deleteUser(user_id)}
        />
        {/* BLOCK ALERT MODAL */}
        <AlertModal
          modal={blockModal}
          setModal={setBlockModal}
          alertFunction={() => blockUser(user_id)}
        />
      </View>
    </View>
  );
};

export default ContactDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 48,
  },
  options: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  divider: {
    backgroundColor: "lightgray",
    width: 1,
    height: "100%",
  },
});
