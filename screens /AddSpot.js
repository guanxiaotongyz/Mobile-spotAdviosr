import { View, Text, TextInput, StyleSheet, Alert, ScrollView } from "react-native";
import React, { useState } from "react";
import { colors } from "../helper/helper";
import { useNavigation } from "@react-navigation/native";
import { addSpot } from "../firebase/firestore";


const AddSpot = () => {
    //   const [name, setName] = useState("");
    //   const [description, setDescription] = useState("");
    //   const [isFavortite, setIsFavorite] = useState(false);
    //   const invalidInput = () => {
    //     Alert.alert("Invalid Input", "Please check you input");
    //   }
    //   const isValid = (string) => {
    //     if (typeof string != "string") {
    //       return false;
    //     }
    //     return true;
    //   }
    //   const navigation = useNavigation();

    //   return (
    //     <ScrollView
    //       contentContainerStyle={{ flexGrow: 1 }}
    //       keyboardShouldPersistTaps="handled">

    //       <View style={styles.container}>
    //         <View>
    //           <Text style={styles.text}>Name</Text>
    //           <TextInput
    //             value={name}
    //             style={styles.input}
    //             onChangeText={(text) => {
    //               setName(text);
    //             }}
    //           />

    //         </View>

    //         <View>
    //           <Text style={styles.text}>Description</Text>
    //           <TextInput
    //             value={description}
    //             style={[styles.input, styles.text1]}
    //             onChangeText={setDescription}
    //             multiline={true}
    //             numberOfLines={3}
    //           />
    //         </View>

    //         <View style={styles.buttons}>
    //           <MyButton text="Reset" onPress={() => {
    //             setCalories("");
    //             setDescription("");
    //           }} />
    //           <MyButton text="Submit" onPress={() => {
    //             if (!isValid(calories) || !description) {
    //               return invalidInput();
    //             }
    //             addSpot({ name, description, isFavortite }).then(() => {
    //               navigation.goBack();
    //             });

    //           }} />

    //         </View>

    //       </View>
    //     </ScrollView>

    //   );
    return (
        <Text>AddSpot</Text>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        paddingTop: 70,
        backgroundColor: colors.WHITE,
    },
    text: {
        fontSize: 15,
    },
    input: {
        marginTop: 8,
        height: 50,
        width: 350,
        backgroundColor: colors.WHITE,
        borderRadius: 5,
        padding: 10,
        borderColor: colors.PURPLE,
        borderWidth: 1,
    },
    button: {
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 10,
    },
    buttons: {
        flexDirection: "row",
        marginTop: 30,
        margin: 20
    },
    text1: {
        height: 120,
        textAlignVertical: "top",
    },

});

export default AddSpot;
