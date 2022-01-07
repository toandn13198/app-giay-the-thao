import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {TabHome,TabStore,TabProfile} from '../RouteNavigation';
import { MaterialIcons,FontAwesome    } from '@expo/vector-icons';
import { connect } from 'react-redux';

const Tab = createBottomTabNavigator();

 class Nav extends Component{
     constructor(props){
         super(props)
     }
     
    render(){
        const num=this.props.mystate.length

        return(
            <NavigationContainer>
        
            <Tab.Navigator 
              initialRouteName="Home"
              barStyle={{ backgroundColor: '#fff', }}
              screenOptions={{
                tabBarActiveTintColor: '#ff8b02',
                tabBarInactiveTintColor: 'gray',
                headerShown:false,
              }}
            >
              <Tab.Screen name="Home" component={TabHome} options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({ color }) => (
                  <MaterialIcons name="home" size={24} color={color} />
                ),}} 
              />
              <Tab.Screen name="Store" component={TabStore} options={{
                tabBarLabel: 'Store',
                tabBarIcon: ({ color }) => (
                  <MaterialIcons name="shopping-cart" size={24} color={color} />
                ),
                tabBarBadge:num}}
                />
                <Tab.Screen name="Profile" component={TabProfile} options={{
                tabBarLabel: 'User',
                tabBarIcon: ({ color }) => (
                  <FontAwesome name="user-circle-o" size={24} color={color} />
                ),}}
                />    
          </Tab.Navigator>
        </NavigationContainer>
        )
    }
}
function mapStateToProps(state){
    return {
        mystate:state.Cart
    }
}
export default connect(mapStateToProps)(Nav)