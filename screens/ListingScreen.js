import { Dimensions, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../components/Header'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const ListingScreen = () => {

  const navigation = useNavigation();

  const window = Dimensions.get('window');
  const windowWidth = window.width;
  const windowHeight = window.height;
 
  return (
    <View style={{width: windowWidth, height: windowHeight, alignItems: "center"}}>
      <Header />
      <ScrollView style={{width: windowWidth, height: windowHeight}}>
        <View style={{flex: 1}}>
          <Text>Your Listing</Text>
        </View>

        <View style={{flex: 1}}>
          <Text>Listing History</Text>
        </View>
      </ScrollView>
      <Pressable onPress={()=>{navigation.navigate("Cat Listing")}}
        style={{position: "absolute", width: windowWidth / 2, bottom: 0, marginBottom: 40 ,justifyContent: "center", alignItems: "center", backgroundColor: "#F15025", flexDirection: "row", borderRadius: 20, padding: 5, paddingLeft: 20, paddingRight: 20}}>
            <Ionicons name="add" size={25} color="white" />
            <Text style={{fontSize: 15, color: "white", fontWeight: "bold"}}>List Your Cat</Text>
      </Pressable>
    </View>
  )
}

export default ListingScreen

const styles = StyleSheet.create({})