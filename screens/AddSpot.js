import {
    Modal,
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    ScrollView,
    Image,
    Alert,
} from "react-native";
import React from "react";
import { addSpotFunction } from "../firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../helper/helper";
import { MyButton } from "../components/MyButton";
import { scheduleNotificationHandler } from "../components/NotificationManger";
import PressableButton from "../components/PressableButton";
import ImageManager from "../components/ImageManager";
import { ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../firebase/firebase-setup";
import GalleryPicker from "../components/GalleryPicker";

const AddSpot = ({ props }) => {
    const [description, setDescription] = React.useState("");
    const [name, setName] = React.useState("");
    const [city, setCity] = React.useState("");
    const [imageUri, setImageUri] = React.useState("");

    const imageUriHandler = (uri) => {
        setImageUri(uri);
    };

    const navigation = useNavigation();

    async function fetchImageData(uri) {
        console.log(uri); //local uri on the device
        const response = await fetch(uri);
        const imageBlob = await response.blob(); //image data
        const imageName = uri.substring(uri.lastIndexOf("/") + 1);
        const imageRef = await ref(storage, `images/${imageName}`);
        const uploadResult = await uploadBytesResumable(imageRef, imageBlob);
        return uploadResult.metadata.fullPath; //path to the image on the storage
    }

    async function uploadEnter(description, name, city, imageUri) {
        if (!description || !name || !city) {
            Alert.alert("Invalid Input", "Please check you input");
            return;
        }
        let imageUriRef;
        if (imageUri) {
            imageUriRef = await fetchImageData(imageUri);
        }
        addSpotFunction({ description, name, city, imageUriRef });
        setName("");
        setCity("");
        setDescription("");
        scheduleNotificationHandler();
        setImageUri("");
        navigation.navigate("Home");
    }



    const reset = () => {
        setName("");
        setCity("");
        setDescription("");
        setImageUri("");
    };

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.title}></Text>
                <TextInput
                    placeholder="Add the spot name"
                    style={styles.input}
                    value={name}
                    onChangeText={(newtext) => {
                        setName(newtext);
                    }}
                />
            </View>

            <Text style={styles.title}></Text>
            <TextInput
                placeholder="Add the city name"
                style={styles.input}
                value={city}
                onChangeText={(newtext) => {
                    setCity(newtext);
                }}
            />

            <Text style={styles.title}></Text>
            <TextInput
                placeholder="Add description"
                numberOfLines={3}
                style={[styles.input, styles.text1]}
                value={description}
                onChangeText={(newtext) => {
                    setDescription(newtext);
                }}
            />

            <View>
                {imageUri && (
                    <Image
                        source={{
                            uri: imageUri,
                        }}
                        style={{ height: 100, width: 100, marginTop: 20 }}
                        
                    />
                )}
            </View>

            <View style={styles.allButtons}>
                <View style={styles.buttons}>
                    <ImageManager imageUriHandler={imageUriHandler} />
                    <GalleryPicker imageUriHandler={imageUriHandler} />
                </View>

                <View style={styles.buttons}>
                    <PressableButton pressHandler={reset} style={styles.button}>
                        <Text style={{fontWeight: "bold"}}>Reset</Text>
                    </PressableButton>
                    <PressableButton 
                        pressHandler={() => {
                        uploadEnter(description, name, city, imageUri);
                    }}  
                        style={styles.button}
                    >
                        <Text style={{fontWeight: "bold"}}>Submit</Text>
                    </PressableButton>
                </View>
            </View>
        </View>
    );
};

export default AddSpot;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        paddingTop: 30,
        backgroundColor: colors.WHITE,
    },
    title: {
        fontSize: 15,
        marginTop: 10,
    },
    input: {
        marginTop: 8,
        height: 50,
        width: 350,
        backgroundColor: colors.WHITE,
        borderRadius: 5,
        padding: 10,
        borderColor: colors.BLACK,
        borderWidth: 1,
    },
    buttons: {
        flexDirection: "row",
        marginTop: 10,
        alignItems: "center",
    },
    text1: {
        height: 90,
        textAlignVertical: "top",
    },
    button: {
        padding: 12,
        height: 55,
        width: 120,
        borderRadius: 10,
        margin: 12,
        backgroundColor: colors.LIME_GREEN,
        alignSelf: "flex-start",
        alignItems: "center",
        justifyContent: "center",
    },
    allButtons: {
        alignItems: "center",
    },
});