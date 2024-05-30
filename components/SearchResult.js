import { FlatList, Pressable, StyleSheet, Text, View, Image, Dimensions } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const SearchResult = ({data, input, setInput}) => {

  const navigation = useNavigation();
  const window = Dimensions.get('window');
  const windowWidth = window.width;
  const windowHeight = window.height;

  return (
    <View style={{alignItems: "center"}}>
      <View style={{padding: 10, width: windowWidth / 1.3}}>
        <FlatList data={data} renderItem={({item}) => {
          if (item.species.toLowerCase().includes(input.toLowerCase())){
              if (input === ""){
                  return null;
              }
              return (
              <Pressable onPress={()=>{
                  setInput(item.species);
                  navigation.navigate("Main", {
                    screen: "Market",
                    params: { input: item.species }
                  });
              }}
              
              style={{flexDirection: "row", alignItems: "center", marginVertical: 10}}>
                  <View>
                      <Text style={{fontSize: 15, fontWeight: "500"}}>{item.species}</Text>
                  </View>
              </Pressable>
              )
          }
        }} />
      </View>
    </View>
  )
}

export default SearchResult

const styles = StyleSheet.create({})