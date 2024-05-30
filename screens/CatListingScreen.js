import { Dimensions, Pressable, ScrollView, StyleSheet, Text, TextInput, View, Alert } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import RNPickerSelect from 'react-native-picker-select';
import { FontAwesome6 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Tooltip } from 'react-native-elements';
import { Feather } from '@expo/vector-icons';
import CatLevelInfo from '../components/CatLevelInfo';
import UploadMedia from '../components/UploadMedia';
import UploadVaccine from '../components/UploadVaccine';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid'; // Install this using npm or yarn
import { storage, firestore, firebase } from '../firebase'; // Adjust according to your Firebase setup
import { uploadBytes, ref, getDownloadURL } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';
import * as FileSystem from "expo-file-system"

const CatListingScreen = () => {
    const window = Dimensions.get('window');
    const windowWidth = window.width;
    const windowHeight = window.height;

    const [species, setSpecies] = useState("");
    const [breed, setBreed] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [affection, setAffection] = useState(1);
    const [playfulness, setPlayfulness] = useState(1);
    const [kidFriendly, setKidFriendly] = useState(1);
    const [energy, setEnergy] = useState(1);

    const [uploading, setUploading] = useState(false)

    const breedList = [
        "American breed", "European breed", "Eastern breed", "Other breed"
    ];

    const handlePriceChange = (text) => {
        const numericText = text.replace(/[^0-9]/g, '');
        setPrice(numericText);
    };

    const onPressUp = (level, setLevel) => {
        if (level < 5) {
            setLevel(level + 1);
        }
    };

    const onPressDown = (level, setLevel) => {
        if (level > 1) {
            setLevel(level - 1);
        }
    };

    const levelInput = (level, setLevel) => {
        return (
            <View style={{ flex: 1, alignItems: "flex-end" }}>
                <View style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 10 }}>
                    <Pressable style={{ height: 25, width: 25, backgroundColor: "#F15025", alignItems: "center", justifyContent: "center", borderRadius: 30 }} onPress={() => { onPressDown(level, setLevel) }}>
                        <Entypo name="minus" size={15} color="white" />
                    </Pressable>
                    <Text>{level}</Text>
                    <Pressable style={{ height: 25, width: 25, backgroundColor: "#F15025", alignItems: "center", justifyContent: "center", borderRadius: 30 }} onPress={() => { onPressUp(level, setLevel) }}>
                        <FontAwesome6 name="add" size={15} color="white" />
                    </Pressable>
                </View>
            </View>
        );
    };

    const [images, setImages] = useState([]);

    const handleImagesChange = (newImages) => {
        setImages(newImages);
    };

    const [vaccines, setVaccines] = useState([{ name: '', image: null }]);

    const handleVaccineChange = (index, name, imageUri) => {
        const updatedVaccines = vaccines.map((vaccine, i) => (
            i === index ? { name, image: imageUri } : vaccine
        ));
        setVaccines(updatedVaccines);
    };

    const addVaccine = () => {
        setVaccines([...vaccines, { name: '', image: null }]);
    };

    const removeVaccine = (index) => {
        if (vaccines.length > 1) {
            setVaccines(vaccines.filter((_, i) => i !== index));
        }
    };

    const uploadImages = async (imageUris) => {
        setUploading(true);
        const imageUrls = [];
    
        try {
            for (const image of imageUris) {
                const { uri } = await FileSystem.getInfoAsync(image);
                const blob = await new Promise((resolve, reject) => {
                    const xhr = new XMLHttpRequest();
                    xhr.onload = () => {
                        resolve(xhr.response);
                    };
                    xhr.onerror = (e) => {
                        reject(new TypeError("Network request failed"));
                    };
                    xhr.responseType = 'blob';
                    xhr.open('GET', uri, true);
                    xhr.send(null);
                });
    
                const fileName = image.substring(image.lastIndexOf('/') + 1);
                const fileRef = ref(storage, `product/${fileName}`); // Adjusted to use imported storage
    
                await uploadBytes(fileRef, blob);
    
                // Get the download URL
                const downloadURL = await getDownloadURL(fileRef);
                imageUrls.push(downloadURL);
            }
    
            setUploading(false);
            setImages([]); // Clear the images after upload
    
            return imageUrls;
    
        } catch (error) {
            console.error(error);
            setUploading(false);
            return [];
        }
    };
    
    const uploadVaccines = async (vaccineList) => {
        setUploading(true);
        const imageUrls = [];
    
        try {
            for (const vaccine of vaccineList) {
                const { image, name } = vaccine
                if (!image) continue; // Skip if there is no image
    
                const { uri } = await FileSystem.getInfoAsync(image);
                const blob = await new Promise((resolve, reject) => {
                    const xhr = new XMLHttpRequest();
                    xhr.onload = () => {
                        resolve(xhr.response);
                    };
                    xhr.onerror = (e) => {
                        reject(new TypeError("Network request failed"));
                    };
                    xhr.responseType = 'blob';
                    xhr.open('GET', uri, true);
                    xhr.send(null);
                });
    
                const fileName = image.substring(image.lastIndexOf('/') + 1);
                const fileRef = ref(storage, `vaccines/${fileName}`); // Adjusted to use imported storage
    
                await uploadBytes(fileRef, blob);
    
                // Get the download URL
                const downloadURL = await getDownloadURL(fileRef);
                imageUrls.push({name, images: downloadURL});
            }
    
            setUploading(false);
            return imageUrls;
    
        } catch (error) {
            console.error(error);
            setUploading(false);
            return [];
        }
    };

    const handleUpload = async () => {
        try {
            const imageUrls = await uploadImages(images);
            const updatedVaccines = await uploadVaccines(vaccines);
            await addDoc(collection(firestore, 'catListings'), {
                species,
                breed,
                price: Number(price),
                description,
                level: [
                    { affection },
                    { playfulness },
                    { kidFriendly },
                    { energy }
                ],
                images: imageUrls,
                vaccines: updatedVaccines,
            });
            alert('Cat listing requested successfully!');
        } catch (error) {
            console.error('Error uploading cat listing:', error);
            alert('Error uploading cat listing. Please try again.');
        }
    };

    const image = images[0]

    console.log(vaccines)


    const uploadMedia = async () => {
        setUploading(true);
    
        try {
            const { uri } = await FileSystem.getInfoAsync(image);
            const blob = await new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.onload = () => {
                    resolve(xhr.response);
                };
                xhr.onerror = (e) => {
                    reject(new TypeError("Network request failed"));
                };
                xhr.responseType = 'blob';
                xhr.open('GET', uri, true);
                xhr.send(null);
            });
    
            const fileName = image.substring(image.lastIndexOf('/') + 1);
            const ref = firebase.storage().ref().child(`product/${fileName}`);
    
            await ref.put(blob);
    
            // Get the download URL
            const downloadURL = await ref.getDownloadURL();
    
            setUploading(false);
            Alert.alert('Photo uploaded!!', `Download URL: ${downloadURL}`);
            console.log(downloadURL)
            setImage(null);
    
            // Optionally, you can return the download URL or use it as needed
           
    
        } catch (error) {
            console.error(error);
            setUploading(false);
        }
    };
    
    

    return (
        <View style={{ width: windowWidth, height: windowHeight, alignItems: "center", justifyContent: "center" }}>
            <ScrollView style={{ width: windowWidth, height: windowHeight }}>
                <View style={{ flex: 1, width: "80%", backgroundColor: "white", marginTop: 40, padding: 20, borderRadius: 10, gap: 20, alignSelf: "center" }}>
                    <View style={{ flex: 1, justifyContent: "center", borderBottomWidth: 2, borderColor: "gray" }}>
                        <Text style={{ fontSize: 18, color: "#F15025", fontWeight: "bold", marginBottom: 20 }}>Cat Species</Text>
                        <TextInput value={species}
                            onChangeText={(text) => { setSpecies(text) }}
                            placeholder="Enter your cat species"
                            style={{ paddingBottom: 5, fontSize: species ? 18 : 18 }}
                        />
                    </View>

                    <View style={{ flex: 1, justifyContent: "center", borderBottomWidth: 2, borderColor: "gray", paddingBottom: 5 }}>
                        <Text style={{ fontSize: 18, color: "#F15025", fontWeight: "bold", marginBottom: 20 }}>Cat Breeds</Text>
                        <View style={{ width: "75%", height: "50%", borderWidth: 1, borderRadius: 10 }}>
                            <RNPickerSelect
                                onValueChange={(value) => setBreed(value)}
                                items={breedList.map(breed => ({ label: breed, value: breed }))}
                                placeholder={{ label: 'Choose', value: null }}
                            />
                        </View>
                    </View>

                    <View style={{ flex: 1, justifyContent: "center", borderBottomWidth: 2, borderColor: "gray", paddingBottom: 5 }}>
                        <Text style={{ fontSize: 18, color: "#F15025", fontWeight: "bold", marginBottom: 20 }}>Cat Photo (max : 10)</Text>
                        <View>
                            <UploadMedia onImagesChange={handleImagesChange} />
                        </View>
                    </View>

                    <View style={{ flex: 1, justifyContent: "center", paddingBottom: 5 }}>
                        <Text style={{ fontSize: 18, color: "#F15025", fontWeight: "bold", marginBottom: 20 }}>Vaccine List</Text>
                        <View>
                            {vaccines.map((vaccine, index) => (
                                <UploadVaccine
                                    key={index}
                                    vaccine={vaccine}
                                    onVaccineChange={(name, imageUri) => handleVaccineChange(index, name, imageUri)}
                                    onRemove={() => removeVaccine(index)}
                                    canRemove={vaccines.length > 1}
                                    index={index}
                                />
                            ))}
                            <Pressable style={{ flexDirection: "row", alignItems: "center", gap: 10 }} onPress={addVaccine}>
                                <View style={{ width: 40, height: 40, backgroundColor: "gray", borderRadius: 10, alignItems: "center", justifyContent: "center" }}>
                                    <FontAwesome6 name="add" size={15} color="white" />
                                </View>
                                <Text style={styles.addButtonText}>Add Another Vaccine</Text>
                            </Pressable>
                        </View>
                    </View>

                    <View style={{ flex: 1, justifyContent: "center", borderBottomWidth: 2, borderColor: "gray", paddingBottom: 5 }}>
                        <View style={{ flexDirection: "row", gap: 10 }}>
                            <Text style={{ fontSize: 18, color: "#F15025", fontWeight: "bold", marginBottom: 20 }}>Cat Level</Text>
                            <CatLevelInfo />
                        </View>

                        <View style={{ flex: 1, alignItems: "center", gap: 10 }}>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={{ fontSize: 15 }}>Affection Level</Text>
                                {levelInput(affection, setAffection)}
                            </View>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={{ fontSize: 15 }}>Playfulness Level</Text>
                                {levelInput(playfulness, setPlayfulness)}
                            </View>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={{ fontSize: 15 }}>Kid-Friendly Level</Text>
                                {levelInput(kidFriendly, setKidFriendly)}
                            </View>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={{ fontSize: 15 }}>Energy Level</Text>
                                {levelInput(energy, setEnergy)}
                            </View>
                        </View>
                    </View>

                    <View style={{ flex: 1, justifyContent: "center", borderBottomWidth: 2, borderColor: "gray" }}>
                        <Text style={{ fontSize: 18, color: "#F15025", fontWeight: "bold", marginBottom: 20 }}>Cat Price (IDR)</Text>
                        <TextInput value={price}
                            onChangeText={handlePriceChange}
                            keyboardType="numeric"
                            placeholder="Enter your cat price"
                            style={{ paddingBottom: 5, fontSize: species ? 18 : 18 }}
                        />
                    </View>

                    <View style={{ flex: 1, justifyContent: "center", borderBottomWidth: 2, borderColor: "gray", paddingBottom: 5 }}>
                        <Text style={{ fontSize: 18, color: "#F15025", fontWeight: "bold", marginBottom: 20 }}>Description</Text>
                        <TextInput value={description}
                            onChangeText={(text) => { setDescription(text) }}
                            placeholder="Enter description"
                            style={{ paddingBottom: 5, fontSize: species ? 18 : 18 }}
                        />
                    </View>

                    <View style={{ flex: 1, height: windowHeight / 5 }}>
                        <Pressable onPress={handleUpload}
                            style={{ top: 0, backgroundColor: "#F15025", alignItems: "center", justifyContent: "center", borderRadius: 10, padding: 10 }}>
                            <Text style={{ fontWeight: "bold", color: "white", fontSize: 15 }}>Request Cat Listing</Text>
                        </Pressable>
                    </View>

                </View>
            </ScrollView>
        </View>
    );
};

export default CatListingScreen;

const styles = StyleSheet.create({});
