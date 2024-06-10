import React, { useEffect, useLayoutEffect, useState } from "react";
import { View, Pressable, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import { useIsFocused, useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import NecessitiesCard from "../components/NecessitiesCard";
import PropertyCard from "../components/PropertyCard";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { BottomTabs } from "../StackNavigator";
import OnGoingOrderCard from "../components/OnGoingOrderCard";
import { useUser } from "../UserContext";
import { getData } from "../controller/DistinctController";
import ListingHistoryCard from "../components/ListingHistoryCard";
import { getOrderByEmail } from "../controller/OrderController";
import { getProductById } from "../controller/ProductController";

const window = Dimensions.get("window");
const windowWidth = window.width;
const windowHeight = window.height;

const HomeScreen = () => {
  const {userInfo} = useUser();
  const navigation = useNavigation();
  const route = useRoute();
  const [data, setData] = useState([])

  const [loading, setLoading] = useState(false)
  const [featuredList, setFeaturedList] = useState([])
  const [order, setOrder] = useState(null)
  const [product, setProduct] = useState(null)

  const isFocused = useIsFocused()

  useEffect(() => {
    if (isFocused){
      setLoading(true)
      fetchMarketData();
      if (userInfo?.onOrder == true){
        fetchOrder()
      }
      setLoading(false)
    }
  }, [isFocused]);

  const fetchOrder = async() => {
    setLoading(true);
    const orderItem = await getOrderByEmail(userInfo.email)
    setOrder(orderItem[0])
    setLoading(false);
  }

  const fetchMarketData = async () => {
    setLoading(true);
    try {
      const data = await getData("market");
      setData(data);
      const featuredItems = data.filter(item => item.onFeatured === true);
      setFeaturedList(featuredItems)
    } catch (error) {
      console.error("Error fetching market data: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      <Header />
      <ScrollView
        style={{
          width: "90%",
          margin: "auto",
          paddingVertical: 16,
        }}
      >
        <View style={{flex: 1}}>
          <View style={{flexDirection: "row"}}>
            <Text style={{ fontSize: 24, fontWeight: 500 }}>On Going Order</Text>
          </View>
          
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
                    <OnGoingOrderCard
                    order={order}
                  />
                </View>
              )}
          </View>
        </View>
        <View style={{flex: 1}}>
          <View style={{flexDirection: "row"}}>
            <Text style={{ fontSize: 24, fontWeight: 500 }}>Featured Products</Text>
            {userInfo?.role == "Admin" && (
              <Pressable onPress={()=>{navigation.navigate("Add Featured Product")}}style={{justifyContent: "center", alignItems: "center", borderRadius: 10, paddingLeft: 10, paddingRight: 10}}>
                <Text  style={{color: "#F15025", fontSize: 12, fontWeight: "bold"}}>Add Product</Text>
              </Pressable>
            )}
          </View>
          
          <View>
            {loading ? (
                <> 
                <View style={styles.loadingTxt}>
                  <Text>Loading...</Text>
                </View>
                </>
              ) : featuredList.length === 0 ? (
                <> 
                <View style={styles.loadingTxt}>
                  <Text>There are no featured product at the moment</Text>
                </View>
                </>
              ) : (
                <View style={styles.grid}>
                  {featuredList.map((item, index) => (
                    <View key={index} style={styles.gridItem}>
                      <PropertyCard item={item} />
                    </View>
                  ))}
                </View>
              )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  subContainer : {
    flex: 1,
    gap: 16,
    paddingTop: 20,
    paddingBottom: 20,
  },
  subContainer2 : {
    flex: 1,
    gap: 16,
    paddingTop: 20,
    paddingBottom: 100,
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
    gap: 10,
    paddingBottom: 20
  },
  gridItem: {
    width: '48%',
    marginBottom: 16
  }
});
