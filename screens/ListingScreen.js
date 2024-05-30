import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  View,
} from "react-native";
import React from "react";
import Header from "../components/Header";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import ListingHistoryCard from "../components/ListingHistoryCard";

const ListingScreen = () => {
  const navigation = useNavigation();

  const window = Dimensions.get("window");
  const windowWidth = window.width;
  const windowHeight = window.height;

  const data = [
    {
      species: "Balinese",
      breed: "Other breeds",
      age: 4,
      owner: "Jose",
      price: 12000000,
      photos: [
        "https://images.pexels.com/photos/7630190/pexels-photo-7630190.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/7630190/pexels-photo-7630190.jpeg?auto=compress&cs=tinysrgb&w=800",
      ],
      level: [
        {
          affection: 5,
        },
        {
          playfulness: 3,
        },
        {
          kidfriendly: 4,
        },
        {
          energy: 2,
        },
      ],
      vaccine: [
        {
          name: "Rabies",
          photos:
            "https://images.pexels.com/photos/7630190/pexels-photo-7630190.jpeg?auto=compress&cs=tinysrgb&w=800",
        },
        {
          name: "Feline viral rhinotracheitis (FVRCP)",
          photos:
            "https://images.pexels.com/photos/7630190/pexels-photo-7630190.jpeg?auto=compress&cs=tinysrgb&w=800",
        },
        {
          name: "Feline leukemia virus (FeLV)",
          photos:
            "https://images.pexels.com/photos/7630190/pexels-photo-7630190.jpeg?auto=compress&cs=tinysrgb&w=800",
        },
      ],
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
    {
      species: "Birman",
      breed: "Eastern breeds",
      age: 5,
      owner: "Kitsune",
      price: 13000000,
      photos: [
        "https://images.pexels.com/photos/7630190/pexels-photo-7630190.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/7630190/pexels-photo-7630190.jpeg?auto=compress&cs=tinysrgb&w=800",
      ],
      level: [
        {
          affection: 5,
        },
        {
          playfulness: 3,
        },
        {
          kidfriendly: 4,
        },
        {
          energy: 2,
        },
      ],
      vaccine: [
        {
          name: "Rabies",
          photos:
            "https://images.pexels.com/photos/7630190/pexels-photo-7630190.jpeg?auto=compress&cs=tinysrgb&w=800",
        },
        {
          name: "Feline viral rhinotracheitis (FVRCP)",
          photos:
            "https://images.pexels.com/photos/7630190/pexels-photo-7630190.jpeg?auto=compress&cs=tinysrgb&w=800",
        },
        {
          name: "Feline leukemia virus (FeLV)",
          photos:
            "https://images.pexels.com/photos/7630190/pexels-photo-7630190.jpeg?auto=compress&cs=tinysrgb&w=800",
        },
      ],
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
    {
      species: "American Shorthair",
      breed: "American breeds",
      age: 5,
      owner: "WinterRide",
      price: 18000000,
      photos: [
        "https://images.pexels.com/photos/7630190/pexels-photo-7630190.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/7630190/pexels-photo-7630190.jpeg?auto=compress&cs=tinysrgb&w=800",
      ],
      level: [
        {
          affection: 5,
        },
        {
          playfulness: 3,
        },
        {
          kidfriendly: 4,
        },
        {
          energy: 2,
        },
      ],
      vaccine: [
        {
          name: "Rabies",
          photos:
            "https://images.pexels.com/photos/7630190/pexels-photo-7630190.jpeg?auto=compress&cs=tinysrgb&w=800",
        },
        {
          name: "Feline viral rhinotracheitis (FVRCP)",
          photos:
            "https://images.pexels.com/photos/7630190/pexels-photo-7630190.jpeg?auto=compress&cs=tinysrgb&w=800",
        },
        {
          name: "Feline leukemia virus (FeLV)",
          photos:
            "https://images.pexels.com/photos/7630190/pexels-photo-7630190.jpeg?auto=compress&cs=tinysrgb&w=800",
        },
      ],
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
    {
      species: "American Bobtail",
      breed: "American breeds",
      age: 3,
      owner: "Imjoo",
      price: 20000000,
      photos: [
        "https://images.pexels.com/photos/7630190/pexels-photo-7630190.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/7630190/pexels-photo-7630190.jpeg?auto=compress&cs=tinysrgb&w=800",
      ],
      level: [
        {
          affection: 5,
        },
        {
          playfulness: 3,
        },
        {
          kidfriendly: 4,
        },
        {
          energy: 2,
        },
      ],
      vaccine: [
        {
          name: "Rabies",
          photos:
            "https://images.pexels.com/photos/7630190/pexels-photo-7630190.jpeg?auto=compress&cs=tinysrgb&w=800",
        },
        {
          name: "Feline viral rhinotracheitis (FVRCP)",
          photos:
            "https://images.pexels.com/photos/7630190/pexels-photo-7630190.jpeg?auto=compress&cs=tinysrgb&w=800",
        },
        {
          name: "Feline leukemia virus (FeLV)",
          photos:
            "https://images.pexels.com/photos/7630190/pexels-photo-7630190.jpeg?auto=compress&cs=tinysrgb&w=800",
        },
      ],
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
    {
      species: "American Bobtail",
      breed: "American breeds",
      age: 2,
      owner: "Wonhee",
      price: 5000000,
      photos: [
        "https://images.pexels.com/photos/7630190/pexels-photo-7630190.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/7630190/pexels-photo-7630190.jpeg?auto=compress&cs=tinysrgb&w=800",
      ],
      level: [
        {
          affection: 5,
        },
        {
          playfulness: 3,
        },
        {
          kidfriendly: 4,
        },
        {
          energy: 2,
        },
      ],
      vaccine: [
        {
          name: "Rabies",
          photos:
            "https://images.pexels.com/photos/7630190/pexels-photo-7630190.jpeg?auto=compress&cs=tinysrgb&w=800",
        },
        {
          name: "Feline viral rhinotracheitis (FVRCP)",
          photos:
            "https://images.pexels.com/photos/7630190/pexels-photo-7630190.jpeg?auto=compress&cs=tinysrgb&w=800",
        },
        {
          name: "Feline leukemia virus (FeLV)",
          photos:
            "https://images.pexels.com/photos/7630190/pexels-photo-7630190.jpeg?auto=compress&cs=tinysrgb&w=800",
        },
      ],
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
  ];

  return (
    <View
      style={{ width: windowWidth, height: windowHeight, alignItems: "center" }}
    >
      <Header />
      <ScrollView
        style={{
          width: windowWidth * 0.9,
          height: windowHeight,
          margin: "auto",
          paddingVertical: 16,
        }}
      >
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 24, fontWeight: 500 }}>Your Listing</Text>
          <View
            style={{
              height: windowHeight / 3,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 18 }}>No Listing Yet</Text>
          </View>
        </View>

        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 24, fontWeight: 500 }}>Listing History</Text>
          <View
            style={{
              flex: 1,
              gap: 16,
              paddingTop: 16,
              paddingBottom: 128,
            }}
          >
            {data.map((item, index) => {
              return <ListingHistoryCard index={index} item={item} />;
            })}
          </View>
        </View>
      </ScrollView>
      <Pressable
        onPress={() => {
          navigation.navigate("Cat Listing");
        }}
        style={{
          position: "absolute",
          width: windowWidth / 2,
          bottom: 0,
          marginBottom: 40,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#F15025",
          flexDirection: "row",
          borderRadius: 20,
          padding: 5,
          paddingLeft: 20,
          paddingRight: 20,
        }}
      >
        <Ionicons name="add" size={25} color="white" />
        <Text style={{ fontSize: 15, color: "white", fontWeight: "bold" }}>
          List Your Cat
        </Text>
      </Pressable>
    </View>
  );
};

export default ListingScreen;

const styles = StyleSheet.create({});
