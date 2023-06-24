import { StyleSheet, View, Alert } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useState, useCallback } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Components
import Header from "../components/Reusable/header";
import Input from "../components/Reusable/input";
import Button from "../components/Reusable/button";
import TextLink from "../components/Reusable/text-link";
import Title from "../components/Reusable/title";
import Loader from "../components/Reusable/loader";
import AlertModal from "../components/Reusable/alert-modal";

const SignIn = () => {
  const Navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      setErrors(false);
    }, [])
  );

  const [loginDetails, setLoginDetails] = useState({ email: "", password: "" });
  const [signInModal, setSignInModal] = useState({
    visibility: false,
    message: "Invalid email/password supplied!",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Basic Validation of form inputs
  const handleError = (error, input) => {
    setErrors((errors) => ({ ...errors, [input]: error }));
  };

  const validate = async () => {
    console.log(loginDetails);

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

  // SIGN IN...
  const postSignIn = async () => {
    setLoading(true);

    // Hit log in endpoint with POST method
    await axios
      .post("http://localhost:3333/api/1.0.0/login", loginDetails)
      .then(async (response) => {
        console.log(`Status: ${response.status} ~ Logging in...`);
        console.log(response.data);

        // Mark user as logged in
        await AsyncStorage.setItem("@logged_in", JSON.stringify(true));

        // store user's data in asyncStorage...
        await AsyncStorage.setItem(
          "@user_id",
          JSON.stringify(response.data.id)
        );
        await AsyncStorage.setItem(
          "@session_token",
          JSON.stringify(response.data.token)
        );

        setTimeout(() => {
          setLoading(false);
          Navigation.navigate("Home");
        }, 1500);
      })
      .catch((error) => {
        setTimeout(() => {
          setLoading(false);
          console.log(
            `Status: ${error.response.status} ~ ${error.response.data}`
          );

          if (error.response.status === 400) {
            // Alert.alert("Error", "Invalid email/password supplied!");
            setSignInModal({ ...signInModal, visibility: true });
          }
        }, 1500);
      });
  };

  //Main Frontend Rendering
  return (
    <View styles={styles.container}>
      <Loader visible={loading} loadingMessage={"Signing in"} />

      <Header subTitle="Welcome back!" style={styles.header} />

      <View style={styles.form}>
        <Title title={"Sign in"} size={28} />

        <Input
          label={"Email"}
          iconName={"email-outline"}
          placeholder={"Enter your email address"}
          onFocus={() => setErrors({ ...errors, email: null })}
          onChangeText={(email) =>
            setLoginDetails({ ...loginDetails, email: email.toLowerCase() })
          }
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
          onPress={() => Navigation.navigate("Sign Up")}
        />
      </View>

      {/* SIGNIN ALERT MODAL */}
      <AlertModal modal={signInModal} setModal={setSignInModal} />
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 24,
  },
  form: {
    margin: 30,
  },
});
