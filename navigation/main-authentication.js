import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthenticateUser = async (Navigation) => {
  const userToken = JSON.parse(await AsyncStorage.getItem("@session_token"));
  const loggedIn = JSON.parse(await AsyncStorage.getItem("@logged_in"));
  if (!userToken || !loggedIn) {
    Navigation.navigate("Registration");
  }
};

export default AuthenticateUser;
