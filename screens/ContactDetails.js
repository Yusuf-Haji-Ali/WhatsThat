import { View, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
// Components
import ProfileDetails from "../components/Profile/profile-details";
import ProfileOption from "../components/Profile/profile-option";
import Colours from "../components/Reusable/colours";
import { addUser, deleteUser } from "../components/Contacts/contact-requests";

const ContactDetails = () => {
  const Route = useRoute();
  const Navigation = useNavigation();
  const [isContact, setIsContact] = useState(Route.params.isContact);
  const [isBlocked, setIsBlocked] = useState(false);
  const user_id = Route.params.user_id;

  useEffect(() => {
    Navigation.setOptions({
      headerShown: true,
    });
  }, []);

  return (
    <View style={styles.container}>
      <ProfileDetails
        firstname={Route.params.first_name}
        lastname={Route.params.last_name}
        email={Route.params.email}
      />

      <View style={styles.options}>
        {isContact ? (
          <ProfileOption
            iconName={"account-remove"}
            optionText={"Delete Contact"}
            optionColor={"red"}
            onPress={() => {
              // Delete user
              deleteUser(user_id);
              console.log("Delete contact");
            }}
          />
        ) : (
          <ProfileOption
            iconName={"account-plus"}
            optionText={"Add Contact"}
            optionColor={Colours.blue}
            onPress={() => {
              // Add user
              console.log("Add contact");
              addUser(user_id);
            }}
          />
        )}

        <View style={styles.divider} />

        <ProfileOption
          iconName={"account-cancel"}
          optionText={isBlocked ? "Unblock Contact" : "Block Contact"}
          optionColor={"gray"}
          onPress={() => {
            // If the user is not blocked then call block function
            blockUser();
            console.log("Block contact");
            // Else Call unblock function
          }}
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
