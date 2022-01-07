import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity,Image,TextInput,Alert } from 'react-native';
import Login from './Login';
import {MaterialIcons  } from '@expo/vector-icons';
import { Header } from './Components';
import { connect } from 'react-redux';

 class User extends Component{
    constructor(props){
        super(props)
        this.navigation=props.navigation
        this.state={
            email:'',
            pass:'',

        }
        
    }
    componentDidMount(){
        
    }

    render(){
        let logged=(
            <View style={styles.container}>
                <Header title='Tài Khoản' navigation={this.navigation} showback={true}/>
                <View style={styles.avatar}>
                    <Image style={styles.imgAvatar} source={{uri:'https://cdn.pixabay.com/photo/2021/11/25/09/28/amsterdam-6823002_960_720.jpg'}}/>
                    <Text style={styles.textAvatar}>ĐỖ NHƯ TOÀN</Text>
                </View>
                <View style={styles.body}>
                    <TouchableOpacity style={styles.navigation} onPress={()=>this.navigation.navigate('HistoryStack')} >
                        <Text style={styles.txtNavigation}>Lịch sử mua hàng</Text>
                        <MaterialIcons style={{paddingLeft:20}} name="navigate-next" size={24} color="#ff8b02" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.navigation} onPress={()=>this.navigation.navigate('InfoUserStack')}>
                        <Text style={styles.txtNavigation}>Thay đổi thông tin</Text>
                        <MaterialIcons style={{paddingLeft:20}} name="navigate-next" size={24} color="#ff8b02" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.props.dispatch({ type:'IS_LOGIN',setLogin:false})} style={styles.navigation}>
                        <Text style={styles.txtNavigation}>Đăng Xuất</Text>
                        <MaterialIcons style={{paddingLeft:20}} name="navigate-next" size={24} color="#ff8b02" />
                    </TouchableOpacity>
                </View>
            </View>
        )

        let login=(
            <View style={styles.container}>
                <Header title='Đăng Nhập' navigation={this.navigation} showback={true}/>
                <View>
                    <TextInput style={styles.inPut}
                        value={this.state.email}
                        onChangeText={(value)=>{this.setState({email:value})}}
                        placeholder='Username'/>
                    <TextInput style={styles.inPut}
                        onChangeText={(value)=>{this.setState({pass:value})}}
                        secureTextEntry={true}
                        placeholder='Password'/>
                </View>
                {/* <View style={styles.underInput}>
                    <TouchableOpacity style={{right:0,position:'absolute'}} onPress={()=>Alert.alert('Ban quen mk a?')}>
                        <Text style={{color:'#077f7b'}} >Quên mật khẩu!</Text>
                    </TouchableOpacity>
                </View> */}
                <TouchableOpacity onPress={()=>this.props.dispatch({
                    type:'IS_LOGIN',
                    setLogin:true
                })}>
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
        const main= this.props.mystate? logged:login;
        return(main)
    }
}

const styles=StyleSheet.create({
    container:{
        flexDirection:'column',
        flex:1,
        backgroundColor:'#ff8b02',
        paddingHorizontal:10
    },
    avatar:{
        paddingTop:50,
        width:'100%',
        height:'40%',
        justifyContent:'center',
        alignItems:'center',
        padding:10,
    },
    imgAvatar:{
        width:200,
        height:200,
        borderRadius:100,
        borderWidth:3,
        borderColor:'#fff'
    },
    textAvatar:{
        fontWeight:'bold',
        fontSize:25,
        color:'#fff',
    },
    body:{
       flex:1,
       backgroundColor:'#ff8b02',
       justifyContent:'center',
       alignItems:'center',
    //    paddingHorizontal:10,
    },
    navigation:{
        width:'100%',
        height:60,
        paddingHorizontal:15,
        backgroundColor:'#fff',
        borderRadius:30,
        marginTop:10,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    txtNavigation:{
        fontSize:20,
        fontWeight:'bold',
        color:'#ff8b02'
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
function mapStateToProps(state) {
    return {mystate:state.isLogin}
}

export default connect(mapStateToProps)(User)