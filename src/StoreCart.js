import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity,Image, FlatList,Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Header } from './Components';
import { connect } from 'react-redux';

function currencyFormat(num) {
    return num.toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')+' đ'
 }

class StoreCart extends Component{
    constructor(props){
        super(props);
        this.navigation=props.navigation;
        // console.log(props.ProductList)
    }
    removefromCart=(id_pro,color_pro,size_pro)=>{
        this.props.dispatch({
            type:'REMOVE_FROM_CART',
            data:{
                id:id_pro,
                color:color_pro,
                size:size_pro
            } 
        })
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
    
    render(){


        let totalPayment=(
            <View style={styles.totalPrice}>
            <TouchableOpacity onPress={()=>this.navigation.navigate('PaymentStack')}>
                <Text>Tổng thanh toán: {currencyFormat(this.totalPrice())} </Text>
            </TouchableOpacity>
        </View>
        )
        const showtotalPayment=this.props.ProductList.length!=0?totalPayment:<Text style={{alignSelf:'center', marginBottom:20}}>Bạn chưa mua gì cả:((</Text>
        const renderItem=({item})=>(
            <View style={styles.itemProduct} >
                    <TouchableOpacity style={styles.iconClose} onPress={()=>this.removefromCart(item.id,item.color,item.size)}>
                        <MaterialCommunityIcons  name="close-circle-outline" size={20} color="grey" />
                    </TouchableOpacity>
                    <Image style={styles.imgItemProduct} source={{uri:item.img}}/>
                    <View style={styles.infoItem}>
                        <TouchableOpacity onPress={()=>this.navigation.navigate('ProductdetailStack',{product_id:item.id})}>
                            <Text style={styles.txtNameItem} numberOfLines={2}>{item.name}</Text>
                        </TouchableOpacity>
                        <Text style={{color:'#fc0356'}}>{currencyFormat(item.price)}</Text>
                        <Text >{item.color}/{item.size}</Text>
                        <View style={styles.numberproduct}>
                            <TouchableOpacity onPress={()=>this.changeQuantily('-',item.id,item.color,item.size)} style={styles.btnNumProduct} ><Text>-</Text></TouchableOpacity>
                                <Text>{item.num}</Text>
                            <TouchableOpacity onPress={()=>this.changeQuantily('+',item.id,item.color,item.size)}  style={[styles.btnNumProduct,{marginLeft:10}]}><Text>+</Text></TouchableOpacity>
                        </View>
                    </View>
                 </View>
                
        )

        
        return(
            <View style={styles.container}>
                <Header title='Giỏ Hàng' navigation={this.navigation}/>
                <FlatList
                     data={this.props.ProductList}
                     renderItem={renderItem}
                     keyExtractor={item => item.name+item.color+item.size}
                     numColumns={1}
                     horizontal={false}
                     showsHorizontalScrollIndicator={false}
                     showsVerticalScrollIndicator={false}
                />
               {showtotalPayment}
            </View>
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
    itemProduct:{
        width:'100%',
        padding:5,
        backgroundColor:'#fff',
        flexDirection:'row',
        borderRadius:10,
        justifyContent:'flex-start',
        marginTop:10,  
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
        marginTop:10,
        marginBottom:10,
        bottom:0,
        width:'100%',
        backgroundColor:'#fff',
        padding:10,
        borderRadius:10,
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