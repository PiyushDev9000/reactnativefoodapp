import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import * as Font from "expo-font";
import { useEffect, useState } from "react";

export default function ({ navigation }) {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [dishData, setDishData] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        "OpenSans-SemiBold": require("../assets/fonts/OpenSans-SemiBold.ttf"),
        "OpenSans-Bold": require("../assets/fonts/OpenSans-Bold.ttf"),
        "OpenSans-Regular": require("../assets/fonts/OpenSans-Regular.ttf"),
        "OpenSans-ExtraBold": require("../assets/fonts/OpenSans-ExtraBold.ttf"),
      });
      setFontsLoaded(true);
    }

    loadFonts();

    fetch(
      "https://8b648f3c-b624-4ceb-9e7b-8028b7df0ad0.mock.pstmn.io/dishes/v1/1"
    )
      .then((response) => response.json())
      .then((json) => {
        setDishData(json);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  if (loading) return <Text>Loading...</Text>;
  if (!dishData) return <Text>No data fetched</Text>;

  const imageList = {
    Refrigerator: require("../assets/bigfridge.png"),
    Microwave: require("../assets/microwave.png"),
    Stove: require("../assets/stove.png"),
  };

  const getApplianceImage = (applianceName) => {
    return imageList[applianceName];
  };
  return (
    <View style={styles.container} key={dishData.id}>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Image
          source={require("../assets/backIcon.png")}
          style={{ marginTop: 50, marginLeft: 10 }}
        />
      </TouchableOpacity>
      <View style={styles.dishDescContainer}>
        <View style={styles.dishNameBox}>
          <Text style={styles.dishNameText}>{dishData.name}</Text>
          <View style={styles.ratingContainter}>
            <Text style={styles.ratingText}>4.2</Text>
            <Image source={require("../assets/star.png")}></Image>
          </View>
        </View>
        <Text style={styles.descText}>
          Mughlai Masala is a style of cookery developed in the Indian
          Subcontinent by the imperial kitchens of the Mughal Empire.
        </Text>
        <View style={styles.timeBox}>
          <Image source={require("../assets/clock.png")}></Image>
          <Text>{dishData.timeToPrepare}</Text>
        </View>
        <Image
          style={styles.vegetableImage}
          source={require("../assets/vegetable.png")}
        ></Image>
      </View>
      <View
        style={{
          borderBottomColor: "#F2F2F2",
          marginTop: 8,
          borderBottomWidth: 2,
          zIndex: -99,
        }}
      />

      <View
        style={{
          backgroundColor: "#fff",
          width: 370,
          height: 50,
          alignItems: "start",
          justifyContent: "start",
          flexDirection: "column",
          marginTop: 15,
          marginLeft: 20,
        }}
      >
        <Text
          style={{
            fontFamily: "OpenSans-Bold",
            fontSize: 16,
          }}
        >
          Ingredients
        </Text>
        <Text style={styles.descText}>2 People</Text>
      </View>
      <View
        style={{
          borderBottomColor: "#F2F2F2",
          marginTop: 1,
          borderBottomWidth: 2,
          zIndex: -99,
        }}
      />

      <View style={styles.headingBox}>
        <Text style={styles.dishHeading}>
          vegetable ({dishData.ingredients.vegetables.length})
        </Text>
        <Image source={require("../assets/arrow.png")}></Image>
      </View>
      <View style={styles.vegetablesContainer}>
        {dishData.ingredients &&
          dishData.ingredients.vegetables &&
          dishData.ingredients.vegetables.map((vegetable, index) => (
            <View key={index} style={styles.vegetable}>
              <Text style={styles.vegeText}>{vegetable.name}</Text>
              <Text style={styles.vegeText}>{vegetable.quantity}</Text>
            </View>
          ))}
      </View>
      <View style={styles.headingBox}>
        <Text style={styles.dishHeading}>
          Spices ({dishData.ingredients.spices.length})
        </Text>
        <Image source={require("../assets/arrow.png")}></Image>
      </View>
      <View style={styles.vegetablesContainer}>
        {dishData.ingredients &&
          dishData.ingredients.spices &&
          dishData.ingredients.spices.map((spice, index) => (
            <View key={index} style={styles.vegetable}>
              <Text style={styles.vegeText}>{spice.name}</Text>
              <Text style={styles.vegeText}>{spice.quantity}</Text>
            </View>
          ))}
      </View>

      <View style={styles.AppliancesContainer}>
        <Text
          style={{
            fontFamily: "OpenSans-Bold",
            fontSize: 25,
          }}
        >
          Appliances
        </Text>
        <View style={styles.allapplianceContainer}>
          {dishData.ingredients &&
            dishData.ingredients.appliances &&
            dishData.ingredients.appliances.map((appliance, index) => (
              <View key={index} style={styles.imageContainer}>
                <Image
                  source={getApplianceImage(appliance.name)}
                  style={{
                    width: 30,
                    height: 55,
                    alignSelf: "center",
                    marginTop: 20,
                  }}
                ></Image>
                <Text
                  style={{
                    fontFamily: "OpenSans-Regular",
                    fontSize: 12,
                    alignSelf: "center",
                  }}
                >
                  {appliance.name}
                </Text>
              </View>
            ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    marginLeft: 0,
    alignItems: "start",
    justifyContent: "start",
  },
  dishDescContainer: {
    backgroundColor: "#fff",
    width: 370,
    height: 180,
    alignItems: "start",
    justifyContent: "start",
    flexDirection: "column",
    marginTop: 15,
    marginLeft: 20,
  },

  dishNameBox: {
    alignItems: "start",
    justifyContent: "start",
    flexDirection: "row",
    gap: 10,
  },
  dishNameText: {
    fontFamily: "OpenSans-ExtraBold",
    fontSize: 25,
  },
  descText: {
    width: 200,
    fontFamily: "OpenSans-Regular",
    color: "#707070",
    fontSize: 12,
    marginTop: 5,
  },
  ratingText: {
    fontFamily: "OpenSans-SemiBold",
    fontSize: 12,
    color: "#FFFFFF",
  },
  ratingContainter: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    width: 40,
    height: 17,
    backgroundColor: "#51C452",
    borderRadius: 2,
    gap: 5,
    marginTop: 7,
  },
  timeBox: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 5,
    bottom: 0,
  },
  vegetableImage: {
    position: "absolute",
    right: 0,
    height: 200,
    width: 230,
  },
  headingBox: {
    alignItems: "center",
    flexDirection: "row",
    gap: 5,
    marginTop: 15,
  },
  dishHeading: {
    fontSize: 20,
    fontFamily: "OpenSans-Bold",
    marginLeft: 18,
  },
  vegetablesContainer: {
    flexDirection: "column",
    width: 370,
    gap: 8,
    marginTop: 8,
  },
  vegetable: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    marginLeft: 20,
  },
  vegeText: {
    fontSize: 10,
    fontFamily: "OpenSans-Regular",
  },
  AppliancesContainer: {
    alignItems: "start",
    flexDirection: "column",
    gap: 5,
    marginTop: 18,
    marginLeft: 18,
    marginRight: 12,
  },
  imageContainer: {
    backgroundColor: "#F5F5F5",
    width: 71,
    height: 95,
  },
  allapplianceContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
