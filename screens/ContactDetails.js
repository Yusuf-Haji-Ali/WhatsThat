import { View, Text, StyleSheet } from "react-native";
import React from "react";
import ProfileItem from "../components/Profile/profile-details";
import { useRoute } from "@react-navigation/native";

const ContactDetails = () => {
  const Route = useRoute();

  const name = Route.params.name;
  const email = Route.params.email;
  return (
    <View style={styles.container}>
      <ProfileItem
        firstname={name}
        lastname={name}
        email={email}
        buttonText={"Block User"}
      />
    </View>
  );
};

export default ContactDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    padding: 48,
  },
});
