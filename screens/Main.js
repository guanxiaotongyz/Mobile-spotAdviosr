import { View, Text } from 'react-native';
import { firestore } from '../firebase/firebase-setup';
import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { headerStyle, colors } from '../helper/helper';
import AddSpot from './AddSpot';
import FavoriteSpots from './FavoriteSpots';
import UserProfile from './UserProfile';
import AllSpots from './AllSpots';
import NearbySpots from './NearbySpots';
import { Entypo, Ionicons } from "@expo/vector-icons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";



const Tab = createBottomTabNavigator();

const Main = () => {
    // const [spots, setSpots] = useState()
    // const [review, setReview] = useState()

    // useEffect(() => {
    //     const q = query(collection(firestore, 'spots'));
    //     const unsubscribe = onSnapshot(q, (querySnapshot) => {
    //         if (querySnapshot.empty) {
    //             console.log('No matching documents.');
    //             return;
    //         }
    //         // fix this , User just has one document
    //         const spots = [];
    //         querySnapshot.forEach((doc) => {
    //             //doc.data() is never undefined for query doc snapshots
    //             //console.log(doc.id, " => ", doc.data());
    //             spots.push({ id: doc.id, ...doc.data() })
    //         });
    //         setSpots(spots);
    //     });

    //     return () => {
    //         unsubscribe();
    //     }
    // }, [])

    // // get subcollection review in spots  data from firestore
    // useEffect(() => {
    //     const q = query(collection(firestore, 'spots', 'NoMPkzQyyUI0iEXkfNDW', 'reviews'));
    //     const unsubscribe = onSnapshot(q, (querySnapshot) => {
    //         if (querySnapshot.empty) {
    //             console.log('No matching documents.');
    //             return;
    //         }
    //         // fix this , User just has one document
    //         const review = [];
    //         querySnapshot.forEach((doc) => {
    //             //doc.data() is never undefined for query doc snapshots

    //             review.push({ id: doc.id, ...doc.data() })
    //         });
    //         setReview(review);
    //     });

    //     return () => {
    //         unsubscribe();
    //     }
    // }, [])


    const screenOptions = {
        ...headerStyle,
        tabBarStyle: {
            backgroundColor: colors.WHITE,
        },
        tabBarActiveTintColor: colors.BLUE,
        tabBarInactiveTintColor: colors.DARK_GREY,
    };


    return (
        <Tab.Navigator screenOptions={screenOptions}>
            <Tab.Screen
                name="Home"
                component={AllSpots}
                options={{
                    headerTitle: "Spot Advisor",
                    tabBarIcon: ({ color, size }) => (
                        <Entypo
                            name="home"
                            color={color}
                            size={size}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Nearby"
                component={NearbySpots}
                options={{
                    headerTitle: "Nearby Spots",
                    tabBarIcon: ({ color, size }) => (
                        <Entypo
                            name="location"
                            color={color}
                            size={size}
                        />
                    ),
                }}
            />

            <Tab.Screen
                name="AddSpot"
                component={AddSpot}
                options={{
                    headerTitle: "Add Spot",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons
                            name="add-circle-outline" //todo
                            color={color}
                            size={size}
                        />
                    ),
                }}
            />

            <Tab.Screen
                name="Favorite"
                component={FavoriteSpots}
                options={{
                    headerTitle: "Favorite",
                    tabBarIcon: ({ color, size }) => (
                        <Entypo
                            name="heart-outlined" //todo
                            color={color}
                            size={size}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={UserProfile}
                options={{
                    headerTitle: "Profile",
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons
                            name="account-circle"
                            color={color}
                            size={size}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    )
}

export default Main