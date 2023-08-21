import { StyleSheet, View } from "react-native";

import React from "react";
import AppNavigator from "./AppNavigator.js";

export default function App() {
  return (
    <View style={styles.container}>
      <AppNavigator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginLeft: 0,
    alignItems: "start",
    justifyContent: "start",
  },
});
