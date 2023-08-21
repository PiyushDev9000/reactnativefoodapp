import React, { useEffect, useState } from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ImageBackground,
} from "react-native";
import * as Font from "expo-font";
export default function Circle({ name }) {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        "OpenSans-SemiBold": require("../assets/fonts/OpenSans-SemiBold.ttf"),
        "OpenSans-Bold": require("../assets/fonts/OpenSans-Bold.ttf"),
        "OpenSans-Regular": require("../assets/fonts/OpenSans-Regular.ttf"),
      });
      setFontsLoaded(true);
    }

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }
  const images = {
    Biryani: require("../assets/Biryani.png"),
    Fries: require("../assets/Fries.jpg"),
    Pasta: require("../assets/Pasta.jpg"),
    Pizza: require("../assets/Pizza.png"),
  };
  return (
    <TouchableOpacity style={styles.box}>
      <ImageBackground source={images[name]} style={styles.image}>
        <Text style={styles.text}>{name}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  box: {
    width: 57,
    height: 57,
    opacity: 1,
    marginRight: 18,
    marginLeft: 18,
    borderRadius: 50,
    overflow: "hidden",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1C1C1C9A",
  },
  text: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    backgroundColor: "#000000a0",
    fontFamily: "OpenSans-SemiBold",
  },
});
