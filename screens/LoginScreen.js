import {
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const window = Dimensions.get("window");
  const windowWidth = window.width;
  const windowHeight = window.height;

  const login = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response._tokenResponse.email + " logged in");
    } catch (error) {
      console.log(error);
      alert("Sign in failed " + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    try {
      const unsubscribe = auth.onAuthStateChanged((authUser) => {
        if (authUser) {
          navigation.navigate("Main");
        }
      });

      return unsubscribe;
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#E6E8E6", alignItems: "center" }}
    >
      <KeyboardAvoidingView>
        <View style={{ alignItems: "center", marginTop: 50 }}>
          <Image
            style={{ height: windowHeight / 5, width: 150 }}
            source={require("../assets/image/MeowLife Logo.png")}
          />
          <Text
            style={{
              fontSize: 45,
              color: "white",
              fontWeight: "bold",
              textShadowColor: "gray",
              textShadowOffset: { width: 3, height: 2 },
              textShadowRadius: 2,
            }}
          >
            MeowLife
          </Text>
        </View>

        <View
          style={{
            width: windowWidth,
            marginTop: 50,
            gap: 10,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              width: "80%",
              height: 55,
              backgroundColor: "#DAE3E5",
              borderRadius: 10,
              justifyContent: "center",
              padding: 15,
              borderBottomWidth: 3,
              borderColor: "gray",
            }}
          >
            <TextInput
              value={email}
              onChangeText={(text) => {
                setEmail(text);
              }}
              placeholder="Email"
              style={{
                fontSize: email ? 18 : 18,
              }}
            />
          </View>
          <View
            style={{
              width: "80%",
              height: 55,
              backgroundColor: "#DAE3E5",
              borderRadius: 10,
              justifyContent: "center",
              padding: 15,
              borderBottomWidth: 3,
              borderColor: "gray",
            }}
          >
            <TextInput
              secureTextEntry={true}
              value={password}
              onChangeText={(text) => {
                setPassword(text);
              }}
              placeholder="Password"
              style={{
                fontSize: password ? 18 : 18,
              }}
            />
          </View>
        </View>

        <View
          style={{
            width: windowWidth,
            marginTop: 50,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Pressable
            onPress={login}
            style={{
              width: "80%",
              backgroundColor: "#F15025",
              padding: 15,
              borderRadius: 7,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: "white",
                fontSize: 20,
              }}
            >
              Login
            </Text>
          </Pressable>

          <Pressable
            onPress={() => navigation.navigate("Register")}
            style={{ marginTop: 20, flexDirection: "row" }}
          >
            <Text style={{ textAlign: "center", color: "gray", fontSize: 15 }}>
              Dont have an account yet?{" "}
            </Text>
            <Text
              style={{
                textAlign: "center",
                color: "gray",
                fontSize: 15,
                color: "#F15025",
                textDecorationLine: "underline",
              }}
            >
              Register here
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
