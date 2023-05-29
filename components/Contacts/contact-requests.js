import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Alert from "react-native";

// ADD USER
export const addUser = async (user_id) => {
  const userToken = JSON.parse(await AsyncStorage.getItem("@session_token"));
  console.log(userToken);
  // POST user details to be added as contact
  await axios
    .post(`http://localhost:3333/api/1.0.0/user/${user_id}/contact`, {
      headers: {
        "X-Authorization": userToken,
      },
    })
    .then((response) => {
      console.log(`Status: ${response.status} ~ Adding user...`);
      setIsContact(!isContact);
    })
    .catch((error) => {
      console.log(`Status: ${error.response.status} ~ ${error.response.data}`);
      Alert.alert("Error", error.response.data);
    });
};

// DELETE USER
export const deleteUser = async (user_id) => {
  const userToken = JSON.parse(await AsyncStorage.getItem("@session_token"));
  console.log(userToken);
  // POST user details to be added as contact
  await axios
    .delete(`http://localhost:3333/api/1.0.0/user/${user_id}/contact`, {
      headers: {
        "X-Authorization": userToken,
      },
    })
    .then((response) => {
      console.log(`Status: ${response.status} ~ Deleting user...`);
      setIsContact(!isContact);
    })
    .catch((error) => {
      console.log(`Status: ${error.response.status} ~ ${error.response.data}`);
      Alert.alert("Error", error.response.data);
    });
};

// BLOCK USER
export const blockUser = async (user_id) => {
  const userToken = JSON.parse(await AsyncStorage.getItem("@session_token"));
  console.log(userToken);
  // POST user details to be added as contact
  await axios
    .post(`http://localhost:3333/api/1.0.0/user/${user_id}/block`, {
      headers: {
        "X-Authorization": userToken,
      },
    })
    .then((response) => {
      console.log(`Status: ${response.status} ~ Blocking user...`);
      setIsBlocked(!isBlocked);
    })
    .catch((error) => {
      console.log(`Status: ${error.response.status} ~ ${error.response.data}`);
      Alert.alert("Error", error.response.data);
    });
};

// UNBLOCK USER
export const unblockUser = async (user_id) => {
  const userToken = JSON.parse(await AsyncStorage.getItem("@session_token"));
  console.log(userToken);
  // POST user details to be added as contact
  await axios
    .delete(`http://localhost:3333/api/1.0.0/user/${user_id}/block`, {
      headers: {
        "X-Authorization": userToken,
      },
    })
    .then((response) => {
      console.log(`Status: ${response.status} ~ Blocking user...`);
      setIsBlocked(!isBlocked);
    })
    .catch((error) => {
      console.log(`Status: ${error.response.status} ~ ${error.response.data}`);
      Alert.alert("Error", error.response.data);
    });
};
