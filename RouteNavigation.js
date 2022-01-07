import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/Home';
import InfoUser from './src/InfoUser';
import ProductDetail from './src/ProductDetail';
import StoreCart from './src/StoreCart';
import User from './src/User';
import HistoryBuy from './src/HistoryBuy';
import Login from './src/Login';
import Register from './src/Register'
import Payment from './src/Payment';
const Stack = createNativeStackNavigator();

const TabHome=()=>{
    return (
        <Stack.Navigator initialRouteName='HomeStack'>
            <Stack.Screen name='HomeStack' component={Home} options={{ headerShown: false }} />
            <Stack.Screen name='ProductDetail' component={ProductDetail}  options={{ headerShown: false }}/> 
        </Stack.Navigator> 
        )
  }
export {TabHome}

const TabStore=()=>{
    return (
        <Stack.Navigator initialRouteName='StoreStack'>
            <Stack.Screen name='StoreStack' component={StoreCart} options={{ headerShown: false }} />
            <Stack.Screen name='ProductdetailStack' component={ProductDetail}  options={{ headerShown: false }}/> 
            <Stack.Screen name='PaymentStack' component={Payment}  options={{ headerShown: false }}/> 
        </Stack.Navigator> 
    )
  }
export {TabStore}

const TabProfile=()=>{
    return (
        <Stack.Navigator initialRouteName='UserStack'>
            <Stack.Screen name='UserStack' component={User} options={{ headerShown: false }} />
            <Stack.Screen name='InfoUserStack' component={InfoUser}  options={{ headerShown: false }}/> 
            <Stack.Screen name='HistoryStack' component={HistoryBuy}  options={{ headerShown: false }}/> 
            <Stack.Screen name='LoginStack' component={Login} options={{ headerShown: false }} />
            <Stack.Screen name='RegisterStack' component={Register} options={{ headerShown: false }} />
        </Stack.Navigator> 
    )
  }
export {TabProfile}