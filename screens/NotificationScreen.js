import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


const NotificationScreen = () => {

  const navigation = useNavigation()

  return (
    <View>
        <Text>There's no new notification right now</Text>
    </View>
  )
}

export default NotificationScreen

const styles = StyleSheet.create({})