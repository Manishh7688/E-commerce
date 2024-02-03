import { View, Text,StyleSheet, FlatList, Dimensions, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Header from '../../common/Header'
import { useNavigation } from '@react-navigation/native'

const Wishlist = () => {
  const navigation = useNavigation()
  const items = useSelector(state=>state.wishlist)
  const [wishlistItems, setWishlistItems] = useState(items.data)
  console.log(JSON.stringify(items.data));
  return (
    <View style={styles.container}>
      <Header title={'Wishlist Items'} />
   
        <FlatList 
        data={wishlistItems}
        keyExtractor={item => item._id}
        renderItem={({item, index})=>{
          return(
            <TouchableOpacity activeOpacity={1} style={styles.productItem} onPress={()=>navigation.navigate('ProductDetail',{data:item})} >
              <Image source={{uri:item.image}} style={{width:100,height:100,resizeMode:'center'}}/>
              <View>
                <Text style={styles.name}>{item.title.length>30?item.title.substring(0,25)+'...':item.title}</Text>
                <Text style={styles.desc}>{item.description.length>30?item.description.substring(0,30)+'...':item.description}</Text>
                <Text style={styles.price}>{`$ ${item.price}`}</Text>
              </View>
            </TouchableOpacity>
          )
        }}
        />
     
    </View>
  )
}

export default Wishlist
const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#fff'
  },
  productItem:{
    width:Dimensions.get('window').width,
    height:100,
    marginTop:10,
    backgroundColor:"#fff",
    flexDirection:'row',
    alignItems:'center',
    padding:10
  },
  name:{
    fontSize:18,
    fontWeight:'600',
    marginLeft:20
  },
  desc:{
    marginLeft:20
  },
  price:{
    fontSize:18,
    fontWeight:'600',
    marginLeft:20,
    color:'green',
    marginTop:5
  }
})