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
       console.log(result);
    }
    else{
        console.log('aucun token de dans');
    }
  
  }
  
  async function deleteValue() {
    await SecureStore.deleteItemAsync('userToken');
  }


class  Home extends React.Component {
  
    constructor(props){
        super(props);
        this.SignOut=this.SignOut.bind(this);
    }

    componentDidMount(){
        console.log('home');
      console.log(this.props.userToken);
        getValueFor();
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

export default connect(mapStateToProps,{ signOut })(Home);