import { View, Text,StyleSheet, FlatList, Dimensions, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../common/Header'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { addProducts } from '../../redux/slices/ProductSlice'
const Home = () => {
  const dispatch = useDispatch()
  const [products,setProducts]=useState([])
  const navigation = useNavigation()
  useEffect(()=>{
    getProducts()
  },[])
  const getProducts=async()=>{
    await fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(json=>{
              setProducts(json);
              json.map((item)=>{
                item.qty = 1;
              })
              dispatch(addProducts(json))
            })
  }

  return (
    <View style={styles.container}>
      <Header
        leftIcon={require('../../images/menu.png')}
        rightIcon={require('../../images/cart.png')}
        title={'Grocery App'} 
        onClickLeftIcon={()=>{navigation.openDrawer()}}
        onClickRightIcon={()=>{navigation.navigate('Cart')}}
        isCart={false}
        />
        
        <FlatList
        data={products}
        renderItem={({item,index})=>{
          return(
            <TouchableOpacity activeOpacity={1} style={styles.productItem} onPress={()=>navigation.navigate('ProductDetail',{data:item})}>
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

export default Home
const styles = StyleSheet.create({
  container: {
    flex:1
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