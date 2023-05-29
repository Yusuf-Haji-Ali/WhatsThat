import { View, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Components
import ProfileDetails from "../components/Profile/profile-details";
import ProfileOption from "../components/Profile/profile-option";
import Colours from "../components/Reusable/colours";
import Button from "../components/Reusable/button";
import Loader from "../components/Reusable/loader";

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

  useEffect(() => {
    getUserDetails();
  }, []);

  async function getUserDetails() {
    // Retrieve user authentication details
    const userId = JSON.parse(await AsyncStorage.getItem("@user_id"));
    const userToken = JSON.parse(await AsyncStorage.getItem("@session_token"));

    // Request user details from user endpoint using user's ID and Authentication token
    await axios
      .get("http://localhost:3333/api/1.0.0/user/" + userId, {
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
    // await axios
    //   .get(`http://localhost:3333/api/1.0.0/user/${userId}/photo`, {
    //     headers: {
    //       "X-Authorization": userToken,
    //       // accept: JSON.parse("*/*"),
    //     },
    //   })
    //   .then((response) => {
    //     console.log(response.status);
    //     if (!response.data) {
    //       console.log("No image found");
    //     } else {
    //       console.log(response.data);
    //       // add user photo pulled into user's details...
    //       setUserInfo({ ...userInfo, profile_photo: response.data });
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error.response.data);
    //   });
  }

  async function logOut() {
    await AsyncStorage.removeItem("@session_token");
    await AsyncStorage.removeItem("@user_id");
    await AsyncStorage.setItem("@logged_in", JSON.stringify(false));

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Navigation.navigate("Registration");
    }, 1500);

    // TO BE FINISHED!

    // setLoading(true);

    // let userToken = JSON.parse(await AsyncStorage.getItem("@session_token"));
    // console.log("User Token: ", userToken);
    // await axios
    //   .post("http://localhost:3333/api/1.0.0/logout", {
    //     headers: {
    //       "X-Authorization": userToken,
    //     },
    //   })
    //   .then(async (response) => {
    //     console.log(response.data);
    //     await AsyncStorage.removeItem("@session_token");
    //     setTimeout(() => {
    //       setLoading(false);
    //       Navigation.navigate("Registration");
    //     }, 1500);
    //   })
    //   .catch((error) => {
    //     console.log(error.response.data);
    //   });
  }

  return (
    <>
      <Loader visible={loading} loadingMessage={"Logging out"} />
      <View style={styles.container}>
        <View>
          <ProfileDetails
            firstname={userInfo.first_name}
            lastname={userInfo.last_name}
            email={userInfo.email}
            addUser={true}
            deleteUser={true}
            onPress={() => {
              Navigation.navigate("Edit Profile", {
                // pass user details as parameters into profile edit
                firstname: userInfo.first_name,
                lastname: userInfo.last_name,
                email: userInfo.email,
              });
            }}
          />
          <View style={styles.options}>
            <ProfileOption
              optionColor={Colours.blue}
              optionText={"Edit Profile"}
              iconName={"account-edit"}
              onPress={() =>
                Navigation.navigate("Edit Profile", {
                  firstname: userInfo.first_name,
                  lastname: userInfo.last_name,
                  email: userInfo.email,
                })
              }
            />
            <View style={styles.divider} />
            <ProfileOption
              optionColor={"red"}
              optionText={"Blocked Users"}
              iconName={"account-cancel"}
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
  },
  options: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  divider: {
    backgroundColor: "lightgray",
    width: 1,
    height: "100%",
    marginHorizontal: 12,
  },
});
