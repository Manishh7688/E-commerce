import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const OrderSuccess = () => {
    const navigation = useNavigation()
  return (
    <View style={styles.container}>
        <Image source={require('../images/success.png')} style={styles.successImg}/>
      <Text style={styles.msg}>Order Successfully Placed</Text>
      <Text style={styles.gotohome} onPress={()=>{
        navigation.navigate("Main")
      }}>
        Go to Home
      </Text>
    </View>
  )
}

export default OrderSuccess

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#fff'
    },
    successImg:{
        width:100,
        height:100,
    },
    msg:{
        marginTop:20,
        color:'#000',
        fontSize:16,
    },
    gotohome:{
        marginTop:20,
        borderWidth:1,
        color:'#000',
        padding:10
    }

})