import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { firestore } from "../firebase";
import { getDocs, collection } from "firebase/firestore";
import ListingHistoryCard from "../components/ListingHistoryCard";
import { useUser } from "../UserContext";
import { getData } from "../controller/DistinctController";
import {
  getOrderByEmail,
  getOrderHistoryByEmail,
} from "../controller/OrderController";
import OnGoingOrderCard from "../components/OnGoingOrderCard";
import OrderHistoryCard from "../components/OrderHistoryCard";

const window = Dimensions.get("window");
const windowWidth = window.width;
const windowHeight = window.height;

const OrderScreen = () => {
  const { userInfo } = useUser();
  const navigation = useNavigation();
  const route = useRoute();
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(false);
  const [featuredList, setFeaturedList] = useState([]);
  const [order, setOrder] = useState(null);
  const [history, setHistory] = useState([]);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      setLoading(true);
      fetchAllOrder();
      if (userInfo?.onOrder == true) {
        fetchOrder();
      }
      setLoading(false);
    }
  }, [isFocused]);

  const fetchOrder = async () => {
    setLoading(true);
    const orderItem = await getOrderByEmail(userInfo.email);
    setOrder(orderItem[0]);
    setLoading(false);
  };

  const fetchAllOrder = async () => {
    setLoading(true);
    const orders = await getOrderHistoryByEmail(userInfo.email);
    setHistory(orders);
    setLoading(false);
  };

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
          paddingVertical: 20,
        }}
      >
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 24, fontWeight: "500" }}>
            On Going Order
          </Text>
          <View>
            {loading ? (
              <>
                <View style={styles.loadingTxt}>
                  <Text>Loading...</Text>
                </View>
              </>
            ) : order == null ? (
              <>
                <View style={styles.loadingTxt}>
                  <Text>You have no on going order</Text>
                </View>
              </>
            ) : (
              <View style={styles.grid}>
                <OnGoingOrderCard order={order} />
              </View>
            )}
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 24, fontWeight: "500" }}>Order History</Text>
          <View style={styles.subContainer2}>
            {loading ? (
              <>
                <View style={styles.loadingTxt}>
                  <Text>Loading...</Text>
                </View>
              </>
            ) : history.length === 0 ? (
              <>
                <View style={styles.loadingTxt}>
                  <Text>No listing history to be shown</Text>
                </View>
              </>
            ) : (
              history.map((item, index) => {
                return <OrderHistoryCard order={item} />;
              })
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({
  subContainer: {
    flex: 1,
    gap: 16,
    paddingTop: 20,
    paddingBottom: 20,
  },
  subContainer2: {
    flex: 1,
    gap: 16,
    paddingTop: 20,
    paddingBottom: 100,
  },
  loadingTxt: {
    width: "100%",
    height: windowHeight / 4,
    justifyContent: "center",
    alignItems: "center",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 10,
    paddingBottom: 20,
  },
  gridItem: {
    width: "48%",
    marginBottom: 16,
  },
});
