import { View, Text, TextInput, Button, Alert , StyleSheet } from "react-native";
import React, { useState } from "react";
import { auth } from "../firebase/firebase-setup";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function Signup({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const loginHandler = () => {
    navigation.replace("Login");
  };
  const signupHandler = async () => {
    if (password !== confirmPassword) {
      //checking value and type {
      Alert.alert("The passwords don't match");
    }
    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userCred);
    } catch (err) {
      console.log("sign up error ", err);
      Alert.alert("Error", err.message);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.label}>New Email:</Text>
      <TextInput
        style={styles.input}
        value={email}
        autoCapitalize="none"
        onChangeText={(newEmail) => {
          setEmail(newEmail);
        }}
        placeholder="New Email"
      />
      <Text style={styles.label}>New Password:</Text>
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        autoCapitalize='none'
        placeholder="New Password"
        value={password}
        onChangeText={(newPassword) => {
          setPassword(newPassword);
        }}
      />
      <Text style={styles.label}>Confirm New Password:</Text>
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        placeholder="Confirm New Password"
        value={confirmPassword}
        onChangeText={(newPassword) => {
          setConfirmPassword(newPassword);
        }}
      />
      <Button title="Register" onPress={signupHandler} />
      <Button title="Already Registered? Login" onPress={loginHandler} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "stretch",
    justifyContent: "start",
  },
  input: {
    borderColor: "#552055",
    borderWidth: 2,
    width: "90%",
    marginTop: 10,
    marginLeft: 10,
    padding: 9,
    borderRadius: 5,
  },
  label: {
    marginTop: 10,
    marginLeft: 10,
    fontSize: 18,
  },
});