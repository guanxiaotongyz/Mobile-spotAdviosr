import { View, Text, TextInput , Button} from "react-native";
import React from "react";
import { addSpotFunction } from "../firebase/firestore";

const AddSpot = () => {
  const [description, setDescription] = React.useState("");
  const [name, setName] = React.useState("");

    const submitFunction = () => {
        addSpotFunction({ description, name });
    };
    
  return (
    <View>
      <Text>AddSpot</Text>
      <Text>Description: </Text>
      <TextInput
        style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
        value={description}
        onChangeText={(newtext) => {
          setDescription(newtext);
        }}
      ></TextInput>

        <Text>Name: </Text>
        <TextInput
            style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
            value={name}
            onChangeText={(newtext) => {
                setName(newtext);
            }}
        ></TextInput>

        <Button title="Add Spot" onPress={submitFunction}></Button>



    </View>
  );
};

export default AddSpot;
