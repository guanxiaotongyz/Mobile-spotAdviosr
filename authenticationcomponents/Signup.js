

import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import React, { useState } from "react";
import { auth } from "../firebase/firebase-setup";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addUserInfoFunction } from "../firebase/firestore";
import { scheduleNotificationUserHandler } from "../components/NotificationManger";

export default function Signup({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");

  const loginHandler = () => {
    navigation.replace("Login");
  };
  const signupHandler = async () => {
    if (password !== confirmPassword) {
      //checking value and type
      Alert.alert("The passwords don't match");
    }
    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("useCred", userCred);
      console.log("userCred.user.uid", userCred.user.uid);
      await addUserInfoFunction({
        uid: userCred.user.uid,
        email: userCred.user.email,
        name: name,
        gender: gender,
        age: age,
      });
      scheduleNotificationUserHandler();
    } catch (err) {
      console.log("sign up error ", err);
      Alert.alert("Error", err.message);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nick name:</Text>
      <TextInput
        style={styles.input}
        value={name}
        autoCapitalize="none"
        onChangeText={(newName) => {
          setName(newName);
        }}
        placeholder="Name"
      />
      <Text style={styles.label}>Gender:</Text>
      <TextInput
        style={styles.input}
        value={gender}
        autoCapitalize="none"
        onChangeText={(newGender) => {
          setGender(newGender);
        }}
        placeholder="Gender"
      />
      <Text style={styles.label}>Age:</Text>
      <TextInput
        style={styles.input}
        value={age}
        autoCapitalize="none"
        onChangeText={(newAge) => {
          setAge(newAge);
        }}
        placeholder="Age"
      />
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
        autoCapitalize="none"
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
      {/* <Button title="Schedule Notification" onPress={scheduleNotificationUserHandler} /> */}
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