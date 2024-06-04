import React, { useEffect, useLayoutEffect, useState } from "react";
import { View, Pressable, Text, StyleSheet, Dimensions } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import NecessitiesCard from "../components/NecessitiesCard";
import PropertyCard from "../components/PropertyCard";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { BottomTabs } from "../StackNavigator";

const HomeScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const window = Dimensions.get("window");
  const windowWidth = window.width;
  const windowHeight = window.height;

  const [data, setData] = useState([
    {
      type: "cat",
      species: "Birman",
      breed: "Eastern breeds",
      age: 5,
      price: 13000000,
      selfAccept: false,
      sellerAccept: false,
      photos: [
        "https://images.unsplash.com/photo-1555685856-8049f0b4e5c6",
        "https://images.unsplash.com/photo-1555685856-8049f0b4e5c6",
      ],
    },
  ]);

  function handleReduce(index) {
    const newData = [...data];
    newData[index].quantity -= 1;
    setData(newData);
  }

  function handleAdd(index) {
    const newData = [...data];
    newData[index].quantity += 1;
    setData(newData);
  }

  const necessities = [
    {
      type: "necessities",
      name: "Whiskas Makanan Kucing Basah Pouch Senior Rasa Tuna 80g",
      originalPrice: 8000,
      price: 6400,
      quantity: 2,
      ordered: true,
      owner: "Whiskas",
      photos: ["https://images.unsplash.com/photo-1555685856-8049f0b4e5c6"],
    },
    {
      type: "necessities",
      name: "Whiskas Makanan Kucing Basah Pouch Senior Rasa Mackerel 80g",
      originalPrice: 8800,
      price: 6800,
      quantity: 2,
      ordered: true,
      owner: "Whiskas",
      photos: ["https://images.unsplash.com/photo-1555685856-8049f0b4e5c6"],
    },
  ];

  return (
    <View>
      <Header />
      <ScrollView
        style={{
          width: "90%",
          margin: "auto",
          paddingVertical: 16,
        }}
      >
        <View>
          <Text style={{ fontSize: 24, fontWeight: 500 }}>
            On-Going Cat Order
          </Text>
          <View style={{ gap: 16, marginVertical: 24 }}>
            {data.map((item, index) => {
              return (
                <OnGoingOrderCard
                  item={item}
                  index={index}
                  handleReduce={handleReduce}
                  handleAdd={handleAdd}
                />
              );
            })}
          </View>
        </View>
        <View>
          <Text style={{ fontSize: 24, fontWeight: 500 }}>
            Featured Products
          </Text>
          <View
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {necessities.map((item) => {
              return <NecessitiesCard item={item} key={item.name} />;
            })}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
