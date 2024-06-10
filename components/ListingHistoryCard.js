import { View, Text, Pressable, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "../UserContext";
import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase";

export default function ListingHistoryCard({ item, index }) {
  const navigation = useNavigation()
  const {userInfo} = useUser()
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
      onOrder: item.onOrder
    });
  };

  const handleAddFeatured = async () => {
    const docRef = doc(firestore, 'market', item.id);
    await updateDoc(docRef, { onFeatured: true });
    alert("Success added product to featured section")
  }

  const handleRemoveFeatured = async () => {
    const docRef = doc(firestore, 'market', item.id);
    await updateDoc(docRef, { onFeatured: false });
    alert("Success removed product from featured section")
  }
  
  return (
    <Pressable
    onPress={infoScreen}
      key={index}
      style={{
        flex: 1,
        width: "full",
        display: "flex",
        flexDirection: "row",
        gap: 16,
        backgroundColor: "white",
        elevation: 5,
        borderRadius: 10,
        padding: 12,
      }}
    >
      <Image
        style={{ aspectRatio: 1, borderRadius: 10 }}
        source={{ uri: item.photos[0] }}
      />
      <View style={{ flex: 1, gap: 2 }}>
        <View style={{flexDirection: "row"}}>
          <View>
            <Text style={{ fontSize: 20, fontWeight: 600 }}>{item.species}</Text>
            <Text style={{ fontSize: 10 }}>{item.breed}</Text>
          </View>
          <View style={{ flex: 1, alignItems: "flex-end"}}>
            <Text style={{ color: item.status === "Rejected" ? "#FF0000" : item.status === "In Review" ? "#F7B654" : "#25BC3D" }}>
              {item.status}
            </Text>
            {userInfo?.role == "Admin" && item.status == "Accepted" && 'onFeatured' in item && (
              <View style={{gap: 10}}>
                {item.onFeatured == true ? (
                  <Pressable onPress={handleRemoveFeatured} style={{backgroundColor: "#FF0000", justifyContent: "center", alignItems: "center", borderRadius: 10, padding: 5, paddingLeft: 10, paddingRight: 10}}>
                    <Text style={{color: "white", fontWeight: "bold"}}>Remove Featured</Text>
                  </Pressable>
                ) : (
                  <Pressable onPress={handleAddFeatured} style={{backgroundColor: "#25BC3D", justifyContent: "center", alignItems: "center", borderRadius: 10, padding: 5, paddingLeft: 10, paddingRight: 10}}>
                    <Text style={{color: "white", fontWeight: "bold"}}>Add to Featured</Text>
                  </Pressable>
                )}
              </View>
            )}
          </View>
        </View>
        
        <View style={{ height: 12 }} />
        <Text>{item.age} years old</Text>
        <View style={{flex: 1, flexDirection: "row"}}>
          <Text style={{ flex: 1, alignSelf: "flex-start"}}>{item.owner}</Text>
          <Text style={{ alignSelf: "flex-end" }}>View Details &gt;&gt;</Text>
        </View>
        
      </View>
    </Pressable>
  );
}
