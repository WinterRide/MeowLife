// components/Sidebar.js
import {
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import React from 'react';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { auth } from '../firebase';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../UserContext';

const Sidebar = ({ modalVisible, setModalVisible }) => {
  if (!modalVisible) {
    return null;
  }

  const navigation = useNavigation();
  const { userInfo } = useUser();

  const window = Dimensions.get('window');
  const windowWidth = window.width;
  const windowHeight = window.height;

  return (
    <View
      style={{
        position: 'absolute',
        zIndex: 9999,
        width: windowWidth,
        height: windowHeight,
        backgroundColor: 'transparent',
      }}
    >
      <View
        style={{
          position: 'absolute',
          height: windowHeight,
          width: windowWidth / 1.5,
          backgroundColor: 'white',
          right: 0,
        }}
      >
        <View
          style={{
            height: windowHeight / 6,
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
        >
          <Pressable
            onPress={() => setModalVisible(false)}
            style={{ paddingRight: 22 }}
          >
            <Ionicons name="close-outline" size={40} color="black" />
          </Pressable>
        </View>
        <View
          style={{
            width: windowWidth / 1.5,
            height: windowHeight / 5,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Text style={{ fontSize: 30 }}>{userInfo.nickname}</Text>
          <Pressable
            onPress={() => {
              navigation.navigate('EditProfile', { userInfo });
              setModalVisible(false);
            }}
          >
            <Text style={{ fontSize: 15, textDecorationLine: 'underline' }}>
              Edit Profile
            </Text>
          </Pressable>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'top',
            alignItems: 'center',
            marginTop: 75,
          }}
        >
          <Pressable
            onPress={() => {
              navigation.navigate('Home');
              setModalVisible(false);
            }}
            style={{
              width: windowWidth / 2,
              height: windowHeight / 13,
              justifyContent: 'center',
              alignItems: 'center',
              borderTopColor: '#A9A9A9',
              borderTopWidth: 3,
              borderBottomColor: '#A9A9A9',
              borderBottomWidth: 3,
            }}
          >
            <Text style={{ fontSize: 15 }}>Home</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              navigation.navigate('Market');
              setModalVisible(false);
            }}
            style={{
              width: windowWidth / 2,
              height: windowHeight / 13,
              justifyContent: 'center',
              alignItems: 'center',
              borderBottomColor: '#A9A9A9',
              borderBottomWidth: 3,
            }}
          >
            <Text style={{ fontSize: 15 }}>Market</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              navigation.navigate('Listing');
              setModalVisible(false);
            }}
            style={{
              width: windowWidth / 2,
              height: windowHeight / 13,
              justifyContent: 'center',
              alignItems: 'center',
              borderBottomColor: '#A9A9A9',
              borderBottomWidth: 3,
            }}
          >
            <Text style={{ fontSize: 15 }}>Listing</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              navigation.navigate('Order');
              setModalVisible(false);
            }}
            style={{
              width: windowWidth / 2,
              height: windowHeight / 13,
              justifyContent: 'center',
              alignItems: 'center',
              borderBottomColor: '#A9A9A9',
              borderBottomWidth: 3,
            }}
          >
            <Text style={{ fontSize: 15 }}>Your Order</Text>
          </Pressable>
          <Pressable
            style={{
              width: windowWidth / 2,
              height: windowHeight / 13,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
            }}
            onPress={() => {
              auth.signOut();
            }}
          >
            <MaterialIcons name="logout" size={15} color="#F15025" />
            <Text style={{ fontSize: 15, marginLeft: 10, color: '#F15025' }}>
              Logout
            </Text>
          </Pressable>
        </View>
      </View>
      <Pressable
        onPress={() => {
          setModalVisible(false);
        }}
        style={{
          position: 'absolute',
          height: windowHeight,
          width: windowWidth / 3,
          backgroundColor: 'black',
          left: 0,
          opacity: 0.5,
        }}
      />
    </View>
  );
};

export default Sidebar;

const styles = StyleSheet.create({});
