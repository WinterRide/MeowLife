import { Dimensions, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useLayoutEffect } from 'react';
import BottomTabs from '../components/BottomTabs';
import { useNavigation, useRoute } from '@react-navigation/native';
import Caraousel from '../components/Caraousel';
import { Ionicons } from '@expo/vector-icons';
import LevelIndicator from '../components/LevelIndicator';

const ItemInfoScreen = () => {
    const window = Dimensions.get('window');
    const windowWidth = window.width;
    const windowHeight = window.height;

    const route = useRoute();
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTitleStyle: {
                fontSize: 20,
                fontWeight: "bold",
                color: "white",
            },
            headerStyle: {
                height: 110,
                borderBottomColor: "transparent",
                shadowColor: "transparent",
            },
            headerLeft: () => (
                <Pressable onPress={() => navigation.goBack()} style={{ padding: 10 }}>
                    <Ionicons name="arrow-back" size={30} color="black" />
                </Pressable>
            )
        });
    }, [navigation]);

    const formattedPrice = route.params.price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });


    return (
        <View style={{ flex: 1, width: windowWidth, height: windowHeight, backgroundColor: "white" }}>
            <ScrollView style={{ width: windowWidth, height: windowHeight }}>
                <Caraousel photos={route.params.photos}/>

                <View style={{flex: 1, marginHorizontal: 20, marginTop: 20, borderBottomWidth: 2}}>
                    <Text style={{fontSize: 30, fontWeight: "bold"}}>{route.params.species}</Text>
                    <Text style={{fontSize: 12}}>{route.params.age} years old</Text>
                    <Text style={{fontSize: 15, marginTop: 25, marginBottom: 10}}>Owner : {route.params.owner}</Text>

                    <View style={{position: "absolute", right: 0, bottom: 0, flex: 1, alignItems: "center", marginBottom: 10}}>
                        <Pressable style={{justifyContent: "center", alignItems: "center", backgroundColor: "gray", flexDirection: "row", borderRadius: 20, padding: 5, paddingLeft: 20, paddingRight: 20}}>
                            <Ionicons name="add" size={25} color="white" />
                            <Text style={{fontSize: 15, color: "white"}}>Request Order</Text>
                        </Pressable>
                        <Text style={{fontSize: 15, paddingTop: 10}}>{formattedPrice}</Text>
                    </View>
                </View>

                <View style={{flex: 1, marginHorizontal: 20, marginTop: 20, borderBottomWidth: 2, paddingBottom: 20}}>
                    <LevelIndicator level={route.params.level}/>
                </View>

                <View style={{flex: 1, marginHorizontal: 20, marginTop: 20, borderBottomWidth: 2, paddingBottom: 20}}>
                    <Text style={{color: "gray", marginBottom: 10}}>Vaccine List :</Text>
                    {route.params.vaccine.map((val, index)=> (
                        <Text key={index} style={{color: "gray"}}>{index + 1}. {val.name}</Text>
                    ))}
                </View>

                <View style={{flex: 1, marginHorizontal: 20, marginTop: 20, paddingBottom: 20}}>
                    <Text style={{color: "gray", marginBottom: 10}}>Description :</Text>
                    <Text style={{flex: 1, color: "gray", marginBottom: 70}}>{route.params.description}</Text>
                </View>
            </ScrollView>
            <BottomTabs />
        </View>
    );
};

export default ItemInfoScreen;

const styles = StyleSheet.create({});
