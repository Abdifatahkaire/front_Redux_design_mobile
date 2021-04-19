import React from "react";
import { StyleSheet, Text, View,Button,Image,TouchableOpacity } from 'react-native';
import {connect} from "react-redux";
import { signOut,restoreToken   } from "../redux/action";
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import jwtDecode from 'jwt-decode';



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


class  Home extends React.Component {
  
    constructor(props){
        super(props);
        this.SignOut=this.SignOut.bind(this);
        this.VerifyTokenValud=this.VerifyTokenValud.bind(this);
    }

    componentDidMount(){
       
      console.log('Home');
   
      this.VerifyTokenValud();
        
    }

    async VerifyTokenValud() {
      let token = await getValueFor();
      if(token!==null){
         if (jwtDecode(token).exp < Date.now() / 1000) {
           deleteValue();
           console.log('token exist mais not valide');
           console.log(token);
           this.props.restoreToken(null);
         }else{
           console.log('token exist mais valide');
           this.props.restoreToken(token);
           
         }
      }
      else{
       console.log(token);
      }
     }
   
    SignOut(){
      
      this.props.signOut();
       deleteValue();
    }

    render(){
     
       
        return(
            <View>
                <Text>Signed in !</Text>
                <Button title="Sign out" onPress={this.SignOut} />
            </View>
           );
    }
}


const mapStateToProps = state => {
 
    return state;
  };

export default connect(mapStateToProps,{ signOut,restoreToken })(Home);