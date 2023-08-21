import { StatusBar } from "expo-status-bar";
import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Platform,
  ScrollView,
} from "react-native";

import * as Font from "expo-font";
import { useEffect, useState } from "react";
import Box from "../components/FoodCategoryBoxes";
import Circle from "../components/DishNameCircle";
import Dish from "../components/DishesList";

export default function HomeScreen({ navigation }) {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        "OpenSans-SemiBold": require("../assets/fonts/OpenSans-SemiBold.ttf"),
        "OpenSans-Bold": require("../assets/fonts/OpenSans-Bold.ttf"),
      });
      setFontsLoaded(true);
    }

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.headingBox}>
        <Image
          source={require("../assets/backIcon.png")}
          style={{ marginLeft: 16 }}
        />
        <Text style={styles.heading}>Select Dishes</Text>
      </View>
      <View style={styles.blackBox}>
        <View style={styles.timeBox}>
          <Image
            source={require("../assets/calendar.png")}
            style={styles.icon}
          />

          <Text style={styles.dateText}>{new Date().toLocaleDateString()}</Text>
          <Image source={require("../assets/clock.png")} style={styles.icon} />

          <Text style={styles.dateText}>10:30 Pm-12:30 Pm</Text>
        </View>
      </View>
      <View style={styles.foodCategoryBox}>
        <Box name="Italian" />
        <Box name="Indian" />
        <Box name="Indian" />
        <Box name="Indian" />
      </View>
      <View style={styles.dishesBox}>
        <Text style={styles.dishHeading}>Popular Dishes</Text>
        <View style={styles.dishesNameContainer}>
          <Circle name="Biryani" />
          <Circle name="Pizza" />
          <Circle name="Pasta" />
          <Circle name="Fries" />
        </View>
      </View>
      <View style={styles.recommendedBox}>
        <View style={styles.headingBox}>
          <Text style={styles.dishHeading}>Recommended</Text>
          <Image source={require("../assets/arrow.png")}></Image>
        </View>
        <View style={styles.menuBox}>
          <Text style={styles.menuText}>Menu</Text>
        </View>
      </View>
      <ScrollView style={styles.dishesContainer}>
        <Dish navigation={navigation} />
      </ScrollView>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 42,
    marginLeft: 0,
    alignItems: "start",
    justifyContent: "start",
  },

  headingBox: {
    alignItems: "center",
    flexDirection: "row",
    gap: 5,
  },

  heading: {
    fontSize: 16,
    textAlign: "left",
    fontWeight: "600",
    letterSpacing: 0,
    fontFamily: "OpenSans-SemiBold",
    color: "#1C1C1C",
    opacity: 1,
    marginLeft: 16,
  },
  blackBox: {
    width: Dimensions.get("window").width,
    height: 42,
    backgroundColor: "#000",
    marginTop: 17,
    justifyContent: "center",
    alignItems: "center",
  },
  timeBox: {
    width: 314,
    height: 50,
    backgroundColor: "#FFFFFF",
    marginTop: 50,

    shadowColor: "#00000021",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 9,
    ...Platform.select({
      ios: {
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 1.0,
        shadowRadius: 4,
      },
      android: {
        elevation: 10,
      },
    }),
  },

  icon: {
    width: 18,
    height: 18,
    marginRight: 10,
    marginLeft: 25,
  },

  dateText: {
    fontSize: 16,
    fontFamily: "OpenSans-Bold",
  },

  foodCategoryBox: {
    width: Dimensions.get("window").width,
    height: 50,
    marginTop: 50,
    flexDirection: "row",
  },
  dishesBox: {
    width: Dimensions.get("window").width,
    height: 50,
  },

  dishHeading: {
    fontSize: 20,
    fontFamily: "OpenSans-Bold",
    marginLeft: 18,
  },

  dishesNameContainer: {
    marginTop: 15,
    flexDirection: "row",
  },

  recommendedBox: {
    width: Dimensions.get("window").width,
    height: 50,
    marginTop: 70,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  menuBox: {
    width: 56,
    height: 22,
    backgroundColor: "#1C1C1C",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
    shadowColor: "#00000029",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    marginRight: 22,
    marginTop: 15,
  },
  menuText: {
    color: "white",
    fontSize: 12,
  },

  dishesContainer: {
    width: 350,
    height: 80,
    alignSelf: "center",
  },
});
