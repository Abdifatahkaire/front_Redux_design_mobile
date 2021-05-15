import React from "react";
import { StyleSheet,ScrollView,SafeAreaView ,StatusBar,Alert, Text,TextInput, View,Button,Image,TouchableOpacity } from 'react-native';

import moto from '../Image/moto_livreur_inscrire.png';

import {connect} from "react-redux";
import { signIn,restoreToken  } from "../redux/action";
import { ADDuserINFO,ADDuserADRESSE,DROPuserINFOANDEMAIl } from "../redux/actionUserInfo";

import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import jwtDecode from 'jwt-decode';


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
  await SecureStore.setItemAsync('userToken',value);
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

class Login extends React.Component {

    constructor(props){
        super(props);
        this.state={
            email:'',
            mot_de_passe:'',
            isFocused1:false,
            isFocused2:false,
            error1:false,error2:false
        }
        this.SignIn=this.SignIn.bind(this);
        this.VerifyTokenValud=this.VerifyTokenValud.bind(this);
    }

    componentDidMount(){
      console.log('Login');
      
      this.VerifyTokenValud();
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

    handleFocus1 = () => this.setState({isFocused1: true})

    handleBlur1 = () => this.setState({isFocused1: false})

    handleFocus2 = () => this.setState({isFocused2: true})

    handleBlur2 = () => this.setState({isFocused2: false})


   
    borderColor1() {
      if(this.state.isFocused1 === false && this.state.error1 === true){
         ;
          return 'red';
      }else if(this.state.isFocused1 === true ){
          
          return '#63ff9e';
      }else{
          
          return '#000';
      }
  }
  borderColor2() {
      if(this.state.isFocused2 === false && this.state.error2 === true){
         ;
          return 'red';
      }else if(this.state.isFocused2 === true ){
          
          return '#63ff9e';
      }else{
          
          return '#000';
      }
  }
 

  SignIn(){
  
        if(this.state.email === ''){
          this.setState({error1:true})
        }

        if(this.state.mot_de_passe === ''){
          this.setState({error2:true})
        }
       
      if(this.state.email !=='' && this.state.mot_de_passe !==''){
        
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(this.state.email) === false) {
            Alert.alert("ceci n'est un email adresse");
        }else{
          axios.post('http://192.168.1.15:4000/api/auth/signin',{email:this.state.email,mot_de_passe:this.state.mot_de_passe})
        .then(response=>{
       
          if(response.data.accessToken===undefined){

            console.log('undefineduuuu');
            if(response.data.message){
              console.log(response.data.message);
              Alert.alert(response.data.message);
            }
          }
          else{
            

            
             
            this.props.User_Info.socket.auth={ email: response.data.email };
            this.props.User_Info.socket.connect(); 

            this.props.User_Info.socket.on('session',(data) => {
             
              let userINFO={
                nom:response.data.nom,
                tel:response.data.tel,
                type:response.data.type,
                email:response.data.email,
                userID:data.userID
              };
              
              this.props.User_Info.socket.userID=data.userID;
                this.props.ADDuserINFO(userINFO);
                saveUserInfo(userINFO);
            });


            

            
            this.props.ADDuserADRESSE(response.data.email);
            
            save(response.data.accessToken);
            this.props.signIn(response.data.accessToken);
            
          }
           
       
        })

        }

      }


  }

   
    render(){
      
      const bordercolor1=this.borderColor1();
       const bordercolor2=this.borderColor2();
      
     
        return(

            <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <View>
                     <View style={{alignItems:'center',marginBottom:20}}>
                        <TouchableOpacity  onPress={()=>{this.props.navigation.navigate('Deliveroo')}}>
                            <View><Image source={moto}  /></View>
                            <View style={{alignItems:'center',justifyContent:'center',flexDirection:'row'}}>
                            <Text style={{color:'#63ff9e',fontSize:40}}>D</Text>
                            <Text style={{fontSize:25}}>eliveroo</Text>
                            </View>
                        </TouchableOpacity>
                     </View>
                     <View>
                         <View>
                     
                     <View style={{paddingBottom:15}}>
                       <TextInput value={this.state.email} onFocus={this.handleFocus1}  onBlur={this.handleBlur1} keyboardType='email-address' style={{borderWidth:1,borderColor:bordercolor1,borderRadius:4,paddingLeft:10,paddingTop:5,paddingBottom:5}}  placeholder='Entrer votre email' onChangeText={(text)=>{this.setState({email:text})}}  />
                     </View>
                     <View  style={{paddingBottom:15}}>
                       <TextInput value={this.state.mot_de_passe} onFocus={this.handleFocus2}  onBlur={this.handleBlur2}  secureTextEntry  style={{borderWidth:1,borderColor:bordercolor2,borderRadius:4,paddingLeft:10,paddingTop:5,paddingBottom:5}} placeholder='Entrer votre mot de passe' onChangeText={(text)=>{this.setState({mot_de_passe:text})}}  />
                     </View>
                    
                     <View style={{paddingBottom:15}}>
                         <TouchableOpacity
                                style={{backgroundColor:'#63ff9e',paddingBottom:10,paddingTop:10,borderRadius:4,alignItems:'center'}}
                                onPress={this.SignIn}
                                >
                                <Text style={{color:'#fff',fontSize:16}}>Se connecter</Text>
                        </TouchableOpacity>
                     </View>
                         </View>
                     </View>
                </View>
             
            </ScrollView>
          </SafeAreaView>
 
           );
    }



}



const mapStateToProps = state => {
 
  return state;
};

export default connect(mapStateToProps,{ signIn,restoreToken,ADDuserINFO,ADDuserADRESSE,DROPuserINFOANDEMAIl  })(Login);






const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: StatusBar.currentHeight,
      borderWidth:1,
      borderColor:'white'
    },
    scrollView: {
      
      marginHorizontal: 20,
    },
    text: {
      fontSize: 42,
    },
  });