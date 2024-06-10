import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const BottomTabs = () => {
  const navigation = useNavigation();
  const window = Dimensions.get("window");
  const windowHeight = window.height;

  goToHome = () => {
    navigation.navigate("Main", {
      screen: "Home",
    });
  };

  goToMarket = () => {
    navigation.navigate("Main", {
      screen: "Market",
    });
  };

  goToListing = () => {
    navigation.navigate("Main", {
      screen: "Listing",
    });
  };

  goToOrder = () => {
    navigation.navigate("Main", {
      screen: "Your Order",
    });
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={goToHome} style={styles.button}>
        <AntDesign name="home" size={windowHeight / 30} color="black" />
        <Text style={styles.text}>Home</Text>
      </Pressable>
      <Pressable onPress={goToMarket} style={styles.button}>
        <Entypo name="shopping-bag" size={windowHeight / 30} color="black" />
        <Text style={styles.text}>Market</Text>
      </Pressable>
      <Pressable onPress={goToListing} style={styles.button}>
        <Ionicons name="add" size={windowHeight / 30} color="black" />
        <Text style={styles.text}>Listing</Text>
      </Pressable>
      <Pressable onPress={goToOrder} style={styles.button}>
        <Ionicons
          name="receipt-outline"
          size={windowHeight / 30}
          color="black"
        />
        <Text style={styles.text}>Your Order</Text>
      </Pressable>
    </View>
  );
};

export default BottomTabs;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: Dimensions.get("window").height / 15,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 10,
  },
});
