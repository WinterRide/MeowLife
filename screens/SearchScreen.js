import { Dimensions, Pressable, StyleSheet, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native';
import { Feather, Ionicons } from '@expo/vector-icons';
import SearchResult from '../components/SearchResult';

const SearchScreen = () => {
  const navigation = useNavigation();
  const window = Dimensions.get('window');
  const windowWidth = window.width;
  const windowHeight = window.height;

  const [input, setInput] = useState("")

  const data = [
    {
      species : "Balinese",
      breed: "Other breeds",
      age: 4,
      owner: "Jose",
      price: 12000000
    },
    {
      species: "Birman",
      breed: "Eastern breeds",
      age: 5,
      owner: "Kitsune",
      price: 13000000
    },
    {
      species: "American shorthair",
      breed: "American breeds",
      age: 5,
      owner: "WinterRide",
      price: 18000000
    },
    {
      species: "American bobtail",
      breed: "American breeds",
      age: 3,
      owner: "Imjoo",
      price: 20000000
    }
  ];

  const handleSearch = () => {
    navigation.navigate("Main", {
      screen: "Market",
      params: { input: input }
    });
  }

  return (
    <SafeAreaView>
      <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 20, marginTop: 20 }}>
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={30} color="black" />
        </Pressable>
        <View style={{ flexDirection: "row", alignItems: "center", width: windowWidth / 1.2, height: 50, borderRadius: 10, borderColor: "black", borderWidth: 2, gap: 10 }}>
          <TextInput
            value={input}
            onChangeText={(text) => setInput(text)}
            placeholder="Search cat species"
            style={{ flex: 1, textAlign: "left", padding: 10 }}
            onSubmitEditing={handleSearch}
          />
          <Pressable
            onPress={handleSearch}
            style={{ backgroundColor: "#F15025", padding: 5, marginRight: 5, borderRadius: 10 }}
          >
            <Feather name="search" size={24} color="white" />
          </Pressable>
        </View>
      </View>
      <SearchResult data={data} input={input} setInput={setInput} />
    </SafeAreaView>
  )
}

export default SearchScreen

const styles = StyleSheet.create({})
