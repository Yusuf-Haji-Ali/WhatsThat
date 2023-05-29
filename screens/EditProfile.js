import React, { useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import EditProfileDetails from "../components/Profile/edit-profile-details";

const EditProfile = () => {
  const Route = useRoute();
  const Navigation = useNavigation();
  const firstname = Route.params.firstname;
  const lastname = Route.params.lastname;
  const email = Route.params.email;

  useEffect(() => {
    Navigation.setOptions({
      headerShown: true,
    });
  }, []);

  return (
    <EditProfileDetails
      firstname={firstname}
      lastname={lastname}
      email={email}
    />
  );
};

export default EditProfile;
