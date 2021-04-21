import React from "react";
import { StyleSheet, Text, View,Button,Image,TouchableOpacity } from 'react-native';
import {connect} from "react-redux";
import { signOut   } from "../redux/action";
import { DROPuserINFOANDEMAIl } from "../redux/actionUserInfo";
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';


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

  
class  Logout extends React.Component {
  
    constructor(props){
        super(props);
        this.SignOut=this.SignOut.bind(this);
        
    }
    componentDidMount(){
        
        this.SignOut();
        console.log('logout');
       
    }

    SignOut(){
      
      this.props.signOut();
      this.props.DROPuserINFOANDEMAIl();
       deleteValue();
       deleteUserInfo();
    }

    render(){
      
  
        return(
           null
           
           );
    }
}


const mapStateToProps = state => {
 
    return state;
  };

export default connect(mapStateToProps,{ signOut,DROPuserINFOANDEMAIl })(Logout);