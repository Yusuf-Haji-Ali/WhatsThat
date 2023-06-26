import { StyleSheet, ScrollView, Alert } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useState, useCallback } from "react";
import axios from "axios";

// Components
import Header from "../components/Reusable/header";
import Input from "../components/Reusable/input";
import TextLink from "../components/Reusable/text-link";
import Button from "../components/Reusable/button";
import Title from "../components/Reusable/title";
import Loader from "../components/Reusable/loader";
import AlertModal from "../components/Reusable/alert-modal";

const SignUp = () => {
  const Navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      setErrors(false);
    }, [])
  );

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [signUpModal, setSignUpModal] = useState({
    visibility: false,
    message:
      "Email must be valid and password must be greater than 8 characters (including: one uppercase, one number and one special)",
  });
  const [signUpDetails, setSignUpDetails] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  // Basic Validation of form inputs
  const handleError = (error, input) => {
    setErrors((errors) => ({ ...errors, [input]: error }));
  };

  const validate = async () => {
    console.log(signUpDetails);

    let isValid = true;
    if (!signUpDetails.email) {
      handleError("Please input an email", "email");
      isValid = false;
    }
    if (!signUpDetails.first_name) {
      handleError("Please input your first name", "first_name");
      isValid = false;
    }
    if (!signUpDetails.last_name) {
      handleError("Please input your last name", "last_name");
      isValid = false;
    }
    if (!signUpDetails.password) {
      handleError("Please input a password", "password");
      isValid = false;
    }

    if (isValid) {
      postSignUp();
    }
  };

  // SIGNING UP...
  const postSignUp = async () => {
    setLoading(true);

    // POST sign up details to signup end point
    await axios
      .post("http://localhost:3333/api/1.0.0/user", signUpDetails)
      .then((response) => {
        console.log(`Status: ${response.status} ~ Signing up... `);
        console.log(`New User created with ID: ${response.data.user_id}`);
        setTimeout(() => {
          setLoading(false);
          Navigation.navigate("Confirmation");
        }, 1500);
      })
      .catch((error) => {
        /* The request was made and the server responded with a status code
          that falls out of the range of 2xx */

        setTimeout(() => {
          setLoading(false);
          console.log(
            `Status: ${error.response.status} ~ ${error.response.status}`
          );
          setSignUpModal({ ...signUpModal, visibility: true });
        }, 1500);
      });
  };

  return (
    <>
      <Loader visible={loading} loadingMessage={"Signing up"} />
      <Header subTitle="Hello there!" />

      <ScrollView style={styles.form}>
        <Title title={"Sign up"} size={28} />

        <Input
          label={"First Name"}
          iconName={"account-outline"}
          placeholder={"Enter your first name"}
          onChangeText={(first_name) =>
            setSignUpDetails({ ...signUpDetails, first_name: first_name })
          }
          error={errors.first_name}
          onFocus={() => setErrors({ ...errors, first_name: null })}
        />

        <Input
          label={"Last Name"}
          iconName={"account-outline"}
          placeholder={"Enter your last name"}
          onChangeText={(last_name) =>
            setSignUpDetails({ ...signUpDetails, last_name: last_name })
          }
          error={errors.last_name}
          onFocus={() => setErrors({ ...errors, last_name: null })}
        />

        <Input
          label={"Email"}
          iconName={"email-outline"}
          placeholder={"Enter your email address"}
          onChangeText={(email) =>
            setSignUpDetails({ ...signUpDetails, email: email.toLowerCase() })
          }
          error={errors.email}
          onFocus={() => setErrors({ ...errors, email: null })}
        />

        <Input
          label={"Password"}
          iconName={"lock-outline"}
          placeholder={"Enter your password"}
          password
          onChangeText={(password) =>
            setSignUpDetails({ ...signUpDetails, password: password })
          }
          error={errors.password}
          onFocus={() => setErrors({ ...errors, password: null })}
        />

        <Button title={"Sign up"} onPress={validate} />

        <TextLink
          text={"Already got an account? "}
          linkText={"Sign in"}
          onPress={() => Navigation.navigate("Sign In")}
        />
        {/* SIGNUP ALERT MODAL */}
        <AlertModal modal={signUpModal} setModal={setSignUpModal} />
      </ScrollView>
    </>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  form: {
    marginHorizontal: 30,
    marginVertical: 10,
  },
});
