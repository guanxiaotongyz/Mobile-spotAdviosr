import { View, Text } from 'react-native';
import { collection, doc, getDocs, getDoc, onSnapshot, QuerySnapshot, query, where } from 'firebase/firestore';
import { firestore } from '../firebase/firebase-setup';
import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { headerStyle } from '../helper/helper';



const Tab = createBottomTabNavigator();
const Home = () => {
    // test read spots data from firestore
    const [spots, setSpots] = useState()
    const [review, setReview] = useState()

    useEffect(() => {
        const q = query(collection(firestore, 'spots'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            if (querySnapshot.empty) {
                console.log('No matching documents.');
                return;
            }
            // fix this , User just has one document
            const spots = [];
            querySnapshot.forEach((doc) => {
                //doc.data() is never undefined for query doc snapshots
                //console.log(doc.id, " => ", doc.data());
                spots.push({ id: doc.id, ...doc.data() })
            });
            setSpots(spots);
        });

        return () => {
            unsubscribe();
        }
    }, [])

    // get subcollection review in spots  data from firestore
    useEffect(() => {
        const q = query(collection(firestore, 'spots', 'NoMPkzQyyUI0iEXkfNDW', 'reviews'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            if (querySnapshot.empty) {
                console.log('No matching documents.');
                return;
            }
            // fix this , User just has one document
            const review = [];
            querySnapshot.forEach((doc) => {
                //doc.data() is never undefined for query doc snapshots

                review.push({ id: doc.id, ...doc.data() })
            });
            setReview(review);
        });

        return () => {
            unsubscribe();
        }
    }, [])


    const screenOptions = {
        ...headerStyle,
        tabBarStyle: {
            backgroundColor: colors.PURPLE,
        },
        tabBarActiveTintColor: colors.WHITE,
        tabBarInactiveTintColor: colors.ORANGE,
    };


    return (
        <Tab.Navigator screenOptions={screenOptions}>
            <Tab.Screen
                name="AllSpots"
                component={AllSpots}
                options={{
                    headerTitle: "Spot Advisor",
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons
                            name="bread-slice" //todo
                            color={color}
                            size={size}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="NearbySpot"
                component={NearbySpots}
                options={{
                    headerTitle: "Nearby Spots",
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons
                            name="bread-slice" //todo
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
                        <MaterialCommunityIcons
                            name="bread-slice" //todo
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
                        <MaterialCommunityIcons
                            name="bread-slice" //todo
                            color={color}
                            size={size}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    headerTitle: "Profile",
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons
                            name="bread-slice" //todo
                            color={color}
                            size={size}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    )
}

export default Home