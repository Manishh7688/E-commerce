import { View, Text, Modal , StyleSheet, Dimensions, TouchableOpacity, Image} from 'react-native'
import React from 'react'

const AskForLoginModal = ({visible, onClickLogin, onClickSignup,closeModal}) => {
  return (
    <Modal visible={visible} transparent>
        <View style={styles.modalView}>
            <View style={styles.mainView}>
            <TouchableOpacity onPress={closeModal}>
                <Image source={require('../images/clear.png')} style={{width:24, height:24,marginLeft:'auto', top:10, right:10}}/>
            </TouchableOpacity>
                <TouchableOpacity style={styles.btn} onPress={onClickLogin}>
                    <Text style={styles.btnText}>Login</Text>
                </TouchableOpacity>
               <Text style={{alignSelf:'center', fontSize:18,marginTop:10}}>OR</Text>
                <TouchableOpacity style={[styles.btn, {marginTop:10}]} onPress={onClickSignup}>
                <Text style={styles.btnText}>Create Account</Text>
                </TouchableOpacity>
            </View>
        </View>
    </Modal>
  )
}

export default AskForLoginModal
const styles = StyleSheet.create({
    modalView:{
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
        position:'absolute',
        top:0, 
        backgroundColor:'rgba(0,0,0,0.5)',
        justifyContent:'center',
        alignItems:'center'
    },
    mainView:{
        backgroundColor:'#fff',
        borderRadius:10,
        height:200,
        width:'90%',  
    },
    btn:{
        width:'80%',
        height:50,
        backgroundColor:'#fd9102',
        borderRadius:10,
        alignSelf:'center',
        marginTop:20,
        justifyContent:'center',
        alignItems:'center'
    },
    btnText:{
        color:'#fff',
        fontSize:18
    }
})