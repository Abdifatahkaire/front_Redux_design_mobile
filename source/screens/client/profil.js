import React from "react";
import { StyleSheet, Text, View,Button,Image,TouchableOpacity } from 'react-native';
import {connect} from "react-redux";
import { signOut,restoreToken   } from "../../redux/action";
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import jwtDecode from 'jwt-decode';
import { DROPuserINFOANDEMAIl } from "../../redux/actionUserInfo";
import Pencil from "react-native-bootstrap-icons/icons/pencil";
import Person from "react-native-bootstrap-icons/icons/person";

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


class  ProfilClient extends React.Component {
  
    constructor(props){
        super(props);
        this.SignOut=this.SignOut.bind(this);
        this.VerifyTokenValud=this.VerifyTokenValud.bind(this);
    }

    componentDidMount(){
       
      console.log('Home');
   
      this.VerifyTokenValud();
      getValueFor().then(x=>{console.log(x)});
      getUserInfo().then(x=>{console.log(x)});
    }

    async VerifyTokenValud() {
      let token = await getValueFor();
      
      if(token!==null){
         if (jwtDecode(token).exp < Date.now() / 1000) {
           deleteValue();
           deleteUserInfo();
           console.log('token exist mais not valide');
           console.log(token);
          
           this.props.restoreToken(null);
           this.props.DROPuserINFOANDEMAIl();
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
       deleteUserInfo();
       this.props.User_Info.socket.disconnect();
    }

    render(){
     
       
        return(
            <View style={{flex:1,backgroundColor:'white',borderColor:'green',borderWidth:1}}>
                
                <View style={{backgroundColor:'#ECF0F1',paddingTop:20,paddingBottom:20,justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
                  
                  <View>
                     <Person width="70" height="70" fill="rgb(93, 109, 126)" />
                  </View>
                  
                  <View style={{paddingLeft:10,paddingRight:10,height:50,justifyContent:'space-between'}}>
                    <Text style={{fontSize:20,fontFamily:'Roboto',color:'black'}}>Nom:</Text>
                    <Text>{this.props.User_Info.nomUser}</Text>
                  </View>
                  <View style={{paddingLeft:10,paddingRight:10,height:50,justifyContent:'space-between'}}>
                   <Text style={{fontSize:20,color:'black'}}>Tel:</Text>
                    <Text>{this.props.User_Info.telUser}</Text>
                  </View>
                </View>

                <TouchableOpacity
                 style={{backgroundColor:'#ECF0F1',borderWidth:1,borderColor:'white',flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginTop:20,padding:20}}
                 onPress={()=>{this.props.navigation.navigate('Modifier Votre Nom')}}
                >
                <Text style={{fontSize:20}}>Modifier votre Nom</Text>
                <Pencil width="30" height="30" fill="rgb(93, 109, 126)" />
                </TouchableOpacity>

                <TouchableOpacity
                 style={{backgroundColor:'#ECF0F1',borderWidth:1,borderColor:'white',flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginTop:20,padding:20}}
                 onPress={()=>{this.props.navigation.navigate('Modifier Votre Tel')}}
                >
                <Text style={{fontSize:20}}>Modifier votre Numero Telephone</Text>
                <Pencil width="30" height="30" fill="rgb(93, 109, 126)" />
                </TouchableOpacity>
               
                <Button title="Sign out" onPress={this.SignOut} />

            </View>
           );
    }
}


const mapStateToProps = state => {
 
    return state;
  };

export default connect(mapStateToProps,{ signOut,restoreToken,DROPuserINFOANDEMAIl })(ProfilClient);