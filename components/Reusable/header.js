import { View, Text, StyleSheet } from "react-native";
import React from "react";

const Header = ({ subTitle }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>WHATSTHAT</Text>
      <Text style={styles.headerSubtitle}>{subTitle}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#0058BE",
    justifyContent: "center",
    alignItems: "center",
    height: 200,
  },
  headerTitle: {
    color: "white",
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 24,
  },
  headerSubtitle: {
    fontWeight: "bold",
    color: "white",
  },
});
