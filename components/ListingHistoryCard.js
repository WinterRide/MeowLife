import { View, Text, Pressable, Image } from "react-native";
import React from "react";

export default function ListingHistoryCard({ item, index }) {
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
      <Image
        style={{ aspectRatio: 1, borderRadius: 10 }}
        source={{ uri: item.photos[1] }}
      />
      <View style={{ flex: 1, gap: 2 }}>
        <View>
          <Text style={{ fontSize: 20, fontWeight: 600 }}>{item.species}</Text>
          <Text style={{ fontSize: 10 }}>{item.breed}</Text>
        </View>
        <View style={{ height: 12 }} />
        <Text>{item.age} years old</Text>
        <Text style={{ alignSelf: "flex-end" }}>View Details &gt;&gt;</Text>
      </View>
    </Pressable>
  );
}
