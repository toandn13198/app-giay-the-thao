import React, { Component } from 'react';
import {  StyleSheet, Switch, Text, TextInput, View, Alert, TouchableOpacity, Image, TouchableHighlight, TouchableOpacityBase } from 'react-native';
import { Header } from './Components';

export default class Register extends Component {
    constructor(props){
        super(props)
        this.navigation=props.navigation
    }
    render(){
        return(
            <View style={style.contailer}>
                <Header title='Đăng Ký' navigation={this.navigation}/>
              
                <View>
                    <TextInput style={style.inPut} placeholder='Username'/>
                    <TextInput style={style.inPut} placeholder='Email address'/>
                    <TextInput style={style.inPut} placeholder='Password'/>
                </View>
                <TouchableOpacity onPress={()=>Alert.alert('Ban vua chm button')}>
                    <View style={style.Login}>
                        <Text style={style.textButton}>Đăng Ký</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

const style=StyleSheet.create({
    contailer:{
        flexDirection:'column',
        padding:10,
        backgroundColor:'#ff8b02',
        flex: 1,
    },
    
  
    inPut:{
        borderWidth:1,
        backgroundColor:'#f8f8f8',
        borderColor:'#dadada',
        borderRadius:15,
        padding:10,
        marginTop:24,
        marginBottom:12,
    },
   
        Login:{
            backgroundColor:'#077f7b',
            height:60, 
            borderRadius:15, 
            justifyContent:'center', 
            alignItems:'center',
            marginTop:24,
            position:'relative',
    },
    textButton:{
        color:'white',
        fontWeight:'bold',
        fontSize:20,
    },
    iconButton:{
        position:'absolute',
        left:20,
        width:30,
        height:30,
        borderRadius:5
    },
    underButton:{
        flexDirection:'row',
        justifyContent:'center',
        marginTop:24,
    }


})