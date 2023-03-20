import { View, Text, FlatList, StyleSheet, Pressable } from "react-native"
import React from "react"
import { useNavigation } from "@react-navigation/native"
import { colors, pressedStyle } from "../helper/helper";
import { Entypo } from "@expo/vector-icons";

export function SpotList({ spots, isFavortite }) {
    const navigation = useNavigation()

    return (
        <View style={styles.containerList}>
            <View style={styles.list}>
                <FlatList
                    data={isFavortite ? spots.filter((item) => item.isFavortite) : spots}
                    renderItem={({ item }) => (
                        <Pressable
                            onPress={() =>
                                navigation.navigate("SpotDetails", {
                                    id: item.id,
                                    calories: item.calories,
                                    description: item.description,
                                    isFavortite: item.isFavortite //todo
                                })}
                            style={({ pressed }) => {
                                return pressed && pressedStyle;
                            }}
                            android_ripple={{ color: colors.LIGHT_BLUE, foreground: true }}
                        >
                            <View style={styles.container}>
                                <View style={styles.favoriteContainer}>
                                    <View style={styles.favorite}>
                                        {item.isFavortite ? (
                                            <View>
                                                <Entypo name="heart" size={20} color={colors.RED} />
                                            </View>)
                                            : (<View>
                                                <Entypo name="heart-outlined" size={20} color={colors.RED} />
                                            </View>)}
                                    </View>
                                </View>

                            </View>
                        </Pressable>
                    )}
                    keyExtractor={(item) => item.id}
                />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    containerList: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    list: {
        flex: 4,
        marginTop: 20,
    },
    background: {
        margin: 10,
    },
    container: {
        flexDirection: "row",
        width: 360,
        minHeight: 50,
        padding: 16,
        margin: 10,
        backgroundColor: colors.PURPLE,
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 5,
        shadowRadius: 5,
        shadowOpacity: 0.4,
        shadowOffset: { width: 1, height: 2 },
        shadowColor: "rebeccapurple",
    },
    text: {
        fontSize: 17,
        fontWeight: "bold",
        color: colors.WHITE
    },
    favorite: {
        margin: 10
    },
    favoriteContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    }
})

