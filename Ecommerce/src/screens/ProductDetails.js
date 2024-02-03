import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import Header from '../common/Header';
import CustomButton from '../common/CustomButton';
import {useDispatch} from 'react-redux';
import {addItemToWishlist} from '../redux/slices/WishlistSlice';
import {addItemToCart, removeItemFromCart} from '../redux/slices/CartSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AskForLoginModal from '../common/AskForLoginModal';

const ProductDetail = () => {
  const [qty, setQty] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch(state => state);

  const checkUserStatus = async () => {
    try {
      let isLoggedIn = false;
      const part = await AsyncStorage.getItem('userData');
      const status = JSON.parse(part);
      console.log('status', status);
      if (!status) {
        isLoggedIn = false;
      } else {
        isLoggedIn = true;
      }
      return isLoggedIn;
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <Header
        leftIcon={require('../images/back.png')}
        rightIcon={require('../images/cart.png')}
        title={'Product Details'}
        onClickLeftIcon={() => {
          navigation.goBack();
        }}
        onClickRightIcon={async() => {
            if(await checkUserStatus()){
                navigation.navigate('Cart');
            }else{
                setModalVisible(true);
            }
        }}
        isCart={true}
      />
      <Image source={{uri: route.params.data.image}} style={styles.banner} />
      <Text style={styles.title}>{route.params.data.title}</Text>
      <Text style={styles.desc}>{route.params.data.description}</Text>
      <View style={styles.priceView}>
        <Text style={styles.price}>{`Price: $${route.params.data.price}`}</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 10,
            marginRight: 40,
          }}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              if (qty > 1) {
                setQty(qty - 1);
              }
            }}>
            <Text style={styles.values}>-</Text>
          </TouchableOpacity>
          <Text style={styles.values}>{qty}</Text>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              setQty(qty + 1);
            }}>
            <Text style={styles.values}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        style={styles.wishlistBtn}
        onPress={async () => {
          if (await checkUserStatus()) {
            dispatch(addItemToWishlist(route.params.data));
          } else {
            setModalVisible(true);
          }
        }}>
        <Image source={require('../images/wishlist.png')} style={styles.icon} />
      </TouchableOpacity>
      <CustomButton
        title={'Add To Cart'}
        bg={'#fd9102'}
        color={'#fff'}
        onClick={async () => {
          // console.log(route.params.data);
          if (await checkUserStatus()) {
            dispatch(
              addItemToCart({
                category: route.params.data.category,
                description: route.params.data.description,
                id: route.params.data.id,
                image: route.params.data.image,
                price: route.params.data.price,
                qty: qty,
                rating: route.params.data.rating,
                title: route.params.data.title,
              }),
            );
          } else {
            setModalVisible(true);
          }
        }}
      />
      <AskForLoginModal
        visible={modalVisible}
        closeModal={() => {
          setModalVisible(false);
        }}
        onClickLogin={() => {
          setModalVisible(false);
          navigation.navigate('Login');
        }}
        onClickSignup={() => {
          setModalVisible(false);
          navigation.navigate('Signup');
        }}
      />
    </View>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  banner: {
    width: '100%',
    height: 300,
    resizeMode: 'center',
  },
  title: {
    fontSize: 22,
    color: '#000',
    fontWeight: '600',
    marginLeft: 20,
    marginTop: 20,
  },
  desc: {
    fontSize: 16,
    marginLeft: 20,
    lineHeight: 20,
    marginTop: 10,
    height: '20%',
  },
  price: {
    color: 'green',
    fontSize: 20,
    fontWeight: '800',
    marginTop: 20,
    marginLeft: 20,
  },
  wishlistBtn: {
    position: 'absolute',
    right: 20,
    top: 100,
    backgroundColor: '#E2DFDF',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  icon: {
    width: 24,
    height: 24,
  },
  priceView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btn: {
    width: 30,
    height: 30,
    borderRadius: 5,
    borderWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  values: {
    fontSize: 22,
    color: '#000',
    fontWeight: '600',
  },
});
