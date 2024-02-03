import { View, Text, StyleSheet, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomButton from '../common/CustomButton'
import { useNavigation } from '@react-navigation/native'
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
    const navigation = useNavigation()
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // const loginUser = async () => {
    //     try {
    //         const userDataString = await AsyncStorage.getItem('userData');
    //         const userData = JSON.parse(userDataString);
    //         console.log('gkasjdhakjhg',userData);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    const loginUser=()=>{
        firestore()
        .collection('Users')
        .where('email','==',email)
        .where('password', '==', password)
        .get()
        .then(snapshot => {
            if(snapshot.docs[0]._data){
                console.log('logged in');
                navigation.navigate('Main')
            };
        })
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
          
            <TextInput
                style={styles.input}
                placeholder='Enter Email'
                value={email}
                onChangeText={text => setEmail(text)}
            />
            
            <TextInput
                style={styles.input}
                placeholder='Enter Password'
                value={password}
                onChangeText={text => setPassword(text)}
            />
           
            <CustomButton title={'Login'} color={'#fff'} bg={'#fd9102'} onClick={() => {
                loginUser()
             }} />
             <Text style={styles.bottomText}>Create New Account?</Text>
            <Text style={styles.login} onPress={()=>{
                navigation.navigate('Signup')
            }}>Signup</Text> 
        </View>
    )
}

export default Login
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 40,
        color: '#000',
        marginLeft: 20,
        marginTop: 80,
        marginBottom: 50
    },
    input: {
        width: '90%',
        height: 50,
        borderRadius: 10,
        borderWidth: .5,
        paddingLeft: 20,
        alignSelf: 'center',
        marginTop: 10,
        color:'#000'
    },
    login: {
        textDecorationLine: 'underline',
        fontSize: 18,
        marginTop: 10,
        alignSelf: 'center',
        color: 'blue'
    },bottomText:{
        fontSize: 18,
        marginTop: 20,
        alignSelf: 'center',
        color: '#000'
    }

})