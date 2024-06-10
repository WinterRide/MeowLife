import React, { useState, useRef } from "react";
import {
  Dimensions,
  Animated,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

const Caraousel = ({ photos }) => {
  const window = Dimensions.get("window");
  const windowWidth = window.width;
  const windowHeight = window.height;

  const [imageIndex, setImageIndex] = useState(1);
  const opacity = useRef(new Animated.Value(1)).current;

  const handleNext = () => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setImageIndex((prevIndex) =>
        prevIndex < photos.length ? prevIndex + 1 : 1
      );
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  };

  const handlePrev = () => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setImageIndex((prevIndex) =>
        prevIndex > 1 ? prevIndex - 1 : photos.length
      );
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Animated.Image
          style={[styles.image, { opacity }]}
          source={{ uri: photos[imageIndex - 1] }}
        />
        <Pressable
          style={[styles.pressable, styles.leftPressable]}
          onPress={handlePrev}
        >
          <AntDesign name="caretleft" size={24} color="white" />
        </Pressable>
        <Pressable
          style={[styles.pressable, styles.rightPressable]}
          onPress={handleNext}
        >
          <AntDesign name="caretright" size={24} color="white" />
        </Pressable>
      </View>
      <Text style={styles.text}>{imageIndex}</Text>
    </View>
  );
};

export default Caraousel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "gray",
  },
  imageContainer: {
    position: "relative",
    width: "100%",
  },
  image: {
    width: "100%",
    height: Dimensions.get("window").height / 3.5,
  },
  pressable: {
    position: "absolute",
    bottom: 0,
    zIndex: 1,
  },
  leftPressable: {
    left: "40%",
  },
  rightPressable: {
    right: "40%",
  },
  text: {
    position: "absolute",
    fontSize: 20,
    color: "white",
    bottom: 0,
  },
});
