import { Dimensions, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BottomTabBar, createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import { AntDesign, Entypo, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import SearchScreen from './screens/SearchScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import NotificationScreen from './screens/NotificationScreen';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import ListingScreen from './screens/ListingScreen';
import MarketScreen from './screens/MarketScreen';
import OrderScreen from './screens/OrderScreen';
import EditProfileScreen from './screens/EditProfileScreen';
import ItemInfoScreen from './screens/ItemInfoScreen';
import CatListingScreen from './screens/CatListingScreen';

const StackNavigator = () => {
    const Tab = createBottomTabNavigator();
    const Stack = createNativeStackNavigator();

    const window = Dimensions.get('window');
    const windowWidth = window.width;
    const windowHeight = window.height;

    const [user, setUser] = useState(null);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setUser(user);
        });
    }, [])

    function BottomTabs() {
        return (
            <Tab.Navigator screenOptions={{
                tabBarStyle: { height: windowHeight / 15 },
            }}>
                <Tab.Screen name="Home"
                    component={HomeScreen}
                    options={{
                        tabBarLabel: "Home",
                        headerShown: false,
                        tabBarIcon: ({ focused }) => focused ? (
                            <Entypo name="home" size={windowHeight / 30} color="#F15025" />
                        ) : (
                            <AntDesign name="home" size={windowHeight / 30} color="black" />
                        )
                    }}
                />
                <Tab.Screen name="Market"
                    component={MarketScreen}
                    options={{
                        tabBarLabel: "Market",
                        headerShown: false,
                        tabBarIcon: ({ focused }) => focused ? (
                            <Entypo name="shopping-bag" size={windowHeight / 30} color="#F15025" />
                        ) : (
                            <Entypo name="shopping-bag" size={windowHeight / 30} color="black" />
                        )
                    }}
                />
                <Tab.Screen name="Listing"
                    component={ListingScreen}
                    options={{
                        tabBarLabel: "Listing",
                        headerShown: false,
                        tabBarIcon: ({ focused }) => focused ? (
                            <Ionicons name="add-circle" size={windowHeight / 30} color="#F15025" />
                        ) : (
                            <Ionicons name="add" size={windowHeight / 30} color="black" />
                        )
                    }}
                />
                <Tab.Screen name="Your Order"
                    component={OrderScreen}
                    options={{
                        tabBarLabel: "Your Order",
                        headerShown: false,
                        tabBarIcon: ({ focused }) => focused ? (
                            <Ionicons name="receipt" size={windowHeight / 30} color="#F15025" />
                        ) : (
                            <Ionicons name="receipt-outline" size={windowHeight / 30} color="black" />
                        )
                    }}
                />
            </Tab.Navigator>
        )
    }

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {user ? (
                    <>
                        <Stack.Screen name="Main" component={BottomTabs} options={{ headerShown: false }} />
                        <Stack.Screen name="Notification" component={NotificationScreen} />
                        <Stack.Screen name="Search" component={SearchScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="Listing" component={ListingScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="Market" component={MarketScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="Order" component={OrderScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
                        <Stack.Screen name="ItemInfo" component={ItemInfoScreen} />
                        <Stack.Screen name="Cat Listing" component={CatListingScreen} />
                    </>
                ) : (
                    <>
                        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default StackNavigator

const styles = StyleSheet.create({})
