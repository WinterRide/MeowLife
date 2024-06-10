import { View, Text, Pressable, Image } from "react-native";
import { Entypo } from "@expo/vector-icons";

import React, { useEffect, useState } from "react";
import { getProductById } from "../controller/ProductController";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useUser } from "../UserContext";
import { handleCancelOrder } from "../controller/OrderController";

export default function OnGoingOrderCard({ order }) {
  const navigation = useNavigation();
  const [products, setProducts] = useState(null);
  const isFocused = useIsFocused();
  const { userInfo } = useUser();

  useEffect(() => {
    if (order.itemId != null && isFocused) {
      fetchProduct(order.itemId);
    }
  }, [order.itemId, isFocused]);

  const fetchProduct = async (id) => {
    try {
      const product = await getProductById(id);
      setProducts(product);
    } catch (error) {
      console.error("Error fetching product: ", error);
    }
  };

  if (!products) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const formattedPrice = products.price.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
  });

  const handleCancelAction = async () => {
    if (userInfo?.onOrder == false) {
      alert("Order already canceled");
      navigation.navigate("Main");
      return;
    }
    await handleCancelOrder(order.id, order.buyer, order.seller);
    navigation.navigate("Main");
  };

  return (
    <Pressable
      style={{
        backgroundColor: "white",
        borderRadius: 10,
        elevation: 5,
        shadowColor: "gray",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <View>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <Image
            style={{
              width: "30%",
              aspectRatio: 1,
              borderRadius: 10,
              margin: 16,
            }}
            source={{ uri: products.photos[0] }}
          />
          <View style={{ flex: 1, padding: 10 }}>
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>
              {products.species}
            </Text>
            <Text style={{ fontSize: 10 }}>{products.breed}</Text>
            <Text style={{ fontSize: 12, marginTop: 20 }}>
              {products.age} Years old
            </Text>
          </View>
          <View style={{ flex: 1, padding: 10, gap: 10 }}>
            <Pressable
              style={{
                backgroundColor: "#F15025",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10,
                padding: 5,
              }}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>Chat</Text>
            </Pressable>
            <Pressable
              style={{
                backgroundColor: "green",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10,
                padding: 5,
              }}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>Accept</Text>
            </Pressable>
            <Pressable
              onPress={handleCancelAction}
              style={{
                backgroundColor: "red",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10,
                padding: 5,
              }}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>Cancel</Text>
            </Pressable>
          </View>
        </View>
        <View
          style={{ flex: 1, justifyContent: "center", flexDirection: "row" }}
        >
          <View style={{ flex: 1 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 16,
              }}
            >
              <Entypo name="circle-with-cross" size={24} color="red" />
              <Text style={{ fontSize: 12 }}>
                You have not accepted the order
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 16,
              }}
            >
              <Entypo name="circle-with-cross" size={24} color="red" />
              <Text style={{ fontSize: 12 }}>
                Seller has not accepted the order
              </Text>
            </View>
          </View>
          <View style={{ flex: 1, alignItems: "flex-end" }}>
            <Text style={{ fontSize: 15, marginRight: 16 }}>
              {formattedPrice}
            </Text>
            <Text
              style={{
                fontWeight: "bold",
                marginTop: 12,
                fontSize: 12,
                paddingBottom: 10,
                marginRight: 16,
              }}
            >
              View Details
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}
