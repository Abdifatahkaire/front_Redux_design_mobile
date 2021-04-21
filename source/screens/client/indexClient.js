import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';


import { StyleSheet, Text, View,Button,Image,TouchableOpacity } from 'react-native';
import {connect} from "react-redux";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ImageListegreen from '../../Image/liste.png';
import ImageListegray from '../../Image/liste_gray.png';

import ImageMapgreen from '../../Image/map_ills1.png';
import ImageMapgray  from '../../Image/map_ills1_gray.png';

import ImageProfilgray from '../../Image/Profil_ills1_gray.png';
import ImageProfilgreen from '../../Image/Profil_ills1.png';

import Liste from './liste';
import Profil from './profil';
import Map from './map';


const Tabsbottom = createBottomTabNavigator();


export default function IndexClient(){

    return(
        <Tabsbottom.Navigator 
     
     screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Map') {
          iconName = focused ? <Image source={ImageMapgreen} /> : <Image source={ImageMapgray} /> ;
        } else if (route.name === 'Profile') {
          iconName = focused ? <Image source={ImageProfilgreen} /> : <Image source={ImageProfilgray} />;
        }
        else if(route.name === 'Liste'){
          iconName = focused ? <Image source={ImageListegreen} /> : <Image source={ImageListegray} />;
        }

        // You can return any component that you like here!
        return iconName;
      },
    })}

    tabBarOptions={{
      activeTintColor: '#63ff9a',
      inactiveTintColor: 'gray',
      keyboardHidesTabBar: true
    }}
    
     
     >
        <Tabsbottom.Screen name="Map" component={Map} />
        <Tabsbottom.Screen name="Liste"  component={Liste} options={{ tabBarBadge: 5 }}/>
        <Tabsbottom.Screen name="Profile" component={Profil} />
       
      </Tabsbottom.Navigator>
     

    );
}
