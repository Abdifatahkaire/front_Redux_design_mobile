import React from "react";
import { StyleSheet, Text, View,Button,Image,TouchableOpacity } from 'react-native';
import {connect} from "react-redux";
import { signOut   } from "../redux/action";
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

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
        console.log(this.props.userToken);
    }

    SignOut(){
      
      this.props.signOut();
       deleteValue();
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

export default connect(mapStateToProps,{ signOut })(Logout);