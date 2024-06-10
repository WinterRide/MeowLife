import { Dimensions, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const window = Dimensions.get("window");
const windowWidth = window.width;
const windowHeight = window.height;

const NotificationScreen = () => {

  const navigation = useNavigation()

  return (
    <ScrollView style={{width: windowWidth, height: windowHeight}}>
      <View style={{flex: 1, alignItems: "center", justifyContent: "center", marginTop: windowHeight / 2}}>
        <Text>There's no new notification right now</Text>
      </View>
    </ScrollView>
  )
}

export default NotificationScreen

const styles = StyleSheet.create({})