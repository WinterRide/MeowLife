import { View, Text } from "react-native";
import React from "react";

export default function NecessitiesCard({ item }) {
  function formatPrice(price) {
    return price.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
    });
  }

  return (
    <Pressable
      onPress={() => {}}
      style={{
        backgroundColor: "white",
        borderRadius: 10,
        elevation: 5,
        shadowColor: "gray",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <Image
        style={{
          width: "80%",
          aspectRatio: 1,
          borderRadius: 10,
          margin: 16,
        }}
        source={{ uri: item.photos[0] }}
      />

      <View style={{ flex: 1, padding: 10 }}>
        <Text>{item.species}</Text>
        <Text style={{ fontSize: 10 }}>Necessities</Text>

        <Text style={{ fontSize: 12, marginTop: 10 }}>
          {item.originalPrice !== item.price ? (
            <Text style={{ textDecorationLine: "line-through", color: "gray" }}>
              {formatPrice(item.originalPrice)}
            </Text>
          ) : null}
          {formatPrice(item.price)}
        </Text>
        <Text
          style={{
            fontSize: 12,
            alignSelf: "flex-end",
            marginTop: 15,
          }}
        >
          {item.owner}
        </Text>
      </View>
    </Pressable>
  );
}
