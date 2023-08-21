import { useEffect, useState } from "react";

import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import * as Font from "expo-font";
export default function Dish({ navigation }) {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

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

    fetch(
      "https://8b648f3c-b624-4ceb-9e7b-8028b7df0ad0.mock.pstmn.io/dishes/v1/"
    )
      .then((response) => response.json())
      .then((json) => {
        setData(json);
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
  if (!data) return <Text>No data fetched</Text>;

  const imageList = {
    Refrigerator: require("../assets/fridge.png"),
    Microwave: require("../assets/microwaves.png"),
  };

  const getApplianceImage = (applianceName) => {
    return imageList[applianceName];
  };

  return data.dishes.map((dish) => (
    <View style={styles.dishContainer} key={dish.id}>
      <View style={styles.descBox}>
        <View style={styles.dishNameContainer}>
          <Text style={styles.dishName}>{dish.name}</Text>
          <Image
            source={require("../assets/greenDot.png")}
            style={styles.icon}
          ></Image>
          <View style={styles.ratingContainter}>
            <Text style={styles.ratingText}>{dish.rating}</Text>
            <Image source={require("../assets/star.png")}></Image>
          </View>
        </View>
        <View style={styles.dishNameContainer}>
          {dish.equipments.map((equipments) => (
            <View key={equipments}>
              <Image
                source={getApplianceImage(equipments)}
                style={{ height: 20, width: 15, marginTop: 2, marginLeft: 25 }}
              ></Image>
              <Text style={styles.IngredientsText}>{equipments}</Text>
            </View>
          ))}

          <View style={styles.verticalLine} />
          <View>
            <Text style={styles.IngredientsText}>Ingredients</Text>
            <TouchableOpacity>
              <Text
                style={styles.viewListText}
                onPress={() => navigation.navigate("ViewDish")}
              >
                {" "}
                View list
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.dishDesc}>{dish.description}</Text>
      </View>
      <View style={styles.imageBox}>
        <Image
          source={{ uri: dish.image }}
          style={{ width: 90, height: 80, borderRadius: 5 }}
        ></Image>
        <TouchableOpacity style={styles.addBox}>
          <Text style={styles.addText}>Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  ));
}
const styles = StyleSheet.create({
  dishContainer: {
    height: 150,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  descBox: {
    alignItems: "start",
    justifyContent: "start",
    flexDirection: "column",
    gap: 5,
  },
  imageBox: {
    height: 80,
    marginRight: 10,
    marginTop: 20,
  },

  addBox: {
    width: 58,
    height: 21,
    backgroundColor: "#FFFFFF",
    shadowColor: "#00000029",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    borderWidth: 0.5,
    borderColor: "#FF9A26",
    borderRadius: 3,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    left: 18,
  },
  addText: {
    color: "#FF8800",
    fontFamily: "OpenSans-SemiBold",
  },
  dishNameContainer: {
    alignItems: "start",
    justifyContent: "start",
    flexDirection: "row",
    marginTop: 10,
    gap: 10,
  },

  icon: {
    marginTop: 2,
    width: 15,
    height: 15,
  },
  dishName: {
    fontFamily: "OpenSans-SemiBold",
    fontSize: 17,
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
    marginTop: 1,
  },

  fridgeImage: {
    height: 25,
    width: 30,
    marginTop: 2,
    marginLeft: 20,
  },
  IngredientsText: {
    fontFamily: "OpenSans-Bold",
    fontSize: 13,
    marginLeft: 2,
  },
  viewListText: {
    fontFamily: "OpenSans-SemiBold",
    fontSize: 13,
    color: "#FF8800",
  },
  verticalLine: {
    height: "100%",
    width: 1,
    backgroundColor: "#D6D6D6CE",
    marginHorizontal: 8,
  },

  dishDesc: {
    width: 156,
    fontFamily: "OpenSans-Regular",
    color: "#707070",
    fontSize: 12,
  },
});
