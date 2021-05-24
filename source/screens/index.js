import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import {  BottomTabBar } from 'react-navigation-tabs';
import { StyleSheet, Text, View,Button,Image,TouchableOpacity } from 'react-native';

import {connect} from "react-redux";
import { restoreToken  }  from '../redux/action';
import { DROPuserINFOANDEMAIl } from "../redux/actionUserInfo";

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import IndexLivreur from './livreur/indexLIvreur';
import IndexClient from './client/indexClient';



const Tab = createBottomTabNavigator();



class Index extends React.Component {

   constructor(props){
      super(props);
   }

    render(){
      console.log('user infos index generale:',this.props.User_Info.typeUser);
        return(
            <View style={{marginTop:30,flex:1}}>
                {this.props.User_Info.typeUser === 'livreur' ? (<IndexLivreur />) : (<IndexClient />)}
            </View>
          
        );
    }
}


const mapStateToProps = state => {
 
  
   
    return state;
  };

export default connect(mapStateToProps,{ restoreToken,DROPuserINFOANDEMAIl  })(Index);

