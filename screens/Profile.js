import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import ProfileItem from "../components/Profile/profile-details";
import Button from "../components/Reusable/button";
import Loader from "../components/Reusable/loader";
import Colours from "../components/Reusable/colours";

const Profile = () => {
  const Navigation = useNavigation();

  const firstname = "Yusi";
  const lastname = "Abz";
  const email = "Yusi@gmail.com";
  const [loading, setLoading] = useState(false);

  const logOut = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Navigation.navigate("Registration");
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <Loader visible={loading} loadingMessage={"Logging out"} />
      <ProfileItem
        firstname={firstname}
        lastname={lastname}
        email={email}
        buttonText={"Edit Profile"}
        onPress={() => {
          Navigation.navigate("Edit Profile", {
            firstname: firstname,
            lastname: lastname,
            email: email,
          });
        }}
      />

      <Button title={"Log out"} onPress={logOut} style={{ margin: 24 }} />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingBottom: 12,
  },
});
