import { Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { colors, pressedStyle } from "../helper/helper"

export function MyButton({ text, onPress }) {
    return (
        <Pressable
            style={({ pressed }) => [
                styles.basic,
                styles["normal"],
                pressed && pressedStyle,
            ]}
            android_ripple={{ color: colors.LIGHT_BLUE, foreground: true }}
            onPress={onPress}
        >
            <Text style={[styles["normal"].text]}>{text}</Text>
        </Pressable>
    );
}
const normalBtn = {
    padding: 12,
    height: 55,
    width: 200,
    borderRadius: 30,
    shadowRadius: 3,
    shadowOpacity: 0.1,
    margin: 12,
    borderWidth: 2,
    shadowOffset: { width: 1, height: 2 },
    shadowColor: colors.WHITE,
    borderColor: colors.WHITE
};

const styles = StyleSheet.create({
    basic: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 10,
        marginRight: 10,
        marginTop: 6
    },
    normal: {
        ...normalBtn,
        backgroundColor: colors.BLUE,
        text: { fontSize: 20, color: colors.WHITE },
    },
    text: {
        fontSize: 100,
        color: colors.WHITE,
    },
});