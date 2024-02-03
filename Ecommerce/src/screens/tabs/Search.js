import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Dimensions, FlatList } from 'react-native'
import React, {  useState } from 'react'
import { useSelector } from 'react-redux'
import Header from '../../common/Header'
import { useNavigation } from '@react-navigation/native'

const Search = () => {
  const products = useSelector(state => state)
  console.log(JSON.stringify(products.product.data));

  const [search, setSearch] = useState('')
  const [oldData, setOldData] = useState(products.product.data)
  const [searched, setSearched] = useState(oldData)
 
  const navigation = useNavigation()
  const filterData=(txt)=>{
    let newData = oldData.filter((item)=>{
      return item.title.toLowerCase().match(txt.toLowerCase())
    })
    setOldData(newData);
    setSearched(newData);
  }

  
  return (
    <View style={styles.container}>
      <Header title={'Search Items'} />
      <View style={styles.searchView}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image source={require('../../images/search_fill.png')} style={styles.icon} />
          <TextInput
            value={search}
            onChangeText={(text) => {
              setSearch(text)
             filterData(text)
            }}
            placeholder='search items here...' style={styles.input} />
        </View>
        {search !== '' && (
          <TouchableOpacity onPress={()=>{
            setSearch('');
            setOldData('')
          }}>
            <Image source={require('../../images/clear.png')} style={[styles.icon, { width: 20, height: 20 }]} />
          </TouchableOpacity>
        )}
      </View>
      {!searched=='' && (
        <FlatList
        data={searched}
        renderItem={({item,index})=>{
          return(
            <TouchableOpacity activeOpacity={1} style={styles.productItem} onPress={()=>navigation.navigate('ProductDetail',{data:item})}>
              <Image source={{uri:item.image}} style={{width:100,height:100,resizeMode:'center'}}/>
              <View>
                <Text style={styles.name}>{item.title.length>30?item.title.substring(0,25)+'...':item.title}</Text>
                <Text style={styles.desc}>{item.description.length>30?item.description.substring(0,30)+'...':item.description}</Text>
                <Text style={styles.price}>{`$ ${item.price}`}</Text>
              </View>
            </TouchableOpacity>
          )
        }}
        />
      )}
    </View>
  )
}

export default Search
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchView: {
    width: '90%',
    height: 50,
    borderRadius: 20,
    borderWidth: 1,
    alignSelf: 'center',
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20
  },
  icon: {
    width: 28,
    height: 28,
    resizeMode: 'center'
  },
  input: {
    width: '80%',
    marginLeft: 10,
    color:'#000'
  },
  productItem:{
    width:Dimensions.get('window').width,
    height:100,
    marginTop:10,
    backgroundColor:"#fff",
    flexDirection:'row',
    alignItems:'center',
    padding:10
  },
  name:{
    fontSize:18,
    fontWeight:'600',
    marginLeft:20
  },
  desc:{
    marginLeft:20
  },
  price:{
    fontSize:18,
    fontWeight:'600',
    marginLeft:20,
    color:'green',
    marginTop:5
  }
})