import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Dimensions } from 'react-native'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'

const { height, width } = Dimensions.get('window')
const Header = ({ title, leftIcon, rightIcon, onClickLeftIcon, onClickRightIcon, isCart }) => {
  const cartItem = useSelector(state => state.cart)
  const navigation = useNavigation()

  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.btn} onPress={onClickLeftIcon}>
        <Image source={leftIcon} style={styles.icon} />
      </TouchableOpacity>
      <Text style={styles.text}>{title}</Text>
      {!isCart && <View></View>}
      {isCart && (
      <TouchableOpacity style={styles.btn} onPress={() => {
        navigation.navigate('Cart')
      }}>
        <Image source={rightIcon} style={styles.icon} />
        <View style={styles.cartNumer}>
          <Text style={{ color: '#000000' }}>{cartItem.data.length}</Text>
        </View>
      </TouchableOpacity>
      )}
    </View>
  )
}

export default Header
const styles = StyleSheet.create({
  header: {
    width: width,
    height: 60,
    backgroundColor: '#0448D0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
  },
  btn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    width: 30,
    height: 30,
    tintColor: '#fff'
  },
  text: {
    fontSize: 20,
    color: '#fff',
  },
  cartNumer: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    position: 'absolute',
    right: 0, top: 0,
    justifyContent: 'center',
    alignItems: 'center'
  }

})