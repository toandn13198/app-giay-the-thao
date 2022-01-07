import React, {Component} from 'react';
import { StyleSheet, Text, View,TextInput, TouchableOpacity,Image, FlatList, Alert } from 'react-native';
import {  Fontisto, MaterialIcons  } from '@expo/vector-icons';
import { moneyFormat,sale,loading } from './Components';
import { getStoreCart } from '../AsynStore';
import { connect } from 'react-redux';

class Home extends Component{

    constructor(props){
        super(props);
        this.navigation=this.props.navigation;
        this.route=this.props.route;
        this.state = {
            Data:[],
            loading:true,
        }
    }
    
    async getProductApi() {
        try {
          const response = await fetch('http://'+this.props.ip+'/api/public/api/home');
          const data = await response.json();
          this.setState({Data:data}) 
        } catch (error) {
          console.log(error);
        } finally {
          this.setState({ loading: false });
        }
      }

    componentDidMount(){
        this.getProductApi();
        getStoreCart().then(itemCart=>console.log(itemCart))
    }
    
    render(){
        const renderItemProduct = ({item}) => (
            <View style={styles.itemProduct}>
                <Text style={styles.sale}>{sale(item.price,item.old_price)}</Text>
                <TouchableOpacity
                    onPress={()=>this.navigation.navigate('ProductDetail',{product_id:item.id})}
                >
                <View style={styles.imgItemProdcut}>
                    <Image resizeMode='contain' style={{resizeMode:'stretch',width:'100%', height:'100%'}} source={{uri:item.image}}/>
                </View>
                <View style={styles.infoItem}>
                    <Text style={{fontSize:15,fontWeight:'600'}} numberOfLines={1}>{item.name_product}</Text>
                    <Text style={{fontSize:12}}>{moneyFormat(item.price)}</Text>
                </View>
                </TouchableOpacity>
            </View>
          );

          const renderCatagory = ({item})=>(
            <View style={styles.section}>
            {/* section title */}
                <View style={styles.sectionTitle}>
                    <Text style={styles.textTitle}>{item.catagory_name}</Text>
                    <TouchableOpacity
                        onPress={()=>Alert.alert('xem them')}
                    >
                        <MaterialIcons style={{paddingLeft:20}} name="navigate-next" size={24} color="#ff8b02" />
                    </TouchableOpacity>    
                </View>
                {/* section body */}
                <View style={styles.sectionBody}>
                    <FlatList
                                data={item.product}
                                renderItem={renderItemProduct}
                                keyExtractor={item => item.id}
                                numColumns={2}
                                horizontal={false}
                                showsHorizontalScrollIndicator={false}
                                showsVerticalScrollIndicator={false}
                            />         
                </View>       
                {/* sectin footer */}
                <View style={styles.sectionFooter}>
                </View>
            </View>
          );
          let product=(
            <View style={styles.container}>
                  {/* top */}
                <View style={styles.top}>
                    <View style={styles.searhTop}>
                        <TextInput style={styles.inputSerachTop} placeholder='Tim kiem...'  placeholderTextColor="#ff8b02" keyboardType='default'/>
                        <TouchableOpacity style={styles.iconInputSearch}>
                            <Fontisto  name="search" size={20} color="#ff8b02" />
                        </TouchableOpacity>
                    </View> 
                </View>
                {/* endtop---------------------------------------------------------------------- */}
                <FlatList
                    data={this.state.Data}
                    renderItem={renderCatagory}
                    keyExtractor={item => item.id_catagory}
                    horizontal={false}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                />
            </View>
            )
            const main=this.state.loading?loading:product;
        return(main)
    }
}


const styles=StyleSheet.create({
    container:{
        // paddingHorizontal:5,
        // backgroundColor:'#ff8b02',
        flexDirection:'column',
        flex:1,
    },
    top:{
        paddingVertical:10 ,
        backgroundColor:'#ff8b02',
        flexDirection:'row',
        paddingHorizontal:5
    },
    searhTop:{
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor:'#fff', 
        position:'relative',
        borderRadius:5,
        flex:1,
        backgroundColor:'red'
    },
    inputSerachTop:{
        borderRadius:5,
        borderColor:'#fff',
        paddingVertical:3,
        paddingHorizontal:10,
        backgroundColor:'#fff',
        flex: 1,
    },
    iconInputSearch:{
        paddingVertical:10,
        paddingHorizontal:10,
        position:'absolute',
        right:5,
        borderRadius:5,
        color:'#ff8b02'
    },
    section:{
        marginVertical:10,
        paddingHorizontal:1,
        backgroundColor:'#fff',
        borderRadius:5,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.41,
        shadowRadius: 9.11,
        elevation: 14,
    },
    sectionTitle:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingVertical:5,
        paddingLeft:5
    },
    textTitle:{
        color:'#ff8b02',
        fontSize:20,
        fontWeight:'900'
    },
    sectionBody:{
        marginTop:5,
    },
    sectionFooter:{

    },
    itemProduct:{
        marginHorizontal:2,
        flex:1,
        paddingHorizontal:1,
        marginBottom:5,
        borderColor:'#ff8b02',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.612,
        elevation: 1,
    },
    imgItemProdcut:{
        height:200,
        width:'100%',
        resizeMode:'cover',
    },
    infoItem:{
        padding:5,
    },
    sale:{
        position:'absolute',
        top:2,
        right:1,
        backgroundColor:'red',
        zIndex:1,
        paddingHorizontal:3,
        color:'#fff',
        fontSize:12,
        
    }
})
function mapStateToProps(state) {
    return {
        ip:state.ipConfig
    }
}
export default connect(mapStateToProps)(Home)