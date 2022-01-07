import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity,FlatList } from 'react-native';
import {MaterialIcons  } from '@expo/vector-icons';
import { Header } from './Components';

function currencyFormat(num) {
    return num.toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')+' đ'
 }


const ProductList=[
    {
        id:1,
        price:200,
        info:'Adidas boot 2021 Adidas boot 2021 Adidas boot 2021 Adidas boot 2021',
        status:'đã tiếp nhận',
        date:'2021-12-12'
    },
    {
        id:2,
        price:210,
        info:'Adidas Neo 2020',
        status:'đã giao thành công',
        date:'2021-12-12'
    },
    {
        id:3,
        price:350,
        info:'Adidas Alphalbest 2019',
        status:'đang giao',
        date:'2021-12-12'
    },
    {
        id:2,
        price:210,
        info:'Adidas Neo 2020',
        status:'đã giao thành công',
        date:'2021-12-12'
    },
    {
        id:3,
        price:350,
        info:'Adidas Alphalbest 2019',
        status:'đang giao',
        date:'2021-12-12'
    }, 
{
    id:2,
    price:210,
    info:'Adidas Neo 2020',
    status:'đã giao thành công',
    date:'2021-12-12'
},
{
    id:3,
    price:350,
    info:'Adidas Alphalbest 2019',
    status:'đang giao',
    date:'2021-12-12'
},
{
    id:2,
    price:210,
    info:'Adidas Neo 2020',
    status:'đã giao thành công',
    date:'2021-12-12'
},
{
    id:3,
    price:350,
    info:'Adidas Alphalbest 2019',
    status:'đang giao',
    date:'2021-12-12'
}, 
]



export default class HistoryBuy extends Component{
    constructor(props){
        super(props);
        this.navigation=props.navigation;
        this.state={
            totalPrice:ProductList.reduce((accumulator, current) => accumulator + current.price, 0)
        }
    }
    
    render(){
        const renderItem=({item})=>(
            <TouchableOpacity onPress={()=>this.navigation.navigate('ProductdetailStack')}>
            <View style={styles.itemProduct} >
                <View style={styles.info}>
                        <Text style={styles.txtDate}>{item.date}</Text>
                        <Text style={{color:'#fc0356'}}>Tổng thanh toán: {currencyFormat(item.price)}</Text>
                        <Text numberOfLines={1}>4 sản phẩm: {item.info}</Text>
                        <Text>{item.status}</Text>
                </View>
                <MaterialIcons name="navigate-next" size={24} color="#ff8b02" />
            </View>
            </TouchableOpacity>
        )
        return(
            <View style={styles.container}>
                <Header title='Lịch sử mua hàng' navigation={this.navigation}/>
                <FlatList
                     data={ProductList}
                     renderItem={renderItem}
                     keyExtractor={item => item.id}
                     numColumns={1}
                     horizontal={false}
                     showsHorizontalScrollIndicator={false}
                     showsVerticalScrollIndicator={false}
                />
            </View>
        )
    }
}

const styles=StyleSheet.create({
    container:{
        flexDirection:'column',
        flex:1,
        backgroundColor:'#ff8b02',
        padding:10
    },
    itemProduct:{
        width:'100%',
        padding:5,
        paddingLeft:20,
        backgroundColor:'#fff',
        flexDirection:'row',
        borderRadius:10,
        justifyContent:'flex-start',
        marginTop:3,  
        alignItems:'center'
    },
    txtDate:{
        fontSize:15,
        fontWeight:'bold',
        color:'grey'
    },
    info:{
        width:'90%',

    },
})