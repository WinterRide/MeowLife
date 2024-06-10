import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { getData } from "../controller/DistinctController";
import ListingHistoryCard from "../components/ListingHistoryCard";
import { useRoute } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

const window = Dimensions.get("window");
const windowWidth = window.width;
const windowHeight = window.height;

const FeaturedProductScreen = () => {
  const route = useRoute();
  const [marketData, setMarketData] = useState([]);
  const [featuredData, setFeaturedData] = useState([]);
  const [nonFeaturedData, setNonFeaturedData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchMarketData();
    setLoading(false);
  }, []);

  const fetchMarketData = async () => {
    setLoading(true);
    try {
      const data = await getData("market");
      setMarketData(data);

      const featuredItems = data.filter((item) => item.onFeatured === true);
      const nonFeaturedItems = data.filter((item) => item.onFeatured === false);

      setFeaturedData(featuredItems);
      setNonFeaturedData(nonFeaturedItems);
    } catch (error) {
      console.error("Error fetching market data: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      style={{ width: windowWidth, height: windowHeight, alignItems: "center" }}
    >
      <ScrollView
        style={{
          width: windowWidth * 0.9,
          height: windowHeight,
          margin: "auto",
          paddingVertical: 20,
        }}
      >
        <Pressable
          onPress={fetchMarketData}
          style={{
            position: "absolute",
            right: 0,
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            zIndex: 999,
          }}
        >
          <AntDesign name="reload1" size={15} color="black" />
          <Text style={{ fontSize: 15 }}>Refresh</Text>
        </Pressable>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 24, fontWeight: "500" }}>On Featured</Text>
          <View style={styles.subContainer}>
            {loading ? (
              <View style={styles.loadingTxt}>
                <Text>Loading...</Text>
              </View>
            ) : featuredData.length === 0 ? (
              <View style={styles.loadingTxt}>
                <Text>No featured listings available</Text>
              </View>
            ) : (
              featuredData.map((item, index) => (
                <ListingHistoryCard key={index} index={index} item={item} />
              ))
            )}
          </View>
        </View>

        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 24, fontWeight: "500" }}>Non Featured</Text>
          <View style={styles.subContainer}>
            {loading ? (
              <View style={styles.loadingTxt}>
                <Text>Loading...</Text>
              </View>
            ) : nonFeaturedData.length === 0 ? (
              <View style={styles.loadingTxt}>
                <Text>No data available</Text>
              </View>
            ) : (
              nonFeaturedData.map((item, index) => (
                <ListingHistoryCard key={index} index={index} item={item} />
              ))
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default FeaturedProductScreen;

const styles = StyleSheet.create({
  subContainer: {
    flex: 1,
    gap: 16,
    paddingTop: 20,
    paddingBottom: 20,
  },
  loadingTxt: {
    width: "100%",
    height: windowHeight / 4,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flexGrow: 1,
    padding: 16,
    alignItems: "center",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 10,
  },
  gridItem: {
    width: "48%",
    marginBottom: 16,
  },
});
