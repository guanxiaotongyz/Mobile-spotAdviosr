import { View, Text, TextInput, Button } from "react-native";
import React, { useState } from "react";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginHandler = () => {};
  const signupHandler = () => {
    navigation.replace("Signup");
  };

  return (
    <View>
      <Text>Email</Text>
      <TextInput
        value={email}
        onChange={(newEmail) => {
          setEmail(newEmail);
        }}
        placeholder="Email"
      />
      <Text>Password</Text>
      <TextInput
        value={password}
        onChange={(newPassword) => {
          setPassword(newPassword);
        }}
        placeholder="Password"
      />
      <Button title="Login" onPress={loginHandler} />
      <Button title="New User? Create an Account" onPress={signupHandler} />
    </View>
  );
};

export default Login;
