import { View, Text } from 'react-native'
import React from 'react'
import {colors} from '../helper/helper';


const Card = (props) => {
   
   const style ={
      marginTop: props.marginTop || 80,
      marginHorizontal: props.marginHorizontal ||  70,
      height: props.height || 250,
      width: props.width || 250,
      borderRadius: 10,
      backgroundColor: props.backgroundColor || colors.LIGHTGREY,
      shadowRadius: 10,
      shadowOpacity: 1,
      elevation: 10,
      shadowColor: colors.LIGHTGREY,
      shadowOffset: { width: 0, height: 0 },
   };

  return (
    <View style={style}>
        {props.children}
    </View>
  )
}



export default Card