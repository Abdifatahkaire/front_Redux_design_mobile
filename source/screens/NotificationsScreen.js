import React from "react";
import { StyleSheet,ScrollView,SafeAreaView ,StatusBar,Alert, Text,TextInput, View,Button,Image,TouchableOpacity } from 'react-native';

import {connect} from "react-redux";
import { signIn,restoreToken  } from "../redux/action";
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import jwtDecode from 'jwt-decode';
import { DROPuserINFOANDEMAIl } from "../redux/actionUserInfo";


async function saveUserInfo(value) {
  await SecureStore.setItemAsync('userInfo', JSON.stringify(value));
}

async function getUserInfo() {
  let result = await SecureStore.getItemAsync('userInfo');
   
  if(result){
     return result;
  }
  else{
      return null;
  }

}

async function deleteUserInfo() {
  await SecureStore.deleteItemAsync('userInfo');
}


async function save(value) {
    await SecureStore.setItemAsync('userToken', value);
  }
  
  async function getValueFor() {
    let result = await SecureStore.getItemAsync('userToken');
     
    if(result){
       return result;
    }
    else{
        return null;
    }
  
  }
  
  
  async function deleteValue() {
    await SecureStore.deleteItemAsync('userToken');
  }


class  NotificationsScreen extends React.Component {
  
    constructor(props){
        super(props);
        this.VerifyTokenValud=this.VerifyTokenValud.bind(this);
    }

    componentDidMount(){
       
        console.log('NotificationsScreen');
   
       this.VerifyTokenValud();
        
    }
   
    async VerifyTokenValud() {
        let token = await getValueFor();
       
        if(token!==null){
           if(jwtDecode(token).exp < Date.now() / 1000) {
             deleteValue();
             deleteUserInfo();
             console.log('token exist mais not valide');
             console.log(token);
          
             this.props.restoreToken(null);
             this.props.DROPuserINFOANDEMAIl();
           }else{
             console.log('token exist mais valide');
             this.props.restoreToken(token);
             console.log(token);
           }
        }
        else{
         console.log(token);
        
        }
       }
    

    render(){
     
       
        return(
            <View>
                <Text>NotificationsScreen !</Text>
                
            </View>
           );
    }
}


const mapStateToProps = state => {
 
    return state;
};

export default connect(mapStateToProps,{ restoreToken,DROPuserINFOANDEMAIl })(NotificationsScreen);
