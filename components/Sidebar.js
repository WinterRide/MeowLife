import {
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";
import React, { useRef } from "react";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { auth } from "../firebase";
import { useNavigation } from "@react-navigation/native";
import { Animated } from "react-native-maps";

const Sidebar = ({ modalVisible, setModalVisible }) => {
  if (!modalVisible) {
    return null;
  }

  const navigation = useNavigation();

  const window = Dimensions.get("window");
  const windowWidth = window.width;
  const windowHeight = window.height;

  return (
    <View
      style={{
        position: "absolute",
        zIndex: 9999,
        width: windowWidth,
        height: windowHeight,
        backgroundColor: "transparent",
      }}
    >
      <View
        style={{
          position: "absolute",
          height: windowHeight,
          width: windowWidth / 1.5,
          backgroundColor: "white",
          right: 0,
        }}
      >
        <View
          style={{
            height: windowHeight / 6,
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Pressable
            onPress={() => setModalVisible(false)}
            style={{ paddingRight: 22 }}
          >
            <Ionicons name="close-outline" size={40} color="black" />
          </Pressable>
        </View>
        <View
          style={{
            width: windowWidth / 1.5,
            height: windowHeight / 5,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Pressable
            style={{
              width: 150,
              height: 150,
              alignItems: "center",
              justifyContent: "center",
              borderColor: "#F15025",
              borderWidth: 3,
              borderRadius: 100,
              padding: 15,
            }}
          >
            <Image
              style={{ height: 100, width: 100 }}
              source={require("../assets/image/MeowLife Logo.png")}
            />
          </Pressable>
          <Text style={{ fontSize: 30 }}>Yakiniku</Text>
          <Pressable onPress={() => navigation.navigate("EditProfile")}>
            <Text style={{ fontSize: 15, textDecorationLine: "underline" }}>
              Edit Profile
            </Text>
          </Pressable>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "top",
            alignItems: "center",
            marginTop: 75,
          }}
        >
          <Pressable
            onPress={() => {
              navigation.navigate("Home"), setModalVisible(false);
            }}
            style={{
              width: windowWidth / 2,
              height: windowHeight / 13,
              justifyContent: "center",
              alignItems: "center",
              borderTopColor: "#A9A9A9",
              borderTopWidth: 3,
              borderBottomColor: "#A9A9A9",
              borderBottomWidth: 3,
            }}
          >
            <Text style={{ fontSize: 15 }}>Home</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              navigation.navigate("Market"), setModalVisible(false);
            }}
            style={{
              width: windowWidth / 2,
              height: windowHeight / 13,
              justifyContent: "center",
              alignItems: "center",
              borderBottomColor: "#A9A9A9",
              borderBottomWidth: 3,
            }}
          >
            <Text style={{ fontSize: 15 }}>Market</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              navigation.navigate("Listing"), setModalVisible(false);
            }}
            style={{
              width: windowWidth / 2,
              height: windowHeight / 13,
              justifyContent: "center",
              alignItems: "center",
              borderBottomColor: "#A9A9A9",
              borderBottomWidth: 3,
            }}
          >
            <Text style={{ fontSize: 15 }}>Listing</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              navigation.navigate("Order"), setModalVisible(false);
            }}
            style={{
              width: windowWidth / 2,
              height: windowHeight / 13,
              justifyContent: "center",
              alignItems: "center",
              borderBottomColor: "#A9A9A9",
              borderBottomWidth: 3,
            }}
          >
            <Text style={{ fontSize: 15 }}>Your Order</Text>
          </Pressable>
          <Pressable
            style={{
              width: windowWidth / 2,
              height: windowHeight / 13,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <MaterialIcons name="logout" size={15} color="#F15025" />
            <Text
              onPress={() => auth.signOut()}
              style={{ fontSize: 15, marginLeft: 10, color: "#F15025" }}
            >
              Logout
            </Text>
          </Pressable>
        </View>
      </View>
      <Pressable
        onPress={() => {
          setModalVisible(false);
        }}
        style={{
          position: "absolute",
          height: windowHeight,
          width: windowWidth / 3,
          backgroundColor: "black",
          left: 0,
          opacity: 0.5,
        }}
      />
    </View>
  );
};

export default Sidebar;

const styles = StyleSheet.create({});
