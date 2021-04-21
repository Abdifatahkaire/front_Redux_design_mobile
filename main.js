import React from 'react';
import { StyleSheet, Text, View,Button, Alert } from 'react-native';
import { NavigationContainer,getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {connect} from "react-redux";
import { restoreToken  }  from './source/redux/action';
import { DROPuserINFOANDEMAIl } from "./source/redux/actionUserInfo";
import MyTabsInscription from './source/navigation/MyTabsInscription';
import Home from './source/screens/Home';
import Logo from './source/screens/Logo';
import Login from './source/screens/Login';
import * as SecureStore from 'expo-secure-store';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Logout from './source/screens/Logout';
import jwtDecode from 'jwt-decode';
import NotificationsScreen from './source/screens/NotificationsScreen';
import Index from './source/screens/index';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();



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


async function deleteValue(){
  await SecureStore.deleteItemAsync('userToken');
} 



function getHeaderTitle(route) {
    // If the focused route is not found, we need to assume it's the initial screen
    // This can happen during if there hasn't been any navigation inside the screen
    // In our case, it's "Feed" as that's the first screen inside the navigator
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'Utilisateurs';
  
    switch (routeName) {
      case 'Utilisateurs':
        return 'utilisateu';
      case 'Livreur':
        return 'livr';
    }
    
  }


class main extends React.Component  {

   constructor(props){
       super(props);
       this.VerifyTokenValud=this.VerifyTokenValud.bind(this);
   }

   componentDidMount(){
    console.log('main');
   
    this.VerifyTokenValud();
      
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



    render(){
     
    
        return(
            <NavigationContainer>
               
            {this.props.User_Token.userToken == null ? (

               <Stack.Navigator >
                   <Stack.Screen name="Deliveroo" component={Logo}/>
                   <Stack.Screen name="Inscrire" component={MyTabsInscription}  />
                   <Stack.Screen name="Se connecter" component={Login}  />
               </Stack.Navigator> 
               
                 
               ) : (
                  <Index /> 
               ) } 
               
               
            </NavigationContainer>
        );
    }
}

const mapStateToProps = state => {
 
  
   
    return state;
  };

export default connect(mapStateToProps,{ restoreToken,DROPuserINFOANDEMAIl  })(main);







