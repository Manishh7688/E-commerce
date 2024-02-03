import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'

const CheckoutLayout = ({total, items, onClick}) => {
    return (
        <View style={styles.container}>
            <View style={styles.tab}>
                <Text style={styles.ttltext}>{`(items ${items})`}</Text>
                <Text style={styles.ttltext}>{`Total $${total}`}</Text>
            </View>
            <View style={styles.tab}>
                <TouchableOpacity style={styles.checkout} onPress={onClick}>
                    <Text style={styles.txt}>{'Checkout'}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default CheckoutLayout
const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        height: 70,
        width: Dimensions.get('window').width,
        backgroundColor: '#f2f2f2',
        flexDirection: 'row',
    },
    tab: {
        width: '50%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    checkout: {
        width: '80%',
        height: '60%',
        backgroundColor: '#fd9102',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    txt: {
        color: '#fff',
        fontSize: 18
    },ttltext:{
        color:'#000',
        fontSize:18,
        fontWeight:'600'
    }
})