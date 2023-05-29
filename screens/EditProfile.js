import React from "react";
import { useRoute } from "@react-navigation/native";
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
