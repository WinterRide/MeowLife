import { View, Text, Pressable, Image } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "../UserContext";
import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase";
import {
  getNicknameByEmail,
  handleAcceptOrderBySeller,
} from "../controller/OrderController";

export default function OrderViewCard({ item, index }) {
  const navigation = useNavigation();
  const [buyerName, setBuyerName] = useState(null);
  const { userInfo } = useUser();

  const findNickname = async () => {
    try {
      const nickname = await getNicknameByEmail(item.buyer);
      setBuyerName(nickname);
    } catch (error) {
      console.error("Error finding nickname:", error);
    }
  };

  findNickname();

  const handleAcceptOrder = async () => {
    if (userInfo?.onOrder == true) {
      alert("Please finish your on-going order first");
      navigation.goBack();
      return;
    }
    await handleAcceptOrderBySeller(item.id, item.buyer, item.seller);
    navigation.goBack();
  };

  return (
    <Pressable
      key={index}
      style={{
        flex: 1,
        width: "full",
        display: "flex",
        flexDirection: "row",
        gap: 16,
        backgroundColor: "white",
        elevation: 5,
        borderRadius: 10,
        padding: 12,
      }}
    >
      <View>
        <Text style={{ fontSize: 15 }}>Order Request from</Text>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>"{buyerName}"</Text>
      </View>
      <View style={{ flex: 1, alignItems: "flex-end" }}>
        <Pressable
          onPress={handleAcceptOrder}
          style={{ backgroundColor: "#25BC3D", padding: 10, borderRadius: 10 }}
        >
          <Text style={{ color: "white" }}>Accept</Text>
        </Pressable>
      </View>
    </Pressable>
  );
}
