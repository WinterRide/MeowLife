import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Pressable,
  Image,
} from "react-native";
import React, { useState } from "react";
import Header from "../components/Header";
import OnGoingOrderCard from "../components/OnGoingOrderCard";

const OrderScreen = () => {
  const window = Dimensions.get("window");

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
    {
      type: "necessities",
      name: "Whiskas Makanan Kucing Basah Pouch Senior Rasa Tuna 80g",
      price: 6400,
      quantity: 2,
      ordered: true,
      photos: ["https://images.unsplash.com/photo-1555685856-8049f0b4e5c6"],
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
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 24, fontWeight: 500 }}>
              On-Going order
            </Text>
            <Pressable>
              <Text style={{ fontWeight: 500, color: "#F15025" }}>
                Order History
              </Text>
            </Pressable>
          </View>
          <View style={{ gap: 16, marginVertical: 24 }}>
            {data.map((item, index) => {
              return <OnGoingOrderCard item={item} index={index} handleReduce={handleReduce} handleAdd={handleAdd} />;
            })}
          </View>
        </View>
        <View>
          <Text style={{ fontSize: 24, fontWeight: 500 }}>Order History</Text>
          <View
            style={{
              height: window.height / 3,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text>You have not made any transactions yet</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({});
