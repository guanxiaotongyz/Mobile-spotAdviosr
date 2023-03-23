import { View, Text, TextInput, Button, Alert } from "react-native";
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

      console.log("email", email)
      if (password !== confirmPassword)
      {
          Alert.alert("The passwords don't match")
          return;
      }
      try {
        const userCred = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );
      } catch (err) {
        console.log("Auth error ", err);
        Alert.alert("Error", err.message);
      }
    };
    return (
      <View>
        <Text>Email</Text>
        <TextInput
          value={email}
          onChangeText={(newEmail) => {
            setEmail(newEmail);
          }}
          placeholder="Email" 
       />
        <Text>Password</Text>
        <TextInput
          value={password}
          onChangeText={(newPassword) => {
            setPassword(newPassword);
          }}
          placeholder="Password  "
        />

        <Text>Confirm Password</Text>
        <TextInput
          value={confirmPassword}
          onChangeText={(newPassword) => {
            setConfirmPassword(newPassword);
          }}
          placeholder=" Confrim Password"
        />
        <Button title="Register" onPress={signupHandler} />
        <Button title="Already Registered? Login" onPress={loginHandler} />
      </View>
    );
  }