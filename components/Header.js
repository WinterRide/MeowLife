import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import Sidebar from "./Sidebar";

const Header = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const window = Dimensions.get("window");
  const windowWidth = window.width;
  const windowHeight = window.height;

  const [modalVisible, setModalVisible] = useState(false);

  const toggleSidebar = () => {
    setModalVisible(!modalVisible);
  };

  const searchInput = route.params?.input || "Search";

  return (
    <View>
      <View
        style={{
          width: windowWidth,
          height: windowHeight / 8,
          backgroundColor: "white",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 16,
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 10,
            marginRight: 20,
            marginTop: 20,
          }}
        >
          <Pressable
            onPress={() => {
              navigation.navigate("Search");
            }}
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: windowWidth / 1.6,
              height: 50,
              marginLeft: 20,
              borderRadius: 10,
              borderColor: "black",
              borderWidth: 2,
              gap: 10,
            }}
          >
            <Feather
              name="search"
              size={24}
              color="black"
              style={{ marginLeft: 10 }}
            />
            <Text>{searchInput}</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              navigation.navigate("Notification");
            }}
            style={{ backgroundColor: "#CED0CE", borderRadius: 10, padding: 6 }}
          >
            <Ionicons name="notifications-outline" size={32} color="black" />
          </Pressable>
          <Pressable
            onPress={toggleSidebar}
            style={{ backgroundColor: "#CED0CE", borderRadius: 10, padding: 6 }}
          >
            <Entypo name="menu" size={32} color="black" />
          </Pressable>
        </View>
      </View>
      <Sidebar modalVisible={modalVisible} setModalVisible={setModalVisible} />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({});
