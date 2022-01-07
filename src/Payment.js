import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity,Image, FlatList,Alert, } from 'react-native';
import { Header } from './Components';
import { connect } from 'react-redux';

function currencyFormat(num) {
    return num.toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')+' đ'
 }

class StoreCart extends Component{
    constructor(props){
        super(props);
        this.navigation=props.navigation;
    }
    
    componentDidMount(){

    }
    removefromCart=(id_pro,color_pro,size_pro)=>{
        this.navigation.goBack()
    }
    totalPrice=()=>{
        return this.props.ProductList.reduce((accumulator, current) => accumulator + current.price*current.num, 0)
    }
    changeQuantily=(active,id_pro,color_pro,size_pro)=>{
        if(active=='+'){
            this.props.dispatch({
                type:'ADD_QUANTILY',
                data:{
                    id:id_pro,
                    color:color_pro,
                    size:size_pro
                }
            })
         }
         if(active=='-'){
            this.props.dispatch({
                type:'SUB_QUANTILY',
                data:{
                    id:id_pro,
                    color:color_pro,
                    size:size_pro
                }
            })
         }
    }
    remoAllCart=()=>{
        this.props.dispatch({
            type:'REMOVE_ALL_CART',
        })
        this.jumpToHistory()
    }
    payment=()=>{
            Alert.alert(
                "Thành công",
                "Bạn đã đặt hàng thành công !",
                [
                  { text: "OK", onPress: () =>this.remoAllCart()}
                ]
              )
             
    }
     jumpToHistory = ()=> this.navigation.navigate('HistoryStack');
    
    render(){
        const renderItem=({item})=>(
            <View style={styles.itemProduct} >
                    <Image style={styles.imgItemProduct} source={{uri:item.img}}/>
                    <View style={styles.infoItem}>
                        <TouchableOpacity onPress={()=>this.navigation.navigate('ProductdetailStack',{product_id:item.id})}>
                            <Text style={styles.txtNameItem} numberOfLines={2}>{item.name}</Text>
                        </TouchableOpacity>
                        <Text style={{color:'#fc0356'}}>{currencyFormat(item.price)}</Text>
                        <Text >{item.color}/{item.size} x {item.num}</Text>
                    </View>
                 </View>
        )
        return(
            <View style={styles.container}>
                <Header title='Thanh Toán' navigation={this.navigation}/>
                <FlatList
                     data={this.props.ProductList}
                     renderItem={renderItem}
                     keyExtractor={item => item.name+item.color+item.size}
                     numColumns={1}
                     horizontal={false}
                     showsHorizontalScrollIndicator={false}
                     showsVerticalScrollIndicator={false}
                />
                <View style={[styles.totalPrice,{alignItems:'flex-start'}]}>
                    <Text>Đỗ Như Toàn - 0337690505</Text>
                    <Text>dotoan13198hd@gmail.com</Text>
                    <Text>Địa chỉ: Xóm 2 Tứ Cường - An Phượng - Thanh Hà - Hải Dương</Text>
                    <Text>Số tiền: {currencyFormat(this.totalPrice())}</Text>
                   <TouchableOpacity onPress={()=>this.payment()} style={{width:'100%', backgroundColor:'#ff8b02', borderRadius:10,marginTop:10,paddingVertical:5}}>
                       <Text  style={{alignSelf:'center',color:'#fff'}}>Đặt hàng</Text>
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
        backgroundColor:'#fff',
        paddingHorizontal:10
       
    },
    itemProduct:{
        width:'100%',
        padding:5,
        backgroundColor:'#fff',
        flexDirection:'row',
        // borderRadius:10,
        justifyContent:'flex-start',
        // marginTop:1,  
        borderBottomColor:'grey',
        borderBottomWidth:0.5
    },
    imgItemProduct:{
        width:'28%',
        height:100,
        borderRadius:5,
        marginRight:10
    },
    infoItem:{
        width:"60%",
        justifyContent:'space-between'
    },
    txtNameItem:{
        fontSize:18,
        fontWeight:'bold',
        color:'grey'
    },
    numberproduct:{
        flexDirection:'row',
    },
    btnNumProduct:{
        paddingHorizontal:15,
        backgroundColor:'#c9c3c3',
        marginRight:10,
        borderRadius:5,
        opacity:0.5
    },
    iconClose:{
        position:'absolute',
        right:5,
        top:5,
        borderRadius:10
    },
    totalPrice:{
        // position:'absolute',
        marginTop:3,
        marginBottom:5,
        bottom:0,
        width:'100%',
        backgroundColor:'#fff',
        padding:10,
        // borderRadius:10,
        justifyContent:'center',
        alignItems:'center'
    },
   


})
function mapStateToProps(state) {
    return {
        ProductList:state.Cart
    }
    
}
export default connect(mapStateToProps)(StoreCart)