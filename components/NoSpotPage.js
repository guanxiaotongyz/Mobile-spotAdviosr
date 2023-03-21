import { View } from 'react-native';
import React from 'react';
import { Image } from 'react-native';

export default function NoSpotPage(props) {
  return (
    <>
        <View style={container}>
            <Image
                source={require('')}
                style={container}
                resizeMode="cover" //todo
            />
        </View>
        {props.children}
    </>
  )
}