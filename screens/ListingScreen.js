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

const window = Dimensions.get("window");
const windowWidth = window.width;
const windowHeight = window.height;

const ListingScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { userInfo } = useUser();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      fetchListing();
    }
  }, []);

  const fetchListing = async () => {
    setLoading(true);
    setData(await getData("request"));
    setLoading(false);
  };

  const getHistory = (data) => {
    return data.filter((item) => item.ownerEmail.includes(userInfo.email));
  };

  const getAccepted = (data) => {
    return data.filter(
      (item) =>
        item.ownerEmail.includes(userInfo.email) && item.status == "Accepted"
    );
  };

  const history = getHistory(data);
  const acceptedList = getAccepted(data);

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
        <Pressable
          onPress={fetchListing}
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
          <Text style={{ fontSize: 24, fontWeight: "500" }}>Your Listing</Text>
          <View style={styles.subContainer}>
            {loading ? (
              <>
                <View style={styles.loadingTxt}>
                  <Text>Loading...</Text>
                </View>
              </>
            ) : acceptedList.length === 0 ? (
              <>
                <View style={styles.loadingTxt}>
                  <Text>You have not made any listing yet</Text>
                </View>
              </>
            ) : (
              acceptedList.map((item, index) => {
                return (
                  <ListingHistoryCard key={index} index={index} item={item} />
                );
              })
            )}
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 24, fontWeight: "500" }}>
            Listing History
          </Text>
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
                return (
                  <ListingHistoryCard key={index} index={index} item={item} />
                );
              })
            )}
          </View>
        </View>
      </ScrollView>
      <Pressable
        onPress={() => {
          navigation.navigate("Cat Listing");
        }}
        style={styles.listBtn}
      >
        <Ionicons name="add" size={25} color="white" />
        <Text style={{ fontSize: 15, color: "white", fontWeight: "bold" }}>
          List Your Cat
        </Text>
      </Pressable>

      {userInfo?.role === "Admin" && (
        <Pressable
          onPress={() => {
            navigation.navigate("Listing Request");
          }}
          style={styles.adminBtn}
        >
          <FontAwesome5 name="cat" size={25} color="white" />
          <Text style={{ fontSize: 15, color: "white", fontWeight: "bold" }}>
            View Request
          </Text>
        </Pressable>
      )}
    </View>
  );
};

export default ListingScreen;

const styles = StyleSheet.create({
  listBtn: {
    position: "absolute",
    width: windowWidth / 2,
    bottom: 0,
    marginBottom: windowHeight / 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F15025",
    flexDirection: "row",
    borderRadius: 20,
    padding: 5,
    paddingLeft: 20,
    paddingRight: 20,
  },
  adminBtn: {
    position: "absolute",
    width: windowWidth / 2,
    bottom: 0,
    marginBottom: windowHeight / 7,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F15025",
    flexDirection: "row",
    borderRadius: 20,
    padding: 5,
    paddingLeft: 20,
    paddingRight: 20,
    gap: 10,
  },
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
});
