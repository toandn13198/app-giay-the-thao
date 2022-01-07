import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons';

export  function Header(props) {
    return (
        <View style={styles.header}>
              <TouchableOpacity style={styles.back}  onPress={()=>props.navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity> 
            <Text style={styles.txtHeader} >{props.title}</Text>
        </View> 
    )
}
export function moneyFormat(num) {
    return parseFloat(num).toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')+' đ'
}
export function sale(price,old_price) {
    return '-'+(((parseFloat(old_price)-parseFloat(price))/parseFloat(old_price))*100).toFixed()+'%'
}
export const loading=(
    <View style={{flexDirection:'column',justifyContent:'center',alignItems:'center',flex:1,}}><Text>LOADING...</Text></View>
)
const styles=StyleSheet.create({
    header:{
        width:'100%',
        height:40,
        flexDirection:'row',
        // backgroundColor:'#fff',
        marginVertical:10,
        alignItems:'center',
        justifyContent:'center'
    },
    txtHeader:{
        fontSize:20,
        fontWeight:'600',
        color:'#fff'
    },
    back:{
        position:'absolute',
        left:0,
        borderRadius:20,
        width:40,
        height:40,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:"#fff",
    opacity:0.3,
    },
})
