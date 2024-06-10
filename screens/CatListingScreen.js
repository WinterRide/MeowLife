import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
} from "react-native";
import React, { useState } from "react";
import RNPickerSelect from "react-native-picker-select";
import { FontAwesome6 } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import CatLevelInfo from "../components/CatLevelInfo";
import UploadMedia from "../components/UploadMedia";
import UploadVaccine from "../components/UploadVaccine";
import "react-native-get-random-values";
import { useUser } from "../UserContext";
import {
  uploadData,
  uploadImages,
  uploadVaccines,
} from "../controller/DistinctController";
import { useNavigation } from "@react-navigation/native";
import { createCat } from "../factory/CatFactory";

const CatListingScreen = () => {
  const window = Dimensions.get("window");
  const windowWidth = window.width;
  const windowHeight = window.height;
  const navigation = useNavigation();
  const { userInfo } = useUser();
  const [species, setSpecies] = useState("");
  const [breed, setBreed] = useState("");
  const [price, setPrice] = useState(0);
  const [age, setAge] = useState(0);
  const [description, setDescription] = useState("");
  const [affection, setAffection] = useState(1);
  const [playfulness, setPlayfulness] = useState(1);
  const [kidFriendly, setKidFriendly] = useState(1);
  const [energy, setEnergy] = useState(1);

  const [uploading, setUploading] = useState(false);

  const breedList = [
    "American breed",
    "European breed",
    "Eastern breed",
    "Other breed",
  ];

  const handlePriceChange = (text) => {
    const numericText = text.replace(/[^0-9]/g, "");
    setPrice(numericText);
  };

  const handleAgeChange = (text) => {
    const numericText = text.replace(/[^0-9]/g, "");
    setAge(numericText);
  };

  const onPressUp = (level, setLevel) => {
    if (level < 5) {
      setLevel(level + 1);
    }
  };

  const onPressDown = (level, setLevel) => {
    if (level > 1) {
      setLevel(level - 1);
    }
  };

  const levelInput = (level, setLevel) => {
    return (
      <View style={{ flex: 1, alignItems: "flex-end" }}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
          }}
        >
          <Pressable
            style={{
              height: 25,
              width: 25,
              backgroundColor: "#F15025",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 30,
            }}
            onPress={() => {
              onPressDown(level, setLevel);
            }}
          >
            <Entypo name="minus" size={15} color="white" />
          </Pressable>
          <Text>{level}</Text>
          <Pressable
            style={{
              height: 25,
              width: 25,
              backgroundColor: "#F15025",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 30,
            }}
            onPress={() => {
              onPressUp(level, setLevel);
            }}
          >
            <FontAwesome6 name="add" size={15} color="white" />
          </Pressable>
        </View>
      </View>
    );
  };

  const [images, setImages] = useState([]);

  const handleImagesChange = (newImages) => {
    setImages(newImages);
  };

  const [vaccines, setVaccines] = useState([{ name: "", image: null }]);

  const handleVaccineChange = (index, name, imageUri) => {
    const updatedVaccines = vaccines.map((vaccine, i) =>
      i === index ? { name, image: imageUri } : vaccine
    );
    setVaccines(updatedVaccines);
  };

  const addVaccine = () => {
    setVaccines([...vaccines, { name: "", image: null }]);
  };

  const removeVaccine = (index) => {
    if (vaccines.length > 1) {
      setVaccines(vaccines.filter((_, i) => i !== index));
    }
  };

  const handleUpload = async () => {
    setUploading(true);
    const imageUrls = await uploadImages(images);
    const updatedVaccines = await uploadVaccines(vaccines);
    const level = [{ affection }, { playfulness }, { kidFriendly }, { energy }];
    const cat = createCat({
      species,
      breed,
      age,
      userInfo,
      price,
      description,
      level,
      photos: imageUrls,
      vaccine: updatedVaccines,
    });
    uploadData("request", cat);
    alert("Cat Listing requested successfully");
    setUploading(false);
    navigation.navigate;
  };

  const image = images[0];

  return (
    <View
      style={{
        width: windowWidth,
        height: windowHeight,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 32,
      }}
    >
      <ScrollView style={{ width: windowWidth }}>
        <View
          style={{
            flex: 1,
            width: "90%",
            backgroundColor: "white",
            marginTop: 20,
            padding: 20,
            borderRadius: 10,
            gap: 30,
            alignSelf: "center",
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              borderBottomWidth: 2,
              borderColor: "gray",
            }}
          >
            <Text
              style={{
                fontSize: 18,
                color: "#F15025",
                fontWeight: "bold",
                marginBottom: 20,
              }}
            >
              Cat Species
            </Text>
            <TextInput
              value={species}
              onChangeText={(text) => {
                setSpecies(text);
              }}
              placeholder="Enter your cat species"
              style={{ paddingBottom: 5, fontSize: species ? 18 : 18 }}
            />
          </View>

          <View
            style={{
              flex: 1,
              justifyContent: "center",
              borderBottomWidth: 2,
              borderColor: "gray",
              paddingBottom: 5,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                color: "#F15025",
                fontWeight: "bold",
                marginBottom: 20,
              }}
            >
              Cat Breeds
            </Text>
            <View
              style={{
                width: "75%",
                height: "50%",
                borderWidth: 1,
                borderRadius: 10,
              }}
            >
              <RNPickerSelect
                onValueChange={(value) => setBreed(value)}
                items={breedList.map((breed) => ({
                  label: breed,
                  value: breed,
                }))}
                placeholder={{ label: "Choose", value: null }}
              />
            </View>
          </View>

          <View
            style={{
              flex: 1,
              justifyContent: "center",
              borderBottomWidth: 2,
              borderColor: "gray",
              paddingBottom: 5,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                color: "#F15025",
                fontWeight: "bold",
                marginBottom: 20,
              }}
            >
              Cat Photo (max : 10)
            </Text>
            <View>
              <UploadMedia onImagesChange={handleImagesChange} />
            </View>
          </View>

          <View style={{ flex: 1, justifyContent: "center", paddingBottom: 5 }}>
            <Text
              style={{
                fontSize: 18,
                color: "#F15025",
                fontWeight: "bold",
                marginBottom: 20,
              }}
            >
              Vaccine List
            </Text>
            <View>
              {vaccines.map((vaccine, index) => (
                <UploadVaccine
                  key={index}
                  vaccine={vaccine}
                  onVaccineChange={(name, imageUri) =>
                    handleVaccineChange(index, name, imageUri)
                  }
                  onRemove={() => removeVaccine(index)}
                  canRemove={vaccines.length > 1}
                  index={index}
                />
              ))}
              <Pressable
                style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
                onPress={addVaccine}
              >
                <View
                  style={{
                    width: 40,
                    height: 40,
                    backgroundColor: "gray",
                    borderRadius: 10,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <FontAwesome6 name="add" size={15} color="white" />
                </View>
                <Text style={styles.addButtonText}>Add Another Vaccine</Text>
              </Pressable>
            </View>
          </View>

          <View
            style={{
              flex: 1,
              justifyContent: "center",
              borderBottomWidth: 2,
              borderColor: "gray",
              paddingBottom: 5,
            }}
          >
            <View style={{ flexDirection: "row", gap: 10 }}>
              <Text
                style={{
                  fontSize: 18,
                  color: "#F15025",
                  fontWeight: "bold",
                  marginBottom: 20,
                }}
              >
                Cat Level
              </Text>
              <CatLevelInfo levelColor={"#F15025"} />
            </View>

            <View style={{ flex: 1, alignItems: "center", gap: 16 }}>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ fontSize: 15 }}>Affection Level</Text>
                {levelInput(affection, setAffection)}
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ fontSize: 15 }}>Playfulness Level</Text>
                {levelInput(playfulness, setPlayfulness)}
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ fontSize: 15 }}>Kid-Friendly Level</Text>
                {levelInput(kidFriendly, setKidFriendly)}
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ fontSize: 15 }}>Energy Level</Text>
                {levelInput(energy, setEnergy)}
              </View>
            </View>
          </View>

          <View
            style={{
              flex: 1,
              justifyContent: "center",
              borderBottomWidth: 2,
              borderColor: "gray",
            }}
          >
            <Text
              style={{
                fontSize: 18,
                color: "#F15025",
                fontWeight: "bold",
                marginBottom: 20,
              }}
            >
              Cat Price (IDR)
            </Text>
            <TextInput
              value={price}
              onChangeText={handlePriceChange}
              keyboardType="numeric"
              placeholder="Enter your cat price"
              style={{ paddingBottom: 5, fontSize: species ? 18 : 18 }}
            />
          </View>

          <View
            style={{
              flex: 1,
              justifyContent: "center",
              borderBottomWidth: 2,
              borderColor: "gray",
            }}
          >
            <Text
              style={{
                fontSize: 18,
                color: "#F15025",
                fontWeight: "bold",
                marginBottom: 20,
              }}
            >
              Cat Age (in years)
            </Text>
            <TextInput
              value={age}
              onChangeText={handleAgeChange}
              keyboardType="numeric"
              placeholder="Enter your cat age"
              style={{ paddingBottom: 5, fontSize: species ? 18 : 18 }}
            />
          </View>

          <View
            style={{
              flex: 1,
              justifyContent: "center",
              borderBottomWidth: 2,
              borderColor: "gray",
              paddingBottom: 5,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                color: "#F15025",
                fontWeight: "bold",
                marginBottom: 20,
              }}
            >
              Description
            </Text>
            <TextInput
              value={description}
              onChangeText={(text) => {
                setDescription(text);
              }}
              placeholder="Enter description"
              style={{ paddingBottom: 5, fontSize: species ? 18 : 18 }}
            />
          </View>

          <View style={{ flex: 1, height: windowHeight / 5 }}>
            {uploading ? (
              <Text style={{ flex: 1, alignSelf: "center" }}>Uploading</Text>
            ) : (
              <Pressable
                onPress={handleUpload}
                style={{
                  top: 0,
                  backgroundColor: "#F15025",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 10,
                  padding: 10,
                }}
              >
                <Text
                  style={{ fontWeight: "bold", color: "white", fontSize: 15 }}
                >
                  Request Cat Listing
                </Text>
              </Pressable>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default CatListingScreen;

const styles = StyleSheet.create({});
