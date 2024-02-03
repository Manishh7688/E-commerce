import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import React from 'react';
import Header from '../common/Header';
import { useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { deleteAddress } from '../redux/slices/AddressSlice';

const Addresses = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation();
  const addressList = useSelector(state => state.address);
  console.log(addressList.data);
 

  const defaultAddress = async item => {
    await AsyncStorage.setItem(
      'MY_ADDRESS',
      '' + item.state + ',' + item.city + ',' + item.pin + ',type:' + item.type,
    );
    navigation.goBack()
  };

  return (
    <View style={styles.container}>
      <Header
        title={'My Addresses'}
        leftIcon={require('../images/back.png')}
        onClickLeftIcon={() => {
          navigation.goBack();
        }}
      />

      <FlatList
        data={addressList.data}
        renderItem={({item, index}) => {
          return (
            <View style={styles.addressBox}>
              <TouchableOpacity onPress={()=>{
                defaultAddress(item)
              }}>
                <Text style={styles.text}>{`State :  ${item.state}`} </Text>
                <Text style={styles.text}>{`City    :  ${item.city}`} </Text>
                <Text style={styles.text}>{`Pin     :  ${item.pin}`} </Text>
              </TouchableOpacity>
              <View style={{gap: 20, padding: 10}}>
                <View style={styles.type}>
                  <Text style={{color: '#000'}}>{item.type}</Text>
                </View>
                <View style={styles.bothIcon}>
                  <TouchableOpacity onPress={()=>{
                    navigation.navigate('AddAddress',{
                      type:'edit',
                      data:item
                    })
                  }}>
                    <Image
                      source={require('../images/edit.png')}
                      style={[styles.icon, {marginRight: 30}]}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=>{
                    dispatch(deleteAddress(item.id))
                  }}>
                    <Image
                      source={require('../images/delete.png')}
                      style={styles.icon}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        }}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          navigation.navigate('AddAddress',{type:"new"});
        }}>
        <Text style={{fontSize: 30, color: '#fff'}}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Addresses;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  addButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fd9102',
    position: 'absolute',
    bottom: 20,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addressBox: {
    width: '90%',
    height: 100,
    borderWidth: 1,
    marginTop: 20,
    alignSelf: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
    paddingLeft: 10,
    lineHeight: 30,
    color: '#000',
  },
  icon: {
    width: 30,
    height: 30,
  },
  bothIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  type: {
    width: 50,
    height: 30,
    backgroundColor: '#b1bff5',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginLeft: 10,
  },
});
