import { View, StyleSheet } from "react-native";
import React, { useState, useCallback } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Components
import ProfileDetails from "../components/Profile/profile-details";
import ProfileOption from "../components/Profile/profile-option";
import Colours from "../components/Reusable/colours";
import Button from "../components/Reusable/button";
import Loader from "../components/Reusable/loader";
// Authenticator
import AuthenticateUser from "../navigation/main-authentication";

const Profile = () => {
  const Navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({
    first_name: "",
    last_name: "",
    email: "",
    id: "",
  });
  const [profilePhoto, setProfilePhoto] = useState("");

  useFocusEffect(
    useCallback(() => {
      AuthenticateUser(Navigation);
      getUserDetails();
    }, [])
  );

  async function getUserDetails() {
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
          // Store user's profile photo
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
  }

  // LOG OUT...
  const logOut = async () => {
    setLoading(true);

    const userToken = JSON.parse(await AsyncStorage.getItem("@session_token"));

    await axios
      .post(`http://localhost:3333/api/1.0.0/logout`, "", {
        headers: {
          "X-Authorization": userToken,
        },
      })
      .then((response) => {
        console.log(
          `Status: ${response.status} ${response.data} ~ Logging out...`
        );
        setTimeout(async () => {
          setLoading(false);
          Navigation.navigate("Registration");
          // Reset all logged in user Authentication
          await AsyncStorage.removeItem("@session_token");
          await AsyncStorage.removeItem("@user_id");
          await AsyncStorage.setItem("@logged_in", JSON.stringify(false));
        }, 1500);
      })
      .catch((error) => {
        console.log(
          `Status: ${error.response.status} ~ ${error.response.data}`
        );
      });
  };

  return (
    <>
      <Loader visible={loading} loadingMessage={"Logging out"} />
      <View style={styles.container}>
        <View>
          <ProfileDetails
            firstname={userInfo.first_name}
            lastname={userInfo.last_name}
            email={userInfo.email}
            profilePhoto={profilePhoto}
            onPress={() => {
              Navigation.navigate("Edit Profile");
            }}
          />

          <View style={styles.options}>
            <ProfileOption
              optionColor={Colours.blue}
              optionText={"Edit Profile"}
              iconName={"account-edit"}
              onPress={() => Navigation.navigate("Edit Profile")}
            />

            <View style={styles.divider} />

            <ProfileOption
              optionColor={"gray"}
              optionText={"Blocked Users"}
              iconName={"account-cancel"}
              onPress={() => Navigation.navigate("Blocked Users")}
            />
          </View>
        </View>

        <Button title={"Log out"} onPress={logOut} />
      </View>
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    padding: 40,
    backgroundColor: "white",
  },
  options: {
    flexDirection: "row",
  },
  divider: {
    backgroundColor: "lightgray",
    width: 1,
    height: "100%",
  },
});
