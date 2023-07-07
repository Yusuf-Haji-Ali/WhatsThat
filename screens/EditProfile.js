import { Alert, StyleSheet, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import EditProfileInfo from "../components/Profile/edit-profile-details";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
// Authenticator
import AuthenticateUser from "../navigation/main-authentication";

const EditProfile = () => {
  const Navigation = useNavigation();
  // edit options
  const [editing, setEditing] = useState(false);
  const [cancel, setCancel] = useState(false);
  // userDetails
  const [userInfo, setUserInfo] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });
  const [profilePhoto, setProfilePhoto] = useState("");
  const [newUserInfo, setNewUserInfo] = useState({});

  useEffect(() => {
    AuthenticateUser(Navigation);
    getUserInfo();

    Navigation.setOptions({
      headerShown: true,
      headerRight: () =>
        editing ? (
          <Text
            style={styles.headerText}
            onPress={() => {
              if (newUserInfo) {
                updateUserInfo();
                setEditing(false);
              }
            }}
          >
            Done
          </Text>
        ) : (
          cancel && (
            <Text
              style={styles.headerText}
              onPress={() => {
                setCancel(false);
              }}
            >
              Cancel
            </Text>
          )
        ),
    });
  }, [editing, cancel, newUserInfo]);

  const getUserInfo = async () => {
    // Retrieve user authentication details
    const userId = JSON.parse(await AsyncStorage.getItem("@user_id"));
    const userToken = JSON.parse(await AsyncStorage.getItem("@session_token"));

    // execute simultaneous requests
    axios
      .all([
        // Request user details from user endpoint using user's ID and Authentication token
        axios.get(`http://localhost:3333/api/1.0.0/user/${userId}`, {
          headers: {
            "X-Authorization": userToken,
          },
        }),
        // Get user's profile photo
        axios.get(`http://localhost:3333/api/1.0.0/user/${userId}/photo`, {
          headers: {
            "X-Authorization": userToken,
          },
          responseType: "blob",
        }),
      ])
      .then(
        axios.spread((userDetailsResponse, profilePhotoResponse) => {
          // HANDLING USER DETAILS RESPONSE
          console.log(
            `Status: ${userDetailsResponse.status} ~ Getting User's Details...`
          );
          // store user data pulled...
          setUserInfo(userDetailsResponse.data);

          // HANDLING PROFILE PHOTO RESPONSE
          console.log(
            `Status: ${profilePhotoResponse.status} ~ Getting User's Profile Photo...`
          );
          const imageData = URL.createObjectURL(profilePhotoResponse.data);
          setProfilePhoto(imageData);
        })
      )
      .catch(
        axios.spread((userDetailsError, profilePhotoError) => {
          console.log(
            `Status: ${userDetailsError.response.status} ~ ${userDetailsError.response.data}`
          );
          console.log(
            `Status: ${profilePhotoError.response.status} ~ ${profilePhotoError.response.data}`
          );
        })
      );
  };

  // HIT update user information endpoint
  const updateUserInfo = async () => {
    const user_id = JSON.parse(await AsyncStorage.getItem("@user_id"));
    const userToken = JSON.parse(await AsyncStorage.getItem("@session_token"));

    // PATCH send new name to update chat info endpoint
    await axios
      .patch(`http://localhost:3333/api/1.0.0/user/${user_id}`, newUserInfo, {
        headers: {
          "X-Authorization": userToken,
        },
      })
      .then((response) => {
        console.log(
          `Status: ${response.status} ~ Updating User's Information...`
        );
        // rerender page
        getUserInfo();
      })
      .catch((error) => {
        console.log(error.response.data);
        Alert.alert("Error", error.response.data);
      });
  };

  return (
    <EditProfileInfo
      userInfo={userInfo}
      profilePhoto={profilePhoto}
      newUserInfo={newUserInfo}
      setNewUserInfo={setNewUserInfo}
      setEditing={setEditing}
      setCancel={setCancel}
    />
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  headerText: {
    color: "white",
    fontWeight: "500",
    marginHorizontal: 5,
  },
});
