import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import Header from "../components/Header";
import PropertyCard from "../components/PropertyCard";
import {
  BottomModal,
  ModalContent,
  ModalFooter,
  ModalTitle,
  SlideAnimation,
} from "react-native-modals";
import { Entypo } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

const MarketScreen = () => {
  const route = useRoute();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("");

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

  const filters = [
    {
      id: "1",
      filter: "Price : Low to High",
    },
    {
      id: "2",
      filter: "Price : High to Low",
    },
  ];

  const takeItem = () => {
    if (!route.params || !route.params.input) {
      return data;
    }
    return data.filter((item) =>
      item.species.toLowerCase().includes(route.params.input.toLowerCase())
    );
  };

  const searchSpecies = takeItem();
  const [sortedData, setSortedData] = useState(data);

  useEffect(() => {
    setSortedData(searchSpecies);
  }, [route.params]);

  const itemWidth = (window.width - 60) / 2; // Adjust the value 40 based on your padding/margin

  const compare = (a, b) => {
    if (a.price > b.price) {
      return -1;
    }
    if (a.price < b.price) {
      return 1;
    }
    return 0;
  };

  const comparison = (a, b) => {
    if (a.price < b.price) {
      return -1;
    }
    if (a.price > b.price) {
      return 1;
    }
    return 0;
  };

  const applyFilter = (filter) => {
    setModalVisible(false);
    let sortedArray = [...searchSpecies];
    switch (filter) {
      case "Price : High to Low":
        sortedArray.sort(compare);
        setSortedData(sortedArray);
        break;
      case "Price : Low to High":
        sortedArray.sort(comparison);
        setSortedData(sortedArray);
        break;
      default:
        setSortedData(searchSpecies);
        break;
    }
  };

  const clearFilters = () => {
    setSelectedFilter("");
    setSortedData(searchSpecies);
    setModalVisible(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <Header />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 20,
          padding: 12,
        }}
      >
        <Pressable
          onPress={() => setModalVisible(!modalVisible)}
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#F15025",
            padding: 5,
            paddingLeft: 15,
            paddingRight: 15,
            borderRadius: 10,
          }}
        >
          <Octicons name="arrow-switch" size={22} color="white" />
          <Text
            style={{
              fontSize: 15,
              fontWeight: "500",
              marginLeft: 8,
              color: "white",
            }}
          >
            Filter
          </Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {sortedData.length === 0 ? (
          <Text>No item was found</Text>
        ) : (
          <View style={[styles.grid, { paddingBottom: 256 }]}>
            {sortedData.map((item, index) => (
              <View
                key={index}
                style={{ margin: "auto", height: "full", flexBasis: "48%" }}
              >
                <PropertyCard item={item} />
              </View>
            ))}
          </View>
        )}
      </ScrollView>
      <BottomModal
        onBackdropPress={() => setModalVisible(!modalVisible)}
        swipeDirection={["up", "down"]}
        swipeThreshold={200}
        footer={
          <ModalFooter>
            <Pressable
              onPress={() => applyFilter(selectedFilter)}
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                backgroundColor: "#F15025",
                width: windowWidth,
                height: windowHeight / 20,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{ fontSize: 16, color: "white", fontWeight: "bold" }}
              >
                Apply
              </Text>
            </Pressable>
          </ModalFooter>
        }
        modalTitle={<ModalTitle title="Filter" />}
        modalAnimation={new SlideAnimation({ slideFrom: "bottom" })}
        onHardwareBackPress={() => setModalVisible(!modalVisible)}
        visible={modalVisible}
        onTouchOutside={() => setModalVisible(!modalVisible)}
      >
        <ModalContent style={{ width: "100%", height: 200 }}>
          <View style={{ flexDirection: "row" }}>
            <View
              style={{
                marginVertical: 10,
                flex: 2,
                height: 280,
                borderRightWidth: 1,
                borderColor: "#E0E0E0",
              }}
            >
              <Text style={{ textAlign: "center" }}>Sort</Text>
            </View>
            <View style={{ flex: 3, margin: 10 }}>
              {filters.map((item, index) => (
                <Pressable
                  onPress={() => setSelectedFilter(item.filter)}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginVertical: 10,
                  }}
                  key={index}
                >
                  {selectedFilter === item.filter ? (
                    <FontAwesome name="circle" size={18} color="green" />
                  ) : (
                    <Entypo name="circle" size={18} color="black" />
                  )}

                  <Text
                    style={{ fontSize: 16, fontWeight: "500", marginLeft: 6 }}
                  >
                    {item.filter}
                  </Text>
                </Pressable>
              ))}
              <Pressable
                onPress={clearFilters}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  marginVertical: 10,
                  backgroundColor: "#F15025",
                  borderRadius: 10,
                }}
              >
                <Ionicons name="close-outline" size={16} color="white" />
                <Text
                  style={{ fontSize: 16, fontWeight: "500", color: "white" }}
                >
                  Clear filters
                </Text>
              </Pressable>
            </View>
          </View>
        </ModalContent>
      </BottomModal>
    </View>
  );
};

export default MarketScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  grid: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "auto",
    gap: 10,
    padding: 10,
  },
});
