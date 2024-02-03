import {View, Text, StyleSheet, TextInput, TextInputBase} from 'react-native';
import React, { useState } from 'react';
import Header from '../common/Header';
import {useNavigation} from '@react-navigation/native';
import CustomButton from '../common/CustomButton';
import { useDispatch, useSelector } from 'react-redux';
import { editProfile } from '../redux/slices/ProfileSlice';

const EditProfile = () => {
  const navigation = useNavigation();
  const profile = useSelector(state=>state.profile) 
  const dispatch = useDispatch()
  const [name, setName] = useState(profile.name)
  const [email, setEmail] = useState(profile.email)
  console.log(profile);
  const saveProfile=()=>{
    dispatch(editProfile({name:name,email:email}))
    navigation.goBack()
  }
  return (
    <View style={styles.container}>
      <Header
        title={'Edit  Profile'}
        leftIcon={require('../images/back.png')}
        onClickLeftIcon={() => {
          navigation.goBack();
        }}
      />
      <Text style={styles.title}>EditProfile</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Name"
        value={name}
        onChangeText={text => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Email"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <CustomButton title={'Save'} color={'#fff'} bg={'#fd9102'} onClick={() => { 
                saveProfile()
            }} />
    </View>
  );
};

export default EditProfile;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    color: '#000',
    fontWeight: '600',
    alignSelf: 'center',
    marginTop: 40,
  },input: {
    width: '90%',
    height: 50,
    borderRadius: 10,
    borderWidth: .5,
    paddingLeft: 20,
    alignSelf: 'center',
    marginTop: 10,
    color:'#000'
},
});
