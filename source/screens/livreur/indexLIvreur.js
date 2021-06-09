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
import MyStackProfil from './profilTabs';
import Notification from './notification';
import Indexpages from './indexpages';

const Tabsbottom = createBottomTabNavigator();

export default function  IndexLivreur(){

    return(
        <Tabsbottom.Navigator 
     
     screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Indexpages') {
          iconName = focused ? <Image source={ImageMapgreen} /> : <Image source={ImageMapgray} /> ;
        } else if (route.name === 'Profile') {
          iconName = focused ? <Image source={ImageProfilgreen} /> : <Image source={ImageProfilgray} />;
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
        <Tabsbottom.Screen name="Indexpages" component={Indexpages} />
        <Tabsbottom.Screen name="Profile" component={MyStackProfil} />
      </Tabsbottom.Navigator>
     
    );
}
