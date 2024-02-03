import { View, Text, StyleSheet, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomButton from '../common/CustomButton'
import { useNavigation } from '@react-navigation/native'
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Signup = () => {
    const navigation = useNavigation()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [mobile, setMobile] = useState('')
    const [confirmPass, setConfirmPass] = useState('')
    // const addUser = () => {
    //     firestore()
    //         .collection('Users')
    //         .add({
    //             name: name,
    //             email:email,
    //             mobile:mobile,
    //             password:password,
    //         })
    //         .then(() => {
    //             console.log('User added!');
    //             navigation.navigate('Login')
    //         }); 
    // }
    const addUser = async () => {
        try {
            // Store user data in AsyncStorage
            await AsyncStorage.setItem('userData', JSON.stringify({
                name: name,
                email: email,
                mobile: mobile,
                password: password,
            }));
            await AsyncStorage.setItem('EMAIL',email)

            // Store user data in Firestore
            firestore()
                .collection('Users')
                .add({
                    name: name,
                    email: email,
                    mobile: mobile,
                    password: password,
                })
                .then(() => {
                    console.log('User added!');
                    navigation.navigate('Login');
                });
        } catch (error) {
            console.error('Error storing user data: ', error);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Signup</Text>
            <TextInput
                style={styles.input}
                placeholder='Enter Name'
                value={name}
                onChangeText={(text) => setName(text)}
            />
            <TextInput
                style={styles.input}
                placeholder='Enter Email'
                value={email}
                onChangeText={(text) => setEmail(text)}
            />
            <TextInput
                style={styles.input}
                placeholder='Enter Mobile'
                value={mobile}
                keyboardType='number-pad'
                onChangeText={(text) => setMobile(text)}
            />
            <TextInput
                style={styles.input}
                placeholder='Enter Password'
                value={password}
                onChangeText={(text) => setPassword(text)}
            />
            <TextInput
                style={styles.input}
                placeholder='Confirm Password'
                value={confirmPass}
                onChangeText={(text) => setConfirmPass(text)}
            />
            <CustomButton title={'Signup'} color={'#fff'} bg={'#fd9102'} onClick={() => { 
                addUser()
            }} />
            <Text style={styles.bottomText}>Already have an Account?</Text>
            <Text style={styles.login} onPress={() => {
                navigation.navigate('Login')
            }}>Login</Text>
        </View>
    )
}

export default Signup
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