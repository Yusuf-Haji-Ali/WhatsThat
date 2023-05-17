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

// Components
import Header from "../components/Reusable/header";
import Input from "../components/Reusable/input";
import Button from "../components/Reusable/button";
import TextLink from "../components/Reusable/text-link";
import Title from "../components/Reusable/title";
import Loader from "../components/Reusable/loader";

export default function SignIn() {
  const Navigation = useNavigation();

  const [loginDetails, setLoginDetails] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Basic Validation of form inputs
  const validate = async () => {
    let isValid = true;
    if (!loginDetails.email) {
      handleError("Please input email", "email");
      isValid = false;
    }
    if (!loginDetails.password) {
      handleError("Please input password", "password");
      isValid = false;
    }
    if (isValid) {
      postSignIn();
    }
  };

  const handleError = (error, input) => {
    setErrors((errors) => ({ ...errors, [input]: error }));
  };

  async function postSignIn() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Navigation.navigate("Home");
    }, 1500);
    // const { data } = await axios.post(
    //   "http://localhost:3333/api/1.0.0/login",
    //   loginDetails
    // );
    // const { status } = await axios.post(
    //   "http://localhost:3333/api/1.0.0/login",
    //   loginDetails
    // );
    // console.log(data);
    // console.log(status);
    // if (status === 201) {
    //   Navigation.navigate("Home");
    // }
    console.log(loginDetails);
  }

  return (
    <View styles={styles.container}>
      <Loader visible={loading} loadingMessage={"Signing in"} />

      <Header subTitle="Welcome back!" style={styles.header} />

      <View style={styles.form}>
        <Title title={"Sign in"} />

        <Input
          label={"Email"}
          iconName={"email-outline"}
          placeholder={"Enter your email address"}
          onFocus={() => setErrors({ ...errors, email: null })}
          onChangeText={(email) => {
            setLoginDetails({ ...loginDetails, email: email });
          }}
          error={errors.email}
        />

        <Input
          label={"Password"}
          iconName={"lock-outline"}
          placeholder={"Enter your password"}
          password
          onFocus={() => setErrors({ ...errors, password: null })}
          onChangeText={(password) => {
            setLoginDetails({ ...loginDetails, password: password });
          }}
          error={errors.password}
        />

        <Button title={"Sign in"} onPress={validate} />

        {/* Link to Sign Up Screen */}
        <TextLink
          text={"Haven't got an Account yet? "}
          linkText={"Sign up"}
          onPress={() => Navigation.navigate("sign-up")}
        />
      </View>
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
