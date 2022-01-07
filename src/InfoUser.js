import React, {Component} from 'react';
import { StyleSheet,TextInput, View, Button,Text, Alert} from 'react-native';
import { Header } from './Components';
import { loading } from './Components';
import { connect } from 'react-redux';


class InfoUser extends Component{
    constructor(props){
        super(props);
        this.navigation=props.navigation
        this.state={
            loading:true,
            User:{},
        }
    }
      async getInfoApi() {
        try {
          const response = await fetch('http://192.168.1.9/api/public/api/user/1');
          const data = await response.json();
          this.setState({User:data}) 
        } catch (error) {
          console.log(error);
        } finally {
          this.setState({ loading: false });
        }
      }


      async postInfoAPI(){
        fetch('http://'+this.props.ip+'/api/public/api/user/1', {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: this.state.User.name,
            sdt: this.state.User.sdt,
            email: this.state.User.email,
            address_oder: this.state.User.address_oder,
          })
        })
        .then((response) => response.json())
        .then((json) => {
          json.status===1?Alert.alert(
            "Thông báo",
            "Thay đổi thành công !",
            [
              {
                text: "Cancel",
                style: "cancel"
              },
              { text: "OK"}
            ]
          ):Alert.alert(
            "Thông báo",
            "Không được xử lý thành công !",
            [
              {
                text: "Cancel",
                style: "cancel"
              },
              { text: "OK" }
            ]
          )
        })
        .catch((error) => console.error(error))
        .finally();
      }

    componentDidMount(){
      this.getInfoApi()
    }
    
    render(){
        const {User}=this.state
        let showInfo=(
            <View style={styles.container}>
                <Header title='Thông Tin Cá Nhân' navigation={this.navigation}/>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Họ và tên"
                        keyboardType='default'
                        value={User.name}
                        onChangeText={(value)=>this.setState(prevState  => {
                            let User = { ...prevState.User };  // creating copy of state variable jasper
                            User.name = value;         // update the name property, assign a new value                 
                            return { User };                  // return new object jasper object
                          })
                        }
                    />
                      <TextInput
                        style={styles.input}
                        placeholder="Số điện thoại"
                        keyboardType='numeric'
                        value={User.sdt}
                        onChangeText={(value)=>this.setState(prevState  => {
                            let User = { ...prevState.User };  // creating copy of state variable jasper
                            User.sdt = value;         // update the name property, assign a new value                 
                            return { User };                  // return new object jasper object
                          })
                        }
                    />
                      <TextInput
                        style={styles.input}
                        placeholder="Email"
                        keyboardType='email-address'
                        value={User.email}
                        onChangeText={(value)=>this.setState(prevState  => {
                            let User = { ...prevState.User };  // creating copy of state variable jasper
                            User.email = value;         // update the name property, assign a new value                 
                            return { User };                  // return new object jasper object
                          })
                        }
                    />
                     <TextInput
                        style={styles.input}
                        placeholder="Địa chỉ nhận hàng"
                        keyboardType='email-address'
                        value={User.address_oder}
                        onChangeText={(value)=>this.setState(prevState  => {
                            let User = { ...prevState.User };  // creating copy of state variable jasper
                            User.address_oder = value;         // update the name property, assign a new value                 
                            return { User };                  // return new object jasper object
                          })
                        }
                    />
                    <Button
                        onPress={()=>this.postInfoAPI()}
                        title="Lưu thông tin"
                        // onPress={() => console.log(this.state.User)}
                    />
                </View>
            </View>
        )
        const main=this.state.loading?loading:showInfo
        return(   
            main
        )
    }
}

const styles=StyleSheet.create({
    container:{
        flexDirection:'column',
        flex:1,
        backgroundColor:'#ff8b02',
        paddingHorizontal:10
    },
    inputContainer:{
        flex:1,
       justifyContent:'center'
    },
    input:{
        height:40,
        backgroundColor:'#fff',
        padding:10,
        borderRadius:5,
        marginBottom:10
    },
    picker:{
        borderWidth:1,
        borderRightColor:'red'
    }
})
function mapSateToProps(state) {
  return {
    ip:state.ipConfig
  }
}

export default connect()(InfoUser)