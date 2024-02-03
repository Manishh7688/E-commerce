import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import Header from '../common/Header';
import {useNavigation, useRoute} from '@react-navigation/native';
import CustomButton from '../common/CustomButton';
import { useDispatch } from 'react-redux';
import { addAddress, updateAddress } from '../redux/slices/AddressSlice';
import uuid from 'react-native-uuid';

const AddAddress = () => {
    const route = useRoute() 
  const dispatch = useDispatch()
  const navigation = useNavigation(); 
  const [selected, setSelect] = useState(
    route.params.type == 'edit' ? route.params.data.type=='Home'?0 : 1:0,
  );
  const [state, setState] = useState(
    route.params.type == 'edit' ? route.params.data.state : '',
  );
  const [city, setCity] = useState(
    route.params.type == 'edit' ? route.params.data.city : '',
  );
  const [pin, setPin] = useState(
    route.params.type == 'edit' ? route.params.data.pin : '',
  );
 
  return (
    <View style={styles.container}>
      <Header
        title={route.params.type =='edit'?'Edit Address':'Add New Address'}
        leftIcon={require('../images/back.png')}
        onClickLeftIcon={() => {
          navigation.goBack();
        }}
      />
      <TextInput
        placeholder="Enter state"
        style={styles.input}
        value={state}
        onChangeText={text => setState(text)}
      />
      <TextInput
        placeholder="Enter City"
        style={[styles.input, {marginTop: 15}]}
        value={city}
        onChangeText={text => setCity(text)}
      />
      <TextInput
        placeholder="Enter Pin"
        style={[styles.input, {marginTop: 15}]}
        keyboardType="number-pad"
        value={pin}
        onChangeText={text=>setPin(text)}
      />
      <View style={styles.typeView}>
        <TouchableOpacity
          style={styles.typeBtn}
          onPress={() => {
            setSelect(0);
          }}>
          <Image
            source={
              selected == 0
                ? require('../images/radio_fill.png')
                : require('../images/radio.png')
            }
            style={[
              styles.radio,
              {tintColor: selected == 0 ? '#fd9102' : '#000',borderColor: selected == 0 ? '#fd9102' : '#000'},
            ]}
          />
          <Text style={styles.hometxt}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.typeBtn}
          onPress={() => {
            setSelect(1);
          }}>
          <Image
            source={
              selected == 1
                ? require('../images/radio_fill.png')
                : require('../images/radio.png')
            }
            style={[
              styles.radio,
              {tintColor: selected == 1 ? '#fd9102' : '#000',borderColor: selected == 1 ? '#fd9102' : '#000'},
            ]}
          />
          <Text style={styles.hometxt}>Office</Text>
        </TouchableOpacity>
      </View>
      <CustomButton
        bg={'#fd9102'}
        title={'Save Address'}
        color={'#fff'}
        onClick={()=>{
            if (route.params.type=='edit') {
                dispatch(updateAddress({
                    state:state,
                    city:city,
                    pin:pin,
                    type:selected==0?'Home':'Office',
                    id:route.params.data.id
                })),
                navigation.goBack()
            }else{
                dispatch(addAddress({
                    state:state,
                    city:city,
                    pin:pin,
                    type:selected==0?'Home':'Office',
                    id:uuid.v4()
                })),
                navigation.goBack()
            }
            }
    }
      />
    </View>
  );
};

export default AddAddress;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  input: {
    width: '90%',
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    alignSelf: 'center',
    marginTop: 50,
    paddingLeft: 10,
    paddingRight: 10,
    color:'#000'
  },
  typeView: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginBottom:50
  },
  typeBtn: {
    width: '40%',
    height: 50,
    borderRadius: 10,
    flexDirection: 'row',
    paddingLeft: 10,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  radio: {
    width: 24,
    height: 24,
  },
  hometxt: {
    color: '#000',
    fontSize: 18,
    fontWeight: '600',
  },
});
