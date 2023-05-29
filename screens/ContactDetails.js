import { View, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import ProfileDetails from "../components/Profile/profile-details";
import { useNavigation, useRoute } from "@react-navigation/native";
import ProfileOption from "../components/Profile/profile-option";
import Colours from "../components/Reusable/colours";

const ContactDetails = () => {
  const Route = useRoute();
  const Navigation = useNavigation();
  const [isContact, setIsContact] = useState(Route.params.isContact);
  const [isBlocked, setIsBlocked] = useState(false);

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
        buttonText={"Block User"}
      />
      <View style={styles.options}>
        {isContact ? (
          <ProfileOption
            iconName={"account-remove"}
            optionText={"Delete Contact"}
            optionColor={"red"}
            onPress={() => {
              setIsContact(!isContact);
              console.log("Delete contact");
            }}
          />
        ) : (
          <ProfileOption
            iconName={"account-plus"}
            optionText={"Add Contact"}
            optionColor={"green"}
            onPress={() => {
              setIsContact(!isContact);
              console.log("Add contact");
            }}
          />
        )}
        <View style={styles.divider} />
        <ProfileOption
          iconName={"account-cancel"}
          optionText={isBlocked ? "Unblock Contact" : "Block Contact"}
          optionColor={Colours.blue}
          onPress={() => {
            setIsBlocked(!isBlocked);
            console.log("Block contact");
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
