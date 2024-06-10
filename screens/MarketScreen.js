import React, { useState, useEffect, useMemo } from "react";
import { ScrollView, StyleSheet, Text, View, Dimensions, Pressable } from "react-native";
import { useIsFocused, useRoute } from "@react-navigation/native";
import Header from "../components/Header";
import PropertyCard from "../components/PropertyCard";
import { BottomModal, ModalContent, ModalFooter, ModalTitle, SlideAnimation } from "react-native-modals";
import { Entypo } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { firestore } from "../firebase";
import { getDocs, collection } from "firebase/firestore";
import { getData } from "../controller/DistinctController";

const window = Dimensions.get("window");
const windowWidth = window.width;
const windowHeight = window.height;

const MarketScreen = () => {
  const route = useRoute();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const isFocused = useIsFocused()
  useEffect(() => {
    if (isFocused) {
      fetchData();
    }
  }, [isFocused]);

  const fetchData = async () => {
    setLoading(true);
    setData(await getData("market"))
    setLoading(false);
  };

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

  const takeFilteredData = () => {
    if (!route.params || !route.params.input) {
      return data;
    }
    const input = route.params.input.toLowerCase();
    return data.filter(item => item.species.toLowerCase().includes(input));
  };

  const filteredData = useMemo(() => takeFilteredData(), [route.params, data]);

  const [sortedData, setSortedData] = useState(filteredData);

  useEffect(() => {
    setSortedData(filteredData);
  }, [filteredData]);

  const applyFilter = (filter) => {
    setModalVisible(false);
    let sortedArray = [...filteredData];
    switch (filter) {
      case "Price : High to Low":
        sortedArray.sort((a, b) => b.price - a.price);
        setSortedData(sortedArray);
        break;
      case "Price : Low to High":
        sortedArray.sort((a, b) => a.price - b.price);
        setSortedData(sortedArray);
        break;
      default:
        setSortedData(filteredData);
        break;
    }
  };

  const clearFilters = () => {
    setSelectedFilter("");
    setSortedData(filteredData);
    setModalVisible(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <Header />
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 16, padding: 12 }}>
        <Pressable onPress={() => setModalVisible(!modalVisible)} style={{ flexDirection: "row", alignItems: "center", backgroundColor: "#F15025", padding: 5, paddingLeft: 15, paddingRight: 15, borderRadius: 10 }}>
          <Octicons name="arrow-switch" size={22} color="white" />
          <Text style={{ fontSize: 15, fontWeight: "500", marginLeft: 8, color: "white" }}>Filter</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
      <View>
        {loading ? (
            <> 
            <View style={styles.loadingTxt}>
              <Text>Loading...</Text>
            </View>
            </>
          ) : sortedData.length === 0 ? (
            <> 
            <View style={styles.loadingTxt}>
              <Text>There's no item in the market</Text>
            </View>
            </>
          ) : (
            <View style={styles.grid}>
              {sortedData.map((item, index) => (
                <View key={index} style={styles.gridItem}>
                  <PropertyCard item={item} />
                </View>
              ))}
            </View>
          )}
      </View>
      </ScrollView>

      <BottomModal
        onBackdropPress={() => setModalVisible(!modalVisible)}
        swipeDirection={["up", "down"]}
        swipeThreshold={200}
        footer={
          <ModalFooter>
            <Pressable onPress={() => applyFilter(selectedFilter)} style={{ marginLeft: "auto", marginRight: "auto", backgroundColor: "#F15025", width: windowWidth, height: windowHeight / 20, alignItems: "center", justifyContent: "center" }}>
              <Text style={{ fontSize: 16, color: "white", fontWeight: "bold" }}>Apply</Text>
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
            <View style={{ marginVertical: 10, flex: 2, height: 280, borderRightWidth: 1, borderColor: "#E0E0E0" }}>
              <Text style={{ textAlign: "center" }}>Sort</Text>
            </View>
            <View style={{ flex: 3, margin: 10 }}>
              {filters.map((item, index) => (
                <Pressable onPress={() => setSelectedFilter(item.filter)} style={{ flexDirection: "row", alignItems: "center", marginVertical: 10 }} key={index}>
                  {selectedFilter === item.filter ? (
                    <FontAwesome name="circle" size={18} color="green" />
                  ) : (
                    <Entypo name="circle" size={18} color="black" />
                  )}
                  <Text style={{ fontSize: 16, fontWeight: "500", marginLeft: 6 }}>{item.filter}</Text>
                </Pressable>
              ))}
              <Pressable onPress={clearFilters} style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", marginVertical: 10, backgroundColor: "#F15025", borderRadius: 10 }}>
                <Ionicons name="close-outline" size={16} color="white" />
                <Text style={{ fontSize: 16, fontWeight: "500", color: "white" }}>Clear filters</Text>
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
    width: "100%",
    paddingHorizontal: 16,
  },
  loadingTxt : {
    width: "100%", 
    height: windowHeight / 4, 
    justifyContent: "center", 
    alignItems: "center"
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10
  },
  gridItem: {
    width: '48%',
    marginBottom: 16
  }
});
