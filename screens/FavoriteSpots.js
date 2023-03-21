import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import { useState, useEffect } from "react";
import { firestore as db } from '../firebase/firebase-setup'
import { collection, onSnapshot, query, where } from "firebase/firestore"
import { FlatList } from 'react-native';
import { StyleSheet } from 'react-native';
// import { form } from '../constants/Style';
// import Row from '../components/UI/Row';
// import RecipeButton from '../components/UI/RecipeButton';
// import Colors from '../constants/Colors';
// import RecipeImage from '../components/UI/RecipeImage';
// import { AntDesign } from '@expo/vector-icons';
// import { auth } from '../firebase/firebase-setup';
import NoRecipePage from '../components/NoSpotPage';
import { colors } from '../helper/helper';

export default function FavoriteSpots({ navigation }) {
    const [spots, setSpots] = useState([]);
    const [favoriteSpots, setFavoriteSpots] = useState([]);


    return (
        <View>
            {spots.length == 0 ? (
                <>
                    <Text>test</Text>
                </>
            ) : (<FlatList
                data={spots}
                numColumns={2}
                keyExtractor={item => item.key}
                renderItem={({ item }) => (
                    <SpotButton
                        style={styles.wholeContainer}
                        android_ripple={{ color: colors.LIGHT_BLUE, foreground: true }}
                        onPress={() => navigation.navigate("SpotDetails", { item })}
                    >

                        <View style={styles.imageContainer}>
                            <SpotImage uri={item} style={form} /> //todo
                        </View>
                        <View>
                            <Row>
                                <Text numberOfLines={1} style={styles.titleText}>{item.title}</Text>
                                <Entypo name="heart" size={18} color={colors.RED} />
                            </Row>
                        </View>
                    </SpotButton>

                )}
            />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    wholeContainer: {
        flex: 1,
        height: 230,
        borderRadius: 5,
        marginTop: 4,
        marginRight: 6,
    },
    image: {
        width: Dimensions.get('window').width,
    },
    titleText: {
        marginLeft: 12,
        width: 140,
        fontWeight: 'bold',
        marginRight: 11,
    },
    imageContainer: {
        width: Dimensions.get('window').width * 0.7,
        height: Dimensions.get('window').width * 0.7,
        borderRadius: Dimensions.get('window').width * 0.7 / 2,
        borderWidth: 2,
        // borderColor: Colors.BgDarkGreen,
        overflow: "hidden",
        marginVertical: Dimensions.get('window').height / 30,
        alignSelf: 'center'

    },
    image: {
        width: "100%",
        height: "100%"
    },
    text: {
        fontSize: 16,
        alignSelf: 'center',
        margin: 5
    }
})