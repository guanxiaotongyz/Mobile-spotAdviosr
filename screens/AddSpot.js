import { View, Text, TextInput, Button, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { addSpotFunction } from "../firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../helper/helper";
import { MyButton } from "../components/MyButton";
import NotificationManger from "../components/NotificationManger";
import { verifyPermissions } from "../components/NotificationManger";
import { scheduleNotificationHandler } from "../components/NotificationManger";

const AddSpot = ({ props }) => {
    const [description, setDescription] = React.useState("");
    const [name, setName] = React.useState("");
    const [city, setCity] = React.useState("");

    const navigation = useNavigation();

    const submitFunction = () => {
        addSpotFunction({ description, name, city });
        setName("");
        setCity("");
        setDescription("");
        scheduleNotificationHandler();
        navigation.goBack();
    };

    const reset = () => {
        setName("");
        setCity("");
        setDescription("");
    };

    return (
        <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled">

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

                <View style={styles.buttons}>
                    <MyButton text="Reset" onPress={reset} />
                    <MyButton text="Submit" onPress={submitFunction} />
                    {/* <NotificationManger /> */}

                </View>

            </View>




        </ScrollView>
    );
};

export default AddSpot;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        paddingTop: 30,
        backgroundColor: colors.WHITE
    },
    title: {
        fontSize: 15,
        marginTop: 10
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
        marginTop: 30,
        margin: 20
    },
    text1: {
        height: 90,
        textAlignVertical: "top",
    }
})