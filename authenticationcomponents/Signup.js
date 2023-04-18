import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import { auth } from "../firebase/firebase-setup";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addUserInfoFunction } from "../firebase/firestore";
import { scheduleNotificationUserHandler } from "../components/NotificationManger";
import Card from "../components/Card";
import { MyButton } from "../components/MyButton";
import { colors } from "../helper/helper";

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
      return;
    } else if (
      email === "" ||
      password === "" ||
      confirmPassword === "" ||
      name === "" ||
      gender === "" ||
      age === ""
    ) {
      Alert.alert("Please input all informations");
      return;
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
      Alert.alert("Error", "Please input correct information");
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={"position"}
      keyboardVerticalOffset={20}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {/* <View style={styles.container}> */}
      <Card
        height={650}
        backgroundColor={colors.WHITE}
        marginTop={30}
        width={330}
      >
        <View style={styles.textContatiner}>
          <Text style={styles.label}>Sign up</Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.text}>Nick name</Text>
          <TextInput
            style={styles.input}
            value={name}
            autoCapitalize="none"
            onChangeText={(newName) => {
              setName(newName);
            }}
          />
          <Text style={styles.text}>Gender</Text>
          <TextInput
            style={styles.input}
            value={gender}
            autoCapitalize="none"
            onChangeText={(newGender) => {
              setGender(newGender);
            }}
          />
          <Text style={styles.text}>Age</Text>
          <TextInput
            style={styles.input}
            value={age}
            autoCapitalize="none"
            onChangeText={(newAge) => {
              setAge(newAge);
            }}
          />
          <Text style={styles.text}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            autoCapitalize="none"
            onChangeText={(newEmail) => {
              setEmail(newEmail);
            }}
          />
          <Text style={styles.text}>Password</Text>
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            autoCapitalize="none"
            value={password}
            onChangeText={(newPassword) => {
              setPassword(newPassword);
            }}
          />
          <Text style={styles.text}>Confirm Password:</Text>
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            value={confirmPassword}
            onChangeText={(newPassword) => {
              setConfirmPassword(newPassword);
            }}
          />
        </View>
        <View style={styles.buttonContainer}>
          <MyButton text="Sign up" onPress={signupHandler} width={50} />
          <Button title="Already a user? Login" onPress={loginHandler} />
        </View>
      </Card>
      {/* <Button title="Schedule Notification" onPress={scheduleNotificationUserHandler} /> */}
    {/* </View> */}
    </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
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
    marginTop: 3,
    padding: 9,
    borderRadius: 5,
    height: 45,
  },
  label: {
    fontSize: 30,
    fontWeight: "bold",
    marginLeft: "7%",
    marginTop: "3%",
  },
  inputContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  newerContainer: {
    flexDirection: "row",
  },
  text: {
    fontSize: 15,
    marginLeft: "7%",
    alignSelf: "flex-start",
    marginTop: 7,
    marginBottom: 3,
  },
});
