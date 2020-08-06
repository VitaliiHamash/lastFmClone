import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import{StatusBar} from 'react-native'

import coctailList from './app/src/coctailList'
import filters from './app/src/filters'
import DetailScreen from './app/src/DetailScreen'

import {createStackNavigator} from '@react-navigation/stack'
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

import Icon from 'react-native-vector-icons/FontAwesome5';


const MaterialBottomTabs = createMaterialBottomTabNavigator();

const Stack = createStackNavigator();


const StackNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
        <Stack.Screen
        name="Drinks"
        component={coctailList}
    
       />
      <Stack.Screen
          name="Detail"
          component={DetailScreen}
          options={{
          title: "Detail"
          }}
      />
</Stack.Navigator>
  )
}

export default class App extends Component {
  render() {
    return (
      
      <NavigationContainer>
        <StatusBar backgroundColor="#1b1b49"/>
                      <MaterialBottomTabs.Navigator
                                  initialRouteName="Home"
                                  activeColor="#f0edf6"
                                  inactiveColor="#3e2465"
                                  barStyle={{ backgroundColor: '#fa926f' }}>
                                              <MaterialBottomTabs.Screen
                                              name="Food Form"
                                              children={StackNavigation}
                                              options={{tabBarLabel: 'Главная',
                                              tabBarIcon: () => (
                                                  <Icon style={[{ color: '#1b1b49' }]} size={19} name={'play'} />
                                              ),}}
                                              />
                                              
                                              <MaterialBottomTabs.Screen
                                              name="Food List"
                                              component={filters}
                                              options={{tabBarLabel: 'Поиск треков',
                                              tabBarIcon: () => (
                                                  <Icon style={[{ color: '#1b1b49' }]} size={20} name={'music'} />
                                              ),}}
                                              />
                          </MaterialBottomTabs.Navigator>
                        
      </NavigationContainer>
    )
  }
}