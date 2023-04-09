import { View, Pressable, StyleSheet } from "react-native";
import React from "react";
import { colors } from "../helper/helper";
export default function PressableButton({ style, pressHandler, children }) {
  return (
    <Pressable
      style={({ pressed }) => {
        // console.log("data from style ", data);
        return [
          style,
          pressed ? styles.pressedStyle : null,
        ];
      }}
      onPress={pressHandler}
      android_ripple={{ color: colors.LIGHT_BLUE, foreground: true }}
    >
      <View>{children}</View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressedStyle: { backgroundColor: colors.LIGHT_GREY, opacity: 0.5 },
});