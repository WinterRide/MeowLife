import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const PropertyCard = ({ item }) => {
  const navigation = useNavigation();
  const window = Dimensions.get("window");
  const windowWidth = window.width;
  const windowHeight = window.height;

  const formattedPrice = item.price.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
  });

  const infoScreen = () => {
    navigation.navigate("ItemInfo", {
      id: item.id,
      photos: item.photos,
      species: item.species,
      age: item.age,
      breed: item.breed,
      owner: item.owner,
      ownerEmail: item.ownerEmail,
      price: item.price,
      level: item.level,
      vaccine: item.vaccine,
      description: item.description,
      status: item.status,
      onFeatured: item.onFeatured,
      onOrder: item.onOrder,
    });
  };

  return (
    <Pressable
      onPress={infoScreen}
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
        <Text style={{ fontSize: 12 }}>{item.age} Years old</Text>
        <Text style={{ fontWeight: "bold", fontSize: 18 }}>{item.species}</Text>
        <Text style={{ fontSize: 10 }}>{item.breed}</Text>
        <Text style={{ fontSize: 12, marginTop: 10 }}>{formattedPrice}</Text>
        <Text style={{ fontSize: 12, alignSelf: "flex-end", marginTop: 15 }}>
          {item.owner}
        </Text>
      </View>
    </Pressable>
  );
};

export default PropertyCard;

const styles = StyleSheet.create({});
