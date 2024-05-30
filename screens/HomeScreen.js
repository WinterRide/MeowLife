import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, Pressable, Text, StyleSheet, Dimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { BottomTabs } from '../StackNavigator';

const HomeScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();

    const window = Dimensions.get('window');
    const windowWidth = window.width;
    const windowHeight = window.height;

    return (
    <View>
        <Header />
        <Text>Home Screen</Text>
    </View>
    )
}

export default HomeScreen;

const styles = StyleSheet.create({});
