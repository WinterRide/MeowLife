import React, { useState, useEffect } from 'react';
import { Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

const UploadVaccine = ({ vaccine = {}, onVaccineChange, onRemove, canRemove, index }) => {
    const [vaccineName, setVaccineName] = useState(vaccine.name || '');
    const [vaccineImage, setVaccineImage] = useState(vaccine.image || null);

    useEffect(() => {
        onVaccineChange(vaccineName, vaccineImage);
    }, [vaccineName, vaccineImage]);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            quality: 1,
        });

        if (!result.cancelled) {
            const imageUri = result.assets[0].uri;
            setVaccineImage(imageUri);
        }
    };

    const handleVaccineNameChange = (name) => {
        setVaccineName(name);
    };

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ color: "gray" }}>{index + 1}</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter vaccine name"
                    value={vaccineName}
                    onChangeText={handleVaccineNameChange}
                />
                <View style={{ flex: 1, alignItems: "flex-end" }}>
                    {vaccineImage ? (
                        <View style={styles.imageContainer}>
                            <Image source={{ uri: vaccineImage }} style={styles.image} />
                            <Pressable style={styles.removeButton} onPress={() => setVaccineImage(null)}>
                                <Entypo name="cross" size={20} color="white" />
                            </Pressable>
                        </View>
                    ) : (
                        <Pressable style={styles.selectButton} onPress={pickImage}>
                            <FontAwesome name="camera" size={15} color="white" />
                        </Pressable>
                    )}
                </View>
                {canRemove && (
                    <Pressable style={styles.removeVaccineButton} onPress={onRemove}>
                        <Entypo name="cross" size={30} color="black" />
                    </Pressable>
                )}
            </View>
        </View>
    );
};

export default UploadVaccine;

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
        borderBottomWidth: 2,
        borderColor: "gray",
        paddingBottom: 5
    },
    input: {
        width: '60%',
        padding: 10,
    },
    selectButton: {
        borderRadius: 10,
        width: 50,
        height: 50,
        backgroundColor: 'gray',
        alignItems: 'center',
        justifyContent: 'center'
    },
    imageContainer: {
        position: 'relative',
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 10,
    },
    removeButton: {
        position: "absolute",
        top: 0,
        right: 0,
        marginTop: -5,
        marginRight: -5,
        backgroundColor: "red",
        borderRadius: 50
    },
    removeVaccineButton: {
        marginLeft: 10
    },
});
