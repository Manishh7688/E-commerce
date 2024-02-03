import { View, Text, Image } from 'react-native'
import React from 'react'

const Notification = () => {
  return (
    <View style={{flex:1}}>
      <Image source={require('../../images/sale.webp')} style={{width:'100%',height:'100%',resizeMode:'cover'}}/>
    </View>
  )
}

export default Notification