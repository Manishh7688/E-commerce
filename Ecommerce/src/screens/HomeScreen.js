import { View, Text,StyleSheet, TouchableOpacity, Image, Keyboard } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../common/Header'
import { Home, Notification, Search, User, Wishlist } from './tabs'

const HomeScreen = () => {
  const [selectedTab,setSelectedTab] = useState(0)
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  useEffect(()=>{
    Keyboard.addListener(
     'keyboardDidShow',
     () => {
       setKeyboardOpen(true);
     }
   );

   Keyboard.addListener(
     'keyboardDidHide',
     () => {
       setKeyboardOpen(false);
     }
   );
 },[])
  return (
    <View style={styles.container}>
      {selectedTab==0?(<Home />):selectedTab==1?(<Search />):selectedTab==2?(<Wishlist />):selectedTab==3?(<Notification />):(<User />)}
      {!keyboardOpen&&(
      <View style={styles.bottomView}>
        <TouchableOpacity style={styles.bottomTab} onPress={()=>{setSelectedTab(0)}}>
          <Image source={selectedTab==0?require('../images/home_fill.png'):require('../images/home.png')} style={styles.bottomTabIcon}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomTab} onPress={()=>{setSelectedTab(1)}}>
          <Image source={selectedTab==1?require('../images/search_fill.png'):require('../images/search_fill.png')} style={styles.bottomTabIcon}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomTab} onPress={()=>{setSelectedTab(2)}}>
          <Image source={selectedTab==2?require('../images/wishlist_fill.png'):require('../images/wishlist.png')} style={styles.bottomTabIcon}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomTab} onPress={()=>{setSelectedTab(3)}}>
          <Image source={selectedTab==3?require('../images/notification_fill.png'):require('../images/notification.png')} style={styles.bottomTabIcon}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomTab} onPress={()=>{setSelectedTab(4)}}>
          <Image source={selectedTab==4?require('../images/user_fill.png'):require('../images/user.png')} style={styles.bottomTabIcon}/>
        </TouchableOpacity>
      </View>
      )}
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex:1
  },
  bottomView:{
    position:'absolute',
    bottom:0,
    width:'100%',
    height:70,
    alignItems:'center',
    flexDirection:'row',
    justifyContent:"space-evenly",
    backgroundColor:'#fff'
  },
  bottomTab:{
    width:'20%',
    height:"100%",
    justifyContent:'center',
    alignItems:"center"
  },
  bottomTabIcon:{
    width:24,
    height:24
  }
})