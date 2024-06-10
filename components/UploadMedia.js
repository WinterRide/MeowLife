import React, { useState } from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { FontAwesome6 } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

const UploadMedia = ({ onImagesChange }) => {
  const [images, setImages] = useState([]);

  const pickImage = async () => {
    if (images.length >= 10) {
      alert("You can't add more than 10 photos.");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      quality: 1,
      multiple: true,
    });

    if (!result.cancelled) {
      const remainingSlots = 10 - images.length;
      const selectedImages = result.assets
        .slice(0, remainingSlots)
        .map((asset) => asset.uri);
      setImages([...images, ...selectedImages]);
      onImagesChange([...images, ...selectedImages]);
    }
  };

  const removeImage = (indexToRemove) => {
    const updatedImages = images.filter((_, index) => index !== indexToRemove);
    setImages(updatedImages);
    onImagesChange(updatedImages);
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Pressable style={styles.selectButton} onPress={pickImage}>
          <FontAwesome6 name="add" size={15} color="white" />
        </Pressable>
        {images.map((image, index) => (
          <Pressable key={index} onPress={() => removeImage(index)}>
            <Image
              source={{ uri: image }}
              style={{ width: 50, height: 50, borderRadius: 10 }}
            />
            <Pressable
              key={index}
              onPress={() => removeImage(index)}
              style={styles.removeButton}
            >
              <Entypo name="cross" size={20} color="white" />
            </Pressable>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default UploadMedia;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "left",
    gap: 10,
  },
  selectButton: {
    borderRadius: 10,
    width: 50,
    height: 50,
    backgroundColor: "gray",
    alignItems: "center",
    justifyContent: "center",
  },
  removeButton: {
    position: "absolute",
    top: 0,
    right: 0,
    marginTop: -5,
    marginRight: -5,
    backgroundColor: "red",
    borderRadius: 50,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  imageContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 10,
  },
});
