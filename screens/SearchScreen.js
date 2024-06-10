import { Dimensions, Pressable, StyleSheet, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation, useRoute } from '@react-navigation/native';
import { Feather, Ionicons } from '@expo/vector-icons';
import SearchResult from '../components/SearchResult';
import { firestore } from "../firebase";
import { getDocs, collection } from "firebase/firestore";

const SearchScreen = () => {
  const route = useRoute()
  const navigation = useNavigation();
  const window = Dimensions.get('window');
  const windowWidth = window.width;
  const windowHeight = window.height;

  const [input, setInput] = useState("")
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (data.length > 0) return;
  
    setLoading(true);
  
    const fetchProducts = async () => {
      try {
        const colRef = collection(firestore, "market");
        const docsSnap = await getDocs(colRef);
        const fetchedData = [];
        docsSnap.forEach((doc) => {
          fetchedData.push(doc.data());
        });
        setData(fetchedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
  
    fetchProducts();
  }, [data, route.params]);

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
