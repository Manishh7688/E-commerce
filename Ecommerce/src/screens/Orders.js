import { View, Text, StyleSheet, FlatList, Image } from 'react-native'
import React from 'react'
import Header from '../common/Header'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'

const Orders = () => {
    const navigation = useNavigation()
    const orderList  = useSelector(state=>state.order)
    console.log(orderList.createdAt);
  return (
    <View  style={styles.container}>
        <Header title={'Orders'} leftIcon={require('../images/back.png')} onClickLeftIcon={()=>{
            navigation.goBack()
        }}/>
      <FlatList 
      data={orderList.data}
      renderItem={({item})=>{
        return(
            <View style={styles.listView}>
                <FlatList 
                data={item.items}
                renderItem={({item})=>{
                    return(
                        <View style={styles.itemList}>
                            <Image source={{uri: item.image}} style={styles.img} />
                            <View style={styles.textView}>
                                <Text style={styles.text}>{item.title.length>20?item.title.substring(0,20)+'...':item.title}</Text>
                                <Text style={styles.text}>{item.description.length>30?item.description.substring(0,30)+'...':item.title}</Text>
                                <View style={{flexDirection:'row'}}>
                                <Text style={[styles.text,{color:'green'}]}>{`Rs. ${item.price}`}</Text>
                                <Text style={styles.text}>{orderList.data.createdAt}</Text>
                                </View>
                            </View>
                         </View>   
                    )
                }}
                />
            </View>
        )
      }}
      />
    </View>
  )
}

export default Orders
const styles = StyleSheet.create({
    container:{
        flex:1,
    },listView:{
        width:'90%',
        backgroundColor:'#fff',
        alignSelf:"center",
        marginTop:20,
        borderWidth:.3,
        borderRadius:10,
        padding:10,
        borderColor:'#000'
    },
    itemList:{
        width:'95%',
        alignSelf:"center",
        flexDirection:'row'
    },img:{
        width:50,
        height:50,
        resizeMode:'center'
    },
    textView:{
        marginLeft:10
    },
    text:{
        color:'#000',
        fontSize:16
    }

})