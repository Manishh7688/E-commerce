import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import Header from '../../common/Header'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'

const User = () => {
  const navigation = useNavigation()
  const profile = useSelector(state=>state.profile)

  const logout = async()=>{
    try {
      await AsyncStorage.removeItem('userData')
      Alert.alert('Logout',"User logout Successfully!", [
        {text: 'OK', onPress: () => navigation.navigate('Signup')},
      ]);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <View style={styles.container}>
      <Header title={'Profile'} />
      <Image source={require('../../images/profileUser.png')} style={styles.user} />
      <Text style={styles.name}>{profile.name}</Text>
      <Text style={[styles.name, { marginTop: 0, fontSize: 16 }]}>{profile.email}</Text>
      <TouchableOpacity style={[styles.tab, { marginTop: 40 }]} onPress={()=>{
        navigation.navigate('Editprofile')
      }}>
        <Text style={{color:'#000'}}>EditProfile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.tab} onPress={()=>{
        navigation.navigate('Orders')
      }}>
        <Text style={{color:'#000'}}>Oders</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.tab}>
        <Text style={{color:'#000'}}>Addresses</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.tab}>
        <Text style={{color:'#000'}}>Payment Methods</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.tab} onPress={()=>{
        logout()
      }}>
        <Text style={{color:'#000'}}>Log out</Text>
      </TouchableOpacity>
    </View>
  )
}

export default User
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  user: {
    width: 100,
    height: 100,
    marginTop: 50,
    alignSelf: 'center'
  },
  name: {
    fontSize: 24,
    alignSelf: 'center',
    marginTop: 10,
    fontWeight: '600',
    color: '#000'
  },
  tab: {
    width: '90%',
    height: 50,
    alignSelf: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#a0a0a0',
    paddingLeft: 20,
    justifyContent: 'center',
    marginTop: 10,
    fontWeight: '600'
  }
})