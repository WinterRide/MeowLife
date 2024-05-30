import { Alert, Dimensions, KeyboardAvoidingView, Pressable, StyleSheet, Text, TextInput, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase';
import { setDoc,doc } from 'firebase/firestore';


const RegisterScreen = () => {
    
    const [nickname,setNickname] = useState("");
    const [name, setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");
    const navigation = useNavigation();

    const window = Dimensions.get('window');
    const windowWidth = window.width;
    const windowHeight = window.height;

    useEffect(()=> {
        try {
            const unsubscribe = auth.onAuthStateChanged((authUser)=> {
                if (!authUser) {
    
                }
                if (authUser){
                    navigation.navigate("Main")
                }
            })
    
            return unsubscribe
        } catch (e){
            console.log(e)
        }
    }, [])

    const register = () => {
        if(email === "" || nickname === "" || name === ""|| password === ""){
            Alert.alert(
                "Invalid Details",
                "Please enter all the credentials",
                [
                  {
                    text: "Close",
                    onPress: () => console.log("Close Pressed"),
                    style: "close"
                  }
                ],
                { cancelable: false }
            );
        }

        if (!(password === confirmPassword)){
            Alert.alert(
              "Invalid Details",
              "Password dont match",
              [
                {
                  text: "Close",
                  onPress: () => console.log("Close Pressed"),
                  style: "close"
                }
              ],
              { cancelable: false }
          );
        }

        createUserWithEmailAndPassword(auth,email,password).then((userCredentials) => {
           
            const user = userCredentials._tokenResponse.email;
            const uid = auth.currentUser.uid;

             setDoc(doc(db,"users",`${uid}`),{
                 email:user,
                 nickname: nickname,
                 name : name,
                 address: ""
             })
        })
    }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: "#E6E8E6", alignItems: "center"}}>
    <KeyboardAvoidingView>
       <View style={{width: windowWidth, alignItems: "center", marginTop: 50, flexDirection: "row"}}>
        <Image style={{height: windowHeight / 7, width: 100}} source={require('../assets/image/MeowLife Logo.png')}/>
        <Text style={{fontSize: 35,
              color: "white",
              fontWeight: "bold",
              textShadowColor: 'gray',
              textShadowOffset: { width: 3, height: 2 },
              textShadowRadius: 2
            }}
              >
              MeowLife
              </Text>
       </View>
      
        <View style={{width: windowWidth, marginTop: 50, gap: 10, alignItems: "center", justifyContent: "center"}}>
           <View style={{width: "80%", height: 55, backgroundColor: "#DAE3E5", borderRadius: 10, justifyContent: "center", padding: 15, borderBottomWidth: 3, borderColor: "gray"}}>
                  <TextInput
                      value={nickname}
                      onChangeText={(text)=>{setNickname(text)}}
                      placeholder="Nickname"
                      style={{
                          fontSize: nickname ? 18 : 18
                      }}/>
            </View>
            <View style={{width: "80%", height: 55, backgroundColor: "#DAE3E5", borderRadius: 10, justifyContent: "center", padding: 15, borderBottomWidth: 3, borderColor: "gray"}}>
                  <TextInput
                      value={name}
                      onChangeText={(text)=>{setName(text)}}
                      placeholder="Name"
                      style={{
                          fontSize: name ? 18 : 18
                      }}/>
            </View>
            <View style={{width: "80%", height: 55, backgroundColor: "#DAE3E5", borderRadius: 10, justifyContent: "center", padding: 15, borderBottomWidth: 3, borderColor: "gray"}}>
                  <TextInput
                      value={email}
                      onChangeText={(text)=>{setEmail(text)}}
                      placeholder="Email"
                      style={{
                          fontSize: email ? 18 : 18
                      }}/>
            </View>
            <View style={{width: "80%", height: 55, backgroundColor: "#DAE3E5", borderRadius: 10, justifyContent: "center", padding: 15, borderBottomWidth: 3, borderColor: "gray"}}>
                  <TextInput
                      secureTextEntry={true}
                      value={password}
                      onChangeText={(text)=>{setPassword(text)}}
                      placeholder="Password"
                      style={{
                          fontSize: password ? 18 : 18
                      }}/>
            </View>
            <View style={{width: "80%", height: 55, backgroundColor: "#DAE3E5", borderRadius: 10, justifyContent: "center", padding: 15, borderBottomWidth: 3, borderColor: "gray"}}>
                  <TextInput
                      secureTextEntry={true}
                      value={confirmPassword}
                      onChangeText={(text)=>{setConfirmPassword(text)}}
                      placeholder="Confirm Password"
                      style={{
                          fontSize: confirmPassword ? 18 : 18
                      }}/>
            </View>
        </View>

        <View style={{width: windowWidth, marginTop: 50, alignItems: "center", justifyContent: "center"}}>
        <Pressable onPress={register}
            style={{
              width: "80%",
              backgroundColor: "#F15025",
              padding: 15,
              borderRadius: 7,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <Text style={{
                textAlign: "center",
                color: "white",
                fontSize: 20
              }}
            >
              Register
            </Text>
          </Pressable>

          <Pressable onPress={() => navigation.navigate("Login")} style={{ marginTop: 20, flexDirection: "row" }}>
            <Text style={{ textAlign: "center", color: "gray", fontSize: 15}}>Already have an account? </Text>
            <Text style={{ textAlign: "center", color: "gray", fontSize: 15, color: "#F15025", textDecorationLine: "underline" }}>Login here</Text>       
          </Pressable>
        </View>
    </KeyboardAvoidingView>
</SafeAreaView>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({})