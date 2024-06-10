import { View, Text, Pressable, Image } from "react-native";
import { Entypo } from "@expo/vector-icons";

import React, { useEffect, useState } from "react";
import { getProductById } from "../controller/ProductController";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useUser } from "../UserContext";
import { handleCancelOrder } from "../controller/OrderController";

export default function OrderHistoryCard({ order }) {
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
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 12, marginTop: 20 }}>
                {formattedPrice}
              </Text>
            </View>
          </View>
          <View style={{ flex: 1, alignItems: "flex-end", padding: 10 }}>
            <Text style={{ color: "red" }}>{order.status}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}
