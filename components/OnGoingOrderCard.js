import { View, Text, Pressable, Image } from "react-native";
import { Feather } from "@expo/vector-icons";

import React from "react";

export default function OnGoingOrderCard({
  item,
  index,
  handleReduce,
  handleAdd,
}) {
  return (
    <Pressable
      key={index}
      style={{
        flex: 1,
        width: "full",
        gap: 16,
        backgroundColor: "white",
        elevation: 5,
        borderRadius: 10,
        padding: 12,
      }}
    >
      <View
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Image
          style={{ flex: 1, aspectRatio: 1, borderRadius: 10 }}
          source={{ uri: item.photos[0] }}
        />
        <View style={{ flex: 1, gap: 2 }}>
          <View>
            <Text
              style={
                item.type === "cat" ? { fontSize: 20, fontWeight: 600 } : {}
              }
            >
              {item.type === "cat" ? item.species : item.name}
            </Text>
            <Text style={{ fontSize: 10 }}>
              {item.type === "cat" ? item.breed : "Necessities"}
            </Text>
          </View>
          <Text>{item.type === "cat" ? item.age + " years old" : ""}</Text>
        </View>
        <View
          style={{
            gap: 8,
          }}
        >
          <Pressable
            style={{
              backgroundColor: "#F15025",
              borderRadius: 12,
              paddingVertical: 4,
              paddingHorizontal: 20,
            }}
          >
            <Text
              style={{
                color: "white",
                fontWeight: 600,
                textAlign: "center",
              }}
            >
              Chat
            </Text>
          </Pressable>
          <Pressable
            style={{
              backgroundColor: "#F15025",
              borderRadius: 12,
              paddingVertical: 4,
              paddingHorizontal: 20,
            }}
          >
            <Text
              style={{
                color: "white",
                fontWeight: 600,
                textAlign: "center",
              }}
            >
              Accept
            </Text>
          </Pressable>
        </View>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        {item.type === "cat" ? (
          <View style={{ gap: 4 }}>
            <Text style={{ fontSize: 12 }}>
              {item.selfAccept
                ? "✅ You have accepted"
                : "❌ You have not accepted"}
            </Text>
            <Text style={{ fontSize: 12 }}>
              {item.sellerAccept
                ? "✅ Seller has accepted"
                : "❌ Seller has not accepted"}
            </Text>
          </View>
        ) : (
          <View
            style={{
              width: "fit",
              flexDirection: "row",
              gap: 12,
              alignItems: "center",
              paddingHorizontal: 8,
              borderWidth: 1,
              borderColor: "#F15025",
              borderRadius: 12,
            }}
          >
            <Pressable
              onPress={() => {
                handleReduce(index);
              }}
            >
              <Feather name="minus" color="#F15025" size={20} />
            </Pressable>
            <Text style={{ color: "#F15025", fontWeight: 600 }}>
              {item.quantity}
            </Text>
            <Pressable
              onPress={() => {
                handleAdd(index);
              }}
            >
              <Feather name="plus" color="#F15025" size={20} />
            </Pressable>
          </View>
        )}
        <View style={{ gap: 4 }}>
          <Text style={{ alignSelf: "flex-end" }}>
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(item.price)}
          </Text>

          <Text style={{ alignSelf: "flex-end", fontSize: 10 }}>
            View Details &gt;&gt;
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
