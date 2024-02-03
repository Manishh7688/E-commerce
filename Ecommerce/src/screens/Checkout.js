import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../common/Header';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  addItemToCart,
  emptyCart,
  reduceItemFromCart,
  removeItemFromCart,
} from '../redux/slices/CartSlice';
import CustomButton from '../common/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RazorpayCheckout from 'react-native-razorpay';
import { orderItem } from '../redux/slices/OrderSlice';

const Checkout = () => {
  const navigation = useNavigation();
  const items = useSelector(state => state.cart);
  const [cartItems, setCartItems] = useState([]);
  const [selectedMethod, setSelectedMethod] = useState(0);
  const [selectAddress, setSelectAddress] = useState('please select address');
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  useEffect(() => {
    setCartItems(items.data);
  }, [items]);

  const getTotal = () => {
    let total = 0;
    cartItems.map(item => {
      return (total += item.price * item.qty);
    });
    return total.toFixed(0);
  };

  const getAddress = async () => {
    setSelectAddress(await AsyncStorage.getItem('MY_ADDRESS'));
  };
  useEffect(() => {
    getAddress();
  }, [isFocused]);

  const orderPlace = (paymentId)=>{
    const day = new Date().getDate()
    const month = new Date().getMonth()+1
    const year = new Date().getFullYear()
    const hour = new Date().getHours()
    const minut = new Date().getMinutes()
    const data = {
        items:cartItems,
        amount:"$"+getTotal(),
        address:selectAddress,
        paymentId:paymentId,
        paymentStatus:selectedMethod==3?'Pending':'Success',
        createdAt:day+"/"+month+"/"+year+" "+hour+":"+minut
    }
    dispatch(orderItem(data))
    dispatch(emptyCart([]))
    navigation.navigate('OrderSuccess')
  }
  return (
    <View style={styles.container}>
      <Header
        title={'Checkout'}
        leftIcon={require('../images/back.png')}
        onClickLeftIcon={() => {
          navigation.goBack();
        }}
      />
      <ScrollView>
      <Text style={styles.title}>Added Items</Text>
      <View>
        <FlatList
          data={cartItems}
          keyExtractor={item => item.id}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                activeOpacity={1}
                style={styles.productItem}
                onPress={() =>
                  navigation.navigate('ProductDetail', {data: item})
                }>
                <Image
                  source={{uri: item.image}}
                  style={{width: 100, height: 100, resizeMode: 'center'}}
                />
                <View>
                  <Text style={styles.name}>
                    {item.title.length > 30
                      ? item.title.substring(0, 25) + '...'
                      : item.title}
                  </Text>
                  <Text style={styles.desc}>
                    {item.description.length > 30
                      ? item.description.substring(0, 30) + '...'
                      : item.description}
                  </Text>
                  <View style={styles.qtyView}>
                    <Text style={styles.price}>{`$ ${item.price}`}</Text>
                    <TouchableOpacity
                      style={styles.btn}
                      onPress={() => {
                        if (item.qty > 1) {
                          dispatch(reduceItemFromCart(item));
                        } else {
                          dispatch(removeItemFromCart(index));
                        }
                      }}>
                      <Text style={{fontSize: 16, fontWeight: '600'}}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.qty}>{item.qty}</Text>
                    <TouchableOpacity
                      style={styles.btn}
                      onPress={() => dispatch(addItemToCart(item))}>
                      <Text style={{fontSize: 16, fontWeight: '600'}}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
      <View style={styles.totalView}>
        <Text style={styles.title}>Total</Text>
        <Text
          style={[styles.title, {marginRight: 20}]}>{`$${getTotal()}`}</Text>
      </View>
      <Text style={styles.title}>Select Payment Method</Text>
      <TouchableOpacity
        style={styles.paymentMethods}
        onPress={() => {
          setSelectedMethod(0);
        }}>
        <Image
          source={
            selectedMethod == 0
              ? require('../images/radio_fill.png')
              : require('../images/radio.png')
          }
          style={[
            styles.img,
            {tintColor: selectedMethod == 0 ? '#fd9102' : '#000'},
          ]}
        />
        <Text style={styles.paymentText}>{'Credit Card'}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.paymentMethods}
        onPress={() => {
          setSelectedMethod(1);
        }}>
        <Image
          source={
            selectedMethod == 1
              ? require('../images/radio_fill.png')
              : require('../images/radio.png')
          }
          style={[
            styles.img,
            {tintColor: selectedMethod == 1 ? '#fd9102' : '#000'},
          ]}
        />
        <Text style={styles.paymentText}>{'Debit Card'}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.paymentMethods}
        onPress={() => {
          setSelectedMethod(2);
        }}>
        <Image
          source={
            selectedMethod == 2
              ? require('../images/radio_fill.png')
              : require('../images/radio.png')
          }
          style={[
            styles.img,
            {tintColor: selectedMethod == 2 ? '#fd9102' : '#000'},
          ]}
        />
        <Text style={styles.paymentText}>{'UPI'}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.paymentMethods}
        onPress={() => {
          setSelectedMethod(3);
        }}>
        <Image
          source={
            selectedMethod == 3
              ? require('../images/radio_fill.png')
              : require('../images/radio.png')
          }
          style={[
            styles.img,
            {tintColor: selectedMethod == 3 ? '#fd9102' : '#000'},
          ]}
        />
        <Text style={styles.paymentText}>{'Cash on Delivery'}</Text>
      </TouchableOpacity>
      <View style={styles.address}>
        <Text style={styles.title}>Address</Text>
        <Text
          style={[
            styles.title,
            {color: 'blue', textDecorationLine: 'underline'},
          ]}
          onPress={() => {
            navigation.navigate('Addresses');
          }}>
          Edit Address
        </Text>
      </View>
      <Text
        style={[styles.title, {marginTop: 10, color: '#000', fontSize: 16}]}>
        {selectAddress}
      </Text>
      <CustomButton
        bg={'#fd9102'}
        title={'Pay & Order'}
        color={'#fff'}
        onClick={() => {
          var options = {
            description: 'Credits towards consultation',
            image: 'https://i.imgur.com/3g7nmJC.png',
            currency: 'INR',
            key: 'rzp_test_3WRKrJ8QP4PPEd', // Your api key
            amount: getTotal() * 10,
            name: 'foo',
            prefill: {
              email: 'void@razorpay.com',
              contact: '9191919191',
              name: 'Razorpay Software',
            },
            theme: {color: '#3E8BFF'},
          };
          RazorpayCheckout.open(options)
            .then(data => {
              // handle success
            //   alert(`Success: ${data.razorpay_payment_id}`);
              orderPlace(data.razorpay_payment_id)
            })
            .catch(error => {
              // handle failure
              alert(`Error: ${error.code} | ${error.description}`);
            });
        }}
      />
      <Text style={{marginTop:20}}>{''}</Text>
      </ScrollView>
    </View>
  );
};

export default Checkout;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    marginLeft: 20,
    marginTop: 30,
    color: '#000',
    fontWeight: '600',
  },
  productItem: {
    width: Dimensions.get('window').width,
    height: 100,
    marginTop: 10,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 20,
  },
  desc: {
    marginLeft: 20,
  },
  price: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 20,
    color: 'green',
    marginTop: 5,
  },
  qtyView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  btn: {
    padding: 5,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderRadius: 10,
    marginLeft: 20,
  },
  qty: {
    fontSize: 18,
    marginLeft: 20,
  },
  totalView: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 70,
    flexDirection: 'row',
    borderBottomWidth: 0.3,
    borderBottomColor: '#afafaf0',
  },
  paymentMethods: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    width: '90%',
    paddingLeft: 20,
  },
  paymentText: {
    fontSize: 16,
    color: '#000',
    marginLeft: 10,
    fontWeight: '600',
  },
  img: {
    width: 24,
    height: 24,
  },
  address: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 20,
    paddingLeft: 0,
  },
});
