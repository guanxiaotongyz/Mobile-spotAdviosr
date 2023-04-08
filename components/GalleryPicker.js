import { View, Image, Button, Alert } from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";

export default function GalleryPicker({ imageUriHandler }) {
  const [imageUri, setImageUri] = useState("");
  const [permissionInfo, requestPermission] =
    ImagePicker.useCameraPermissions();
  

  async function verifyPermission() {
    if (permissionInfo.granted) {
      return true;
    }
    const permissionResult = await requestPermission();
    // this will be user's choice:
    return permissionResult.granted;
  }

  const imageHandler = async () => {
    const permissionReceived = await verifyPermission();
    if (!permissionReceived) {
      Alert.alert("You need to give camera permission");
      return;
    }
    try {
      const result = await ImagePicker.launchImageLibraryAsync();
      if (result.assets.length) {
        // let uri = result.assets[0].uri;
        // let res = read_image_from_storage(uri);
        // setImageUri(res);
        // imageUriHandler(res);
        let uri = result.assets[0].uri;
        setImageUri(uri);
        imageUriHandler(uri);
      }
    } catch (err) {
      console.log("launch gallery error ", err);
    }
  };

  return (
    <View>
      <Button title="Pick a Picture" onPress={imageHandler} />
      {imageUri && (
        <Image
          source={{
            uri: imageUri,
          }}
          style={{ height: 100, width: 100 }}
        />
      )}
    </View>
  );
}
