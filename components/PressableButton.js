import { View, Pressable, StyleSheet } from "react-native";
import React from "react";
export default function PressableButton({ style, pressHandler, children }) {
  // console.log(props);
  return (
    <Pressable
      style={({ pressed }) => {
        // console.log("data from style ", data);
        return [
        //   styles.buttonStyle,
          style,
          pressed ? styles.pressedStyle : null,
        ];
      }}
      onPress={pressHandler}
    >
      <View>{children}</View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonStyle: { justifyContent: "center", backgroundColor: "green" },
  pressedStyle: { backgroundColor: "lightgreen", opacity: 0.5 },
});