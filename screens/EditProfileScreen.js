// screens/EditProfileScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Dimensions,
} from "react-native";
import {
  getDocumentIDByEmail,
  updateProfile,
} from "../controller/UserController";

const window = Dimensions.get("window");
const windowWidth = window.width;
const windowHeight = window.height;

const EditProfileScreen = ({ route }) => {
  const { userInfo } = route.params;
  const [nickname, setNickname] = useState(userInfo.nickname);
  const [fullName, setFullName] = useState(userInfo.name);
  const [phoneNumber, setPhoneNumber] = useState(userInfo.phoneNumber);
  const [address, setAddress] = useState(userInfo.address);

  const handleUpdateProfile = async () => {
    await updateProfile(
      userInfo.email,
      nickname,
      fullName,
      phoneNumber,
      address
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nickname</Text>
        <TextInput
          style={styles.input}
          value={nickname}
          onChangeText={setNickname}
          placeholder="Enter your nickname"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          value={fullName}
          onChangeText={setFullName}
          placeholder="Enter your name"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Active Phone Number</Text>
        <TextInput
          style={styles.input}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          placeholder="Enter your phone number"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Address</Text>
        <TextInput
          style={styles.input}
          value={address}
          onChangeText={setAddress}
          placeholder="Enter your address"
        />
        <Text style={{ color: "gray", fontSize: 12 }}>
          This address will be used for shipping address
        </Text>
      </View>
      <View style={{ flex: 1, alignItems: "center" }}>
        <Pressable
          onPress={handleUpdateProfile}
          style={{
            backgroundColor: "#F15025",
            width: windowWidth / 1.5,
            padding: 10,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 10,
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>
            Update Profile
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#F15025",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderBottomWidth: 1,
    borderRadius: 4,
    color: "black",
  },
});

export default EditProfileScreen;
