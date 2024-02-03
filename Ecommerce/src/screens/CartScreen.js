import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../common/Header'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { addItemToCart, reduceItemFromCart, removeItemFromCart } from '../redux/slices/CartSlice'
import CheckoutLayout from '../common/CheckoutLayout'

const CartScreen = () => {
    const navigation = useNavigation()
    const items = useSelector(state => state.cart)
    const [cartItems, setCartItems] = useState([])
    console.log("CART SCREEN: ", cartItems.length);
    const dispatch = useDispatch()
    useEffect(() => {
        setCartItems(items.data)
    }, [items])

    const getTotal = ()=>{
        let total = 0;
        cartItems.map(item=>{
            return total += item.price * item.qty
        })
        return total.toFixed(0)
    }
    return (
        <View style={styles.container}>
            <Header
                title={'Cart Items'}
                leftIcon={require('../images/back.png')}
                rightIcon={require('../images/cart.png')}
                onClickLeftIcon={() => { navigation.goBack() }}
            />
            <FlatList
                data={cartItems}
                keyExtractor={item => item.id}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity activeOpacity={1} style={styles.productItem} onPress={() => navigation.navigate('ProductDetail', { data: item })}  >
                            <Image source={{ uri: item.image }} style={{ width: 100, height: 100, resizeMode: 'center' }} />
                            <View>
                                <Text style={styles.name}>{item.title.length > 30 ? item.title.substring(0, 25) + '...' : item.title}</Text>
                                <Text style={styles.desc}>{item.description.length > 30 ? item.description.substring(0, 30) + '...' : item.description}</Text>
                                <View style={styles.qtyView}>
                                    <Text style={styles.price}>{`$ ${item.price}`}</Text>
                                    <TouchableOpacity style={styles.btn}
                                        onPress={() => {
                                            if (item.qty > 1) {
                                                dispatch(reduceItemFromCart(item))
                                            } else {
                                                dispatch(removeItemFromCart(index))
                                            }
                                        }}
                                    >
                                        <Text style={{ fontSize: 16, fontWeight: '600' }}>-</Text>
                                    </TouchableOpacity>
                                    <Text style={styles.qty}>{item.qty}</Text>
                                    <TouchableOpacity style={styles.btn} onPress={() => dispatch(addItemToCart(item))}>
                                        <Text style={{ fontSize: 16, fontWeight: '600' }}>+</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )
                }}
            />
            {cartItems.length<1 && (

                <Text style={styles.noItem}>{`No Cart Items Added`}</Text>
    
            )}
            {cartItems.length>0 && (
            <CheckoutLayout items={cartItems.length} total={getTotal()} onClick={()=>{
                navigation.navigate('Checkout')
            }}/>
            )}
        </View>
    )
}

export default CartScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#fff'
    },
    productItem: {
        width: Dimensions.get('window').width,
        height: 100,
        marginTop: 10,
        backgroundColor: "#fff",
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10
    },
    name: {
        fontSize: 18,
        fontWeight: '600',
        marginLeft: 20
    },
    desc: {
        marginLeft: 20
    },
    price: {
        fontSize: 18,
        fontWeight: '600',
        marginLeft: 20,
        color: 'green',
        marginTop: 5
    },
    qtyView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10
    },
    btn: {
        padding: 5,
        width: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: .5,
        borderRadius: 10,
        marginLeft: 20
    },
    qty: {
        fontSize: 18,
        marginLeft:20
    },
    noItem:{
        textAlign:'center',
        justifyContent:'center',
        marginBottom:'50%',
        fontSize:18,
        color:'#000'
    }
})