import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity,Image, ScrollView, Dimensions,TouchableWithoutFeedback, Alert } from 'react-native';
import { Octicons,Ionicons,  } from '@expo/vector-icons';
import { Button } from 'react-native-paper';
import { moneyFormat,sale,loading } from './Components';
import { connect } from 'react-redux';



const WIDTH=Dimensions.get('window').width;
const HEIGHT=Dimensions.get('window').height;

class ProductDetail extends Component{
    
    constructor(props){

        super(props);
        this.navigation=this.props.navigation;
        this.route=this.props.route;

        this.state={
            product_id:this.route.params.product_id,
            product:[],
            slide:[],
            colors:[],
            size:[],
            imgActive:0,
            oder_product:{ checkColor:null, checkSize:null,number:1,price:null},
            loading:true      
        }
       
    }
    async getProduct() {
        try {
          const response = await fetch('http://'+this.props.ip+'/api/public/api/product/'+this.state.product_id);
          const data = await response.json();
          this.setState({product:data})
          this.setState({slide:data.slide})
          this.setState({colors:data.colors})
          this.setState({size:data.size})
          this.setState({checkColor:data.colors[0].color})
          this.setState({checkSize:data.size[0]}) 
        } catch (error) {
          console.log(error);
        } finally {
          this.setState({ loading: false });
        }
      }

    componentDidMount(){
        this.getProduct();  
    }
   
    onChangeSlide=(nativeEvent)=>{
        if(nativeEvent){
        }
        const sli= Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
        if(sli!=this.state.imgActive){
            this.setState({imgActive:sli})
        }
    }

    changeQuantity=(active='+')=>{
            if(active=='-'&&this.state.number>1){
                let number=--this.state.oder_product.number;
                 this.setState({number:number})
             
             }
             if(active=='+'){
                let number=++this.state.oder_product.number;
                this.setState({number:number})
             }   
    }
    addtoCart=()=>{
        this.props.dispatch(
            {type:'ADD_TO_CART',data:{
                id:this.state.product_id,
                color:this.state.checkColor,
                size:this.state.checkSize,
                num:this.state.oder_product.number,
                price:this.state.product.price,
                name:this.state.product.name_product,
                img:this.state.product.image,
            }}
        )
    }
    buyNow=()=>{
        this.addtoCart();
        this.navigation.navigate('StoreStack')
    }

    checkLogin=(act=1)=>{
        // act?this.buyNow():this.addtoCart();
        return this.props.mystate?  act?this.buyNow():this.addtoCart() : Alert.alert('Đăng nhập để mua !');
    }
    
    render(){
        
    const {product,checkColor,slide,colors,size,checkSize}=this.state

       let renderImg=slide.map((e,i)=>(
           <Image 
                key={i}
                resizeMode='stretch'
                style={styles.wrapSlide}
                source={{uri:e}}
           />
       ))

       let rederDot=slide.map((e,i)=>(
        <Octicons  key={i} name="primitive-dot" size={this.state.imgActive==i? 24 : 19} style={styles.Dot} color={this.state.imgActive==i?'grey':'#fff'} style={styles.Dot} />
       ))

       let renderColorProduct=colors.map((e,i)=>(
        <TouchableWithoutFeedback key={i} onPress={()=>this.setState({checkColor:e.color})}>
             <Image
             key={i}
                style={{
                width:50,
                height:50,
                borderRadius:5,
                marginRight:10,
                marginBottom:10,
                borderWidth:checkColor==e.color? 2 : 0,
                borderColor:checkColor==e.color? '#ff8b02':'#fff',
                }} source={{uri:e.img}}/>
        </TouchableWithoutFeedback>      
       ))

       let renderSizeProduct=size.map((e,i)=>(
        <TouchableWithoutFeedback key={i} onPress={()=>this.setState({checkSize:e})}>
            <Text
            key={i}
             style={{paddingHorizontal:10,
                marginRight:10,
                borderRadius:5,
                borderWidth:1,
                borderColor:checkSize==e? '#ff8b02':'grey',
                backgroundColor:checkSize==e? '#ff8b02':'#fff',
                color:checkSize==e? '#fff':'black',
                }}>{e}</Text>
        </TouchableWithoutFeedback>      
       ))

       let showProduct=(
                <View style={styles.container}>
                <TouchableOpacity style={styles.back}  onPress={()=>this.navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity> 
            <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                {/* slider */}
                <View style={styles.wrapSlide}>
                    <ScrollView 
                        showsHorizontalScrollIndicator={false}
                        onScroll={({nativeEvent})=>this.onChangeSlide(nativeEvent)}
                        pagingEnabled
                        horizontal
                        style={styles.wrapSlide}>
                        {renderImg}
                    </ScrollView>
                    <View style={styles.wrapDot}>
                        {rederDot}
                    </View>
                </View>
                {/* end slider------------------------------------------------ */}
                {/* info */}
                <View style={styles.infoProduct}>
                    <Text style={styles.nameProduct}>{product.name_product}</Text>
                    <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'flex-end'}}>
                        <Text style={styles.priceProduct}>{moneyFormat(product.price)}</Text>
                        <Text style={styles.oldPriceProduct}>{moneyFormat(product.old_price)}</Text>
                        <View style={{backgroundColor:'#fff0f1',paddingHorizontal:5,borderRadius:5,borderWidth:1,borderColor:'#fc0356',marginBottom:3}}><Text style={{color:'#fc0356'}}>{sale(product.price,product.old_price)}</Text></View>
                    </View>
                    {/* type Product */}
                    <View style={styles.typeProduct}>
                    <Text style={{marginBottom:5}}>{checkColor}/{checkSize}</Text>
                        <Text style={{marginBottom:5}}>Màu sắc:</Text>
                        <View style={styles.colorProduct}>
                            {renderColorProduct}
                        </View>
                        <Text style={{marginBottom:5}}>Size:</Text>
                        <View style={styles.sizeProduct}>
                            {renderSizeProduct}
                        </View>
                        <Text style={{marginBottom:5}}>Số Lượng:</Text>
                        <View style={styles.sizeProduct}>
                            <TouchableOpacity onPress={()=>this.changeQuantity('-')} style={styles.btnNumProduct}><Text>-</Text></TouchableOpacity>
                                <Text>{this.state.oder_product.number}</Text>
                            <TouchableOpacity onPress={()=>this.changeQuantity()} style={[styles.btnNumProduct,{marginLeft:10}]}><Text>+</Text></TouchableOpacity>
                        </View>
                </View>
                {/* end type Product */}
                    <View style={styles.buttonOder}>
                        <Button onPress={()=>this.checkLogin()} style={styles.button}><Text style={{color:'white'}}>Mua Ngay</Text></Button>
                        <Button onPress={()=>this.checkLogin(0)} style={[styles.button,{backgroundColor:'#d15a5a'}]}><Text style={{color:'white'}}>Thêm Vào Giỏ</Text></Button>
                    </View>
                        <View style={[styles.description,styles.typeProduct]}>
                            <Text style={{marginBottom:10, fontWeight:'bold'}}>Mô tả sản phẩm:</Text>
                            <Text>{product.description}</Text>
                        </View>
                    </View>
                {/* end info___________________________________________________ */}
            </ScrollView>
            </View>
       )
       const main=this.state.loading? loading:showProduct
        return(main)
    }
}

const styles=StyleSheet.create({
    container:{
        flexDirection:'column',
        flex:1,
        // backgroundColor:'ff8b02'
    },
    back:{
        position:'absolute',
        zIndex:1,
        top:10,
        left:10,
        backgroundColor:"#fff",
        opacity:0.3,
        width:30,height:30,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:15
    },
    titlePage:{
        padding:10,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor:'#ff8b02'

    },
    wrapSlide:{
        width:WIDTH,
        height:HEIGHT * 0.5,
        backgroundColor:'#fff'
    },
    wrapDot:{
        position:'absolute',
        bottom:0,
        flexDirection:'row',
        alignSelf:'center',
        alignItems:'center',
    },
    Dot:{
        margin:2,
        opacity:0.5
    },
    infoProduct:{
        width:WIDTH,
        paddingVertical:10,
        paddingHorizontal:10,
    },
    nameProduct:{
        fontSize:15, 
        marginBottom:5
    },
    priceProduct:{
        fontSize:23,
        fontWeight:'bold',
        color:'#fc0356',
        marginRight:5
    },
    oldPriceProduct:{
        fontSize:15,
        color:'#969090',
        textDecorationLine:'line-through',
        paddingBottom:2,
        marginRight:5
    },
    typeProduct:{
        padding:10,
        borderWidth:0.5,
        borderRadius:5,
        borderColor:'grey',
        flexDirection:'column',
        marginTop:10
    },
    colorProduct:{
        flexDirection:'row',
        flexWrap:'wrap',
    },
    sizeProduct:{
        flexDirection:'row',
        flexWrap:'wrap',
        marginBottom:5
    },
    btnNumProduct:{
        paddingHorizontal:15,
        backgroundColor:'#c9c3c3',
        marginRight:10,
        borderRadius:5
    },
    buttonOder:{
        marginTop:10,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
    },
    button:{
        backgroundColor:'#ff8b02',
        flex:1,
    },
    description:{
        flexDirection:'column'
    }

})

function mapStateToProps(state) {
    return {
        mystate:state.isLogin,
        ip:state.ipConfig,
        
    }
}

export default connect(mapStateToProps)(ProductDetail)