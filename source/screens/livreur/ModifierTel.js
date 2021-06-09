import React from "react";
import { StyleSheet, Text,TextInput, View,Alert,Button,Image,TouchableOpacity } from 'react-native';
import {connect} from "react-redux";
import { signOut,restoreToken   } from "../../redux/action";
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import jwtDecode from 'jwt-decode';
import { DROPuserINFOANDEMAIl } from "../../redux/actionUserInfo";
import { ModifierNumeroTel,ModifierVotreNom   } from "../../redux/actionUserInfo";
import Connexion from "../../../Connexion";



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


class  ModifierTel extends React.Component {
  
    constructor(props){
        super(props);
        this.ModifierVotreTElfunction=this.ModifierVotreTElfunction.bind(this);
        this.VerifyTokenValud=this.VerifyTokenValud.bind(this);
        this.state={
            telModify:'',
            email:this.props.User_Info.emailUser
        }
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
   
    ModifierVotreTElfunction(){

      if(this.state.nomModify!==''){
        axios.post(Connexion.adresse+'/api/NumeroTelUserConnected',{tel:this.state.telModify ,email:this.state.email})
        .then(response=>{
           if(response.data.user!==undefined){
            Alert.alert('vous avez modifier votre tel');
            this.props.ModifierNumeroTel(this.state.telModify);
           }
        })
        
       }
      


    }

    render(){
     
      console.log('ModifierTel.js:',this.state.email);
        return(
                
                <View style={{marginTop:30,backgroundColor:'#ECF0F1'}}>
                
                <TextInput
                 value={this.state.telModify}
                 onChangeText={(text)=>{this.setState({telModify:text})}}
                 style={{marginTop:20,marginBottom:20,borderWidth:1,borderRadius:4,paddingLeft:10,paddingTop:5,paddingBottom:5}} keyboardType="numeric" placeholder='Modifier Votre Numero de tel:' />
                <TouchableOpacity
                 style={{backgroundColor:'#63ff9e',flexDirection:'row',alignItems:'center',justifyContent:'center',padding:10}}
                 onPress={()=>{this.ModifierVotreTElfunction()}}
                >
                <Text style={{fontSize:20}}>Modifier votre Numero tel</Text>
                
                </TouchableOpacity>
            </View>
                
            
           );
    }
}


const mapStateToProps = state => {
 
    return state;
  };

export default connect(mapStateToProps,{ signOut,restoreToken,DROPuserINFOANDEMAIl,ModifierVotreNom,ModifierNumeroTel })(ModifierTel);