import {
  Alert,
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import BottomTabs from "../components/BottomTabs";
import { useNavigation, useRoute } from "@react-navigation/native";
import Caraousel from "../components/Caraousel";
import { Ionicons } from "@expo/vector-icons";
import LevelIndicator from "../components/LevelIndicator";
import { useUser } from "../UserContext";
import { firestore } from "../firebase";
import {
  getDocs,
  collection,
  query,
  where,
  addDoc,
  doc,
  getDoc,
  updateDoc,
  setDoc,
} from "firebase/firestore";
import CatLevelInfo from "../components/CatLevelInfo";
import {
  fetchDocumentId,
  handleAccept,
  handleReject,
} from "../controller/RequestController";
import { AntDesign } from "@expo/vector-icons";
import { getUserDocIdByEmail } from "../controller/DistinctController";
import {
  getOrderDocIdsByBuyerAndItem,
  handleRequestOrder,
} from "../controller/OrderController";

const ItemInfoScreen = () => {
  const window = Dimensions.get("window");
  const windowWidth = window.width;
  const windowHeight = window.height;

  const route = useRoute();
  const navigation = useNavigation();
  const { userInfo } = useUser();
  const [orderId, setOrderId] = useState(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitleStyle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
      },
      headerStyle: {
        height: 110,
        borderBottomColor: "transparent",
        shadowColor: "transparent",
      },
      headerLeft: () => (
        <Pressable onPress={() => navigation.goBack()} style={{ padding: 10 }}>
          <Ionicons name="arrow-back" size={30} color="black" />
        </Pressable>
      ),
    });
  }, [navigation]);

  const findOrderId = async () => {
    const id = await getOrderDocIdsByBuyerAndItem(
      userInfo.email,
      route.params.id
    );
    setOrderId(id);
  };

  useEffect(() => {
    findOrderId();
  }, []);

  const handleAcceptAction = async () => {
    await handleAccept(route.params.id);
    navigation.goBack();
  };

  const handleRejectAction = async () => {
    await handleReject(route.params.id);
    navigation.goBack();
  };

  const handleRequestOrderAction = async () => {
    await handleRequestOrder(
      userInfo.email,
      route.params.ownerEmail,
      route.params.id
    );
  };

  const formattedPrice = route.params.price.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
  });
  return (
    <View
      style={{
        flex: 1,
        width: windowWidth,
        height: windowHeight,
        backgroundColor: "white",
      }}
    >
      <ScrollView style={{ width: windowWidth, height: windowHeight }}>
        <Caraousel photos={route.params.photos} />

        <View
          style={{
            flex: 1,
            marginHorizontal: 20,
            marginTop: 20,
            borderBottomWidth: 2,
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
          }}
        >
          <View>
            <Text style={{ fontSize: 12 }}>{route.params.age} years old</Text>
            <Text style={{ fontSize: 30, fontWeight: 'bold' }}>
              {route.params.species}
            </Text>
            <Text style={{ fontSize: 12 }}>{route.params.breed}</Text>
            <Text style={{ fontSize: 15, marginTop: 25, marginBottom: 10 }}>
              Owner : {route.params.owner}
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' , marginBottom: 10}}>
              <Text style={{ color: 'gray' }}>0.0 (0)</Text>
              <Text style={{ fontSize: 15, marginLeft: 10 }}>
                {formattedPrice}
              </Text>
            </View>
          </View>
          {route.params.status === 'Accepted' && userInfo.onOrder === false ? (
            <Pressable
              onPress={handleRequestOrderAction}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#F15025',
                flexDirection: 'row',
                borderRadius: 20,
                padding: 5,
                paddingLeft: 20,
                paddingRight: 20,
                marginTop: 15,
              }}
            >
              <Ionicons name="add" size={25} color="white" />
              <Text style={{ fontSize: 15, color: 'white' }}>Request Order</Text>
            </Pressable>
          ) : null}
        </View>

        <View
          style={{
            flex: 1,
            marginHorizontal: 20,
            marginTop: 20,
            gap: 10,
          }}
        >
          {userInfo.email == route.params.ownerEmail &&
          route.params.status == "Accepted" ? (
            <Pressable
              onPress={() => {
                navigation.navigate("Order Request", { id: route.params.id });
              }}
              style={{
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#F15025",
                flexDirection: "row",
                borderRadius: 20,
                padding: 5,
                paddingLeft: 20,
                paddingRight: 20,
                gap: 10,
              }}
            >
              <Ionicons name="receipt" size={15} color="white" />
              <Text style={{ fontSize: 15, color: "white" }}>
                View Order Request
              </Text>
            </Pressable>
          ) : route.params.status == "Accepted" &&
            orderId != null &&
            userInfo.email == route.params.ownerEmail ? (
            <Pressable
              onPress={handleRequestOrderAction}
              style={{
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
              <Text style={{ fontSize: 15, color: "white" }}>
                View Your Order
              </Text>
            </Pressable>
          ) : route.params.status == "Accepted" &&
            userInfo.onOrder == false ? null : (
            route.params.status == "Accepted" &&
            userInfo.onOrder == true && (
              <View>
                <Pressable
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "gray",
                    flexDirection: "row",
                    borderRadius: 20,
                    padding: 5,
                    paddingLeft: 20,
                    paddingRight: 20,
                  }}
                >
                  <Ionicons name="add" size={25} color="white" />
                  <Text style={{ fontSize: 15, color: "white" }}>
                    Request Order
                  </Text>
                </Pressable>
                <Text style={{ color: "red" }}>
                  Please finish your on-going order first
                </Text>
              </View>
            )
          )}

          {userInfo?.role == "Admin" && route.params.status != "Accepted" && (
            <View style={{ flex: 1, width: windowWidth / 3, gap: 10 }}>
              <Pressable
              onPress={handleAcceptAction}
              style={{
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#25BC3D",
                flexDirection: "row",
                borderRadius: 20,
                padding: 5,
                paddingLeft: 20,
                paddingRight: 20,
              }}
            >
              <Text style={{ fontSize: 15, color: "white" }}>Accept</Text>
            </Pressable>
            <Pressable
              onPress={handleRejectAction}
              style={{
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#FF0000",
                flexDirection: "row",
                borderRadius: 20,
                padding: 5,
                paddingLeft: 20,
                paddingRight: 20,
              }}
            >
              <Text style={{ fontSize: 15, color: "white" }}>Reject</Text>
            </Pressable>
          </View>
        )}
      </View>

      <View
        style={{
          flex: 1,
          marginHorizontal: 20    ,
          marginTop: 20,
          borderBottomWidth: 2,
          paddingBottom: 20,
        }}
      >
        <LevelIndicator level={route.params.level} />
      </View>

      <View
        style={{
          flex: 1,
          marginHorizontal: 20,
          marginTop: 20,
          borderBottomWidth: 2,
          paddingBottom: 20,
        }}
      >
        <Text style={{ color: "gray", marginBottom: 10 }}>
          Vaccine List :
        </Text>
        {route.params.vaccine.map((val, index) => (
          <View key={index} style={{ flexDirection: "row" }}>
            <Text style={{ color: "gray" }}>
              {index + 1}. {val.name}
            </Text>
            {userInfo.role == "Admin" && (
              <Pressable style={{ marginLeft: 10 }}>
                <AntDesign name="download" size={18} color="black" />
              </Pressable>
            )}
          </View>
        ))}
      </View>

      <View
        style={{
          flex: 1,
          marginHorizontal: 20,
          marginTop: 20,
          paddingBottom: 20,
        }}
      >
        <Text style={{ color: "gray", marginBottom: 10 }}>Description :</Text>
        <Text style={{ flex: 1, color: "gray", marginBottom: 70 }}>
          {route.params.description}
        </Text>
      </View>
    </ScrollView>
    <BottomTabs />
  </View>
);
};

export default ItemInfoScreen;

const styles = StyleSheet.create({});