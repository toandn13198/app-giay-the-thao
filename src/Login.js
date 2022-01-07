import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity,Alert,Switch,TextInput  } from 'react-native';

export default class Login extends Component{
    constructor(props){
        super(props)
        this.navigation=props.navigation
        this.state={
            email:'',
            pass
        }
    }
    render(){
        return(
            <View style={styles.container}>
                <View>
                    <TextInput style={styles.inPut} placeholder='Username'/>
                    <TextInput style={styles.inPut} secureTextEntry={true}  placeholder='Password'/>
                </View>
                <TouchableOpacity onPress={()=>Alert.alert('Ban vua chm button')}>
                    <View style={styles.Login}>
                        <Text style={styles.textButton}>Đăng Nhập</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.underButton}>
                    <Text style={{fontWeight:'bold'}}>Bạn chưa có tài khoản? </Text>
                    <TouchableOpacity onPress={()=>this.navigation.navigate('RegisterStack')}>
                        <Text style={{fontWeight:'bold', color:'#077f7b'}}>Đăng ký</Text>
                    </TouchableOpacity>  
                </View>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    container:{
        flexDirection:'column',
        flex:1,
        backgroundColor:'#ff8b02',
        paddingHorizontal:10,
        justifyContent:'center'
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
    underInput:{
        flexDirection:'row',
        position:'relative',
        alignItems:'center',
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
    underButton:{
        flexDirection:'row',
        justifyContent:'center',
        marginTop:24,
    }
})

