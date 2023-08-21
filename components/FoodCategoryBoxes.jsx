import React, { useState } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function Box({ name }) {
  const [isActive, setIsActive] = useState(false);

  const handlePress = () => {
    setIsActive(!isActive);
  };

  const boxStyle = isActive ? styles.activeBox : styles.inactiveBox;
  const textStyle = isActive ? styles.activeText : styles.inactiveText;

  return (
    <TouchableOpacity style={boxStyle} onPress={handlePress}>
      <Text style={textStyle}>{name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  activeBox: {
    backgroundColor: "#FFF9F2",
    borderWidth: 0.5,
    borderColor: "#FF941A",
    marginLeft: 18,
    borderRadius: 17,
    height: 24,
    width: 76,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#FFF9F2",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  inactiveBox: {
    backgroundColor: "white",
    borderWidth: 0.5,
    borderColor: "#FF941A",
    borderRadius: 17,
    marginLeft: 18,
    height: 24,
    width: 76,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#FFF9F2",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  activeText: {
    fontSize: 12,
    color: "#FF941A",
  },
  inactiveText: {
    fontSize: 12,
    color: "#8A8A8A",
  },
});
