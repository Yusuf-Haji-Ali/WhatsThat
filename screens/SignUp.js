import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TextInput,
  Pressable,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import axios from "axios";
import Header from "../components/Reusable/header";
import Input from "../components/Reusable/input";
import TextLink from "../components/Reusable/text-link";
import Button from "../components/Reusable/button";
import Title from "../components/Reusable/title";
import Loader from "../components/Reusable/loader";

export default function SignUp() {
  const Navigation = useNavigation();

  const [signUpDetails, setSignUpDetails] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const submitSignUp = () => {
    // Validation function
    // if validation passes... call postSignUp function
    // retrieve id number... print successfull sign up message
    // navigate to login page
  };

  // post request for signing up
  async function postSignUp() {
    console.log(signUpDetails);
    // const { data } = await axios.post(
    //   "http://localhost:3333/api/1.0.0/user",
    //   signUpDetails
    // );
    // console.log(data);
  }

  return (
    <View>
      <Loader visible={loading} loadingMessage={"Signing you up"} />
      <Header subTitle="Hello there!" />

      <ScrollView style={styles.form}>
        <Title title={"Sign up"} />

        <Input
          label={"First Name"}
          iconName={"account-outline"}
          placeholder={"Enter your first name"}
          onChangeText={(first_name) =>
            setSignUpDetails({ ...signUpDetails, first_name: first_name })
          }
        />

        <Input
          label={"Last Name"}
          iconName={"account-outline"}
          placeholder={"Enter your last name"}
          onChangeText={(last_name) =>
            setSignUpDetails({ ...signUpDetails, last_name: last_name })
          }
        />

        <Input
          label={"Email"}
          iconName={"email-outline"}
          placeholder={"Enter your email address"}
          onChangeText={(email) =>
            setSignUpDetails({ ...signUpDetails, email: email })
          }
        />

        <Input
          label={"Password"}
          iconName={"lock-outline"}
          placeholder={"Enter your password"}
          password
          onChangeText={(password) =>
            setSignUpDetails({ ...signUpDetails, password: password })
          }
        />

        <Button
          title={"Sign up"}
          onPress={() => {
            console.log("It worked");
            setLoading(true);
            console.log(loading);
            setTimeout(() => {
              setLoading(false);
              Navigation.navigate("RegistrationConfirmation");
            }, 1500);
          }}
        />

        <TextLink
          text={"Already got an account? "}
          linkText={"Sign in"}
          onPress={() => Navigation.navigate("sign-in")}
        />
      </ScrollView>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 24,
  },
  form: {
    margin: 30,
  },
});
