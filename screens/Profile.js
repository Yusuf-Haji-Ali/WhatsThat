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
    profile_photo: "",
  });

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

    // Request user details from user endpoint using user's ID and Authentication token
    await axios
      .get(`http://localhost:3333/api/1.0.0/user/${userId}`, {
        headers: {
          "X-Authorization": userToken,
        },
      })
      .then((response) => {
        console.log(`Status: ${response.status} ~ Getting User's Details...`);
        console.log(response.data);
        // store user data pulled...
        setUserInfo(response.data);
      })
      .catch((error) => {
        console.log(
          `Status: ${error.response.status} ~ ${error.response.data}`
        );
      });

    // Get user's profile photo if exists
    fetch(`http://localhost:3333/api/1.0.0/user/${userId}/photo`, {
      headers: {
        "X-Authorization": userToken,
      },
    })
      .then((res) => {
        return res.blob();
      })
      .then((resBlob) => {
        let data = URL.createObjectURL(resBlob);
        console.log(data);
        setUserInfo({ ...userInfo, profile_photo: data });
      })
      .catch((error) => {
        console.log(`Status: ${error} `);
      });
  }

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
            profile_photo={userInfo.profile_photo}
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
