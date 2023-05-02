import { View, Text, TextInput, StyleSheet } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import Colours from "../components/Reusable/colours";
import Input from "../components/Reusable/input";
import EditProfileDetails from "../components/Profile/edit-profile-details";

const EditProfile = () => {
  const Route = useRoute();
  const firstname = Route.params.firstname;
  const lastname = Route.params.lastname;
  const email = Route.params.email;

  return (
    <EditProfileDetails
      firstname={firstname}
      lastname={lastname}
      email={email}
    />
  );
};

export default EditProfile;
