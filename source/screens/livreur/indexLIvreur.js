import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, View,Button,Image,TouchableOpacity } from 'react-native';
import {connect} from "react-redux";

import ImageNotificationgreen from '../../Image/notification_ills1.png';
import ImageNotificationgray from '../../Image/notification_ills1_gray.png';

import ImageMapgreen from '../../Image/map_ills1.png';
import ImageMapgray  from '../../Image/map_ills1_gray.png';

import ImageProfilgray from '../../Image/Profil_ills1_gray.png';
import ImageProfilgreen from '../../Image/Profil_ills1.png';


import Map from './map';
import Profil from './profil';
import Notification from './notification';

const Tabsbottom = createBottomTabNavigator();

export default function  IndexLivreur(){

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
        else if(route.name === 'Notification'){
          iconName = focused ? <Image source={ImageNotificationgreen} /> : <Image source={ImageNotificationgray} />;
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
       
        <Tabsbottom.Screen name="Profile" component={Profil} />
      </Tabsbottom.Navigator>
     
    );
}
