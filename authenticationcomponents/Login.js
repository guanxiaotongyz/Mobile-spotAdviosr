import { View, Text, TextInput, Button, Alert , StyleSheet } from "react-native";
import React, { useState } from "react";
import { auth } from "../firebase/firebase-setup";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginHandler = async () => {
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      console.log("userCred" , userCred);
      console.log("userCred.user.uid" , userCred.user.uid);
      console.log("userCred.user.email" , userCred.user.email);
    } catch (err) {
      console.log("login error", err);
      Alert.alert("Error", err.message);
    }
  };
  const signupHandlder = () => {
    navigation.replace("Signup");
  };
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email:</Text>
      <TextInput
        value={email}
        autoCapitalize='none'
        onChangeText={(newEmail) => {
          setEmail(newEmail);
        }}
        placeholder="Email"
        style={styles.input}
      />
      <Text style={styles.label}>Password:</Text>
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        placeholder="Password"
        autoCapitalize='none'
        value={password}
        onChangeText={(newPassword) => {
          setPassword(newPassword);
        }}
      />
      <Button title="Login" onPress={loginHandler} />
      <Button title="New User? Create An Account" onPress={signupHandlder} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  input: {
    borderColor: "#552055",
    borderWidth: 2,
    width: 350,
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