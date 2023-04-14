import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import React, { useState } from "react";
import { auth } from "../firebase/firebase-setup";
import { signInWithEmailAndPassword } from "firebase/auth";
import Card from "../components/Card";
import { MyButton } from "../components/MyButton";
import { colors } from "../helper/helper";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginHandler = async () => {
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      console.log("userCred", userCred);
      console.log("userCred.user.uid", userCred.user.uid);
      console.log("userCred.user.email", userCred.user.email);
    } catch (err) {
      Alert.alert("Error", "Please input valid email and password");
    }
  };
  const signupHandlder = () => {
    navigation.replace("Signup");
  };
  return (
    <View style={styles.container}>
      <Card
        height={350}
        backgroundColor={colors.WHITE}
        marginTop={50}
        width={300}
      >
        <View style={styles.textContatiner}>
          <Text style={styles.label}>Log in</Text>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            value={email}
            autoCapitalize='none'
            onChangeText={(newEmail) => {
              setEmail(newEmail);
            }}
            placeholder="Email"
            style={styles.input}
          />
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
        </View>
        <View style={styles.buttonContainer}>
          <MyButton text="Log in" onPress={loginHandler} width={20} />
        </View>

      </Card>

      <View style={styles.newerContainer}> 
        <Button title="New here? Join now" onPress={signupHandlder} />
      </View>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center"
  },
  card: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
  },
  input: {
    borderColor: "#171717",
    borderWidth: 1.17,
    width: "86%",
    marginTop: 20,
    padding: 9,
    borderRadius: 5,
    height: 50
  },
  label: {
    fontSize: 30,
    fontWeight: "bold",
    marginLeft: "7%",
    marginTop: "3%"
  },
  inputContainer: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonContainer: {
    marginTop: 36,
    alignItems: "center"
  },
  newerContainer: {
    flexDirection: "row",
    marginTop: 10
  }

});