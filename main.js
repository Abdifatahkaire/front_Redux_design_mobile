import React from 'react';
import { StyleSheet, Text, View,Button } from 'react-native';
import { NavigationContainer,getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {connect} from "react-redux";
import { restoreToken  }  from './source/redux/action';
import MyTabsInscription from './source/navigation/MyTabsInscription';
import Home from './source/screens/Home';
import Logo from './source/screens/Logo';
import Login from './source/screens/Login';
import * as SecureStore from 'expo-secure-store';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Logout from './source/screens/Logout';
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();


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
   }

   componentDidMount(){
    console.log('main');
    console.log(this.props.userToken);
    getValueFor();
   }


    render(){
     
     
        return(
            <NavigationContainer>
               
            {this.props.userToken == null ? (

               <Stack.Navigator >
                   <Stack.Screen name="Deliveroo" component={Logo}/>
                   <Stack.Screen name="Inscrire" component={MyTabsInscription}  />
                   <Stack.Screen name="Se connecter" component={Login}  />
               </Stack.Navigator> 
               
                 
               ) : (
                <Drawer.Navigator initialRouteName="Home">
                    <Drawer.Screen name="Home" component={Home} />
                    <Drawer.Screen name="Notifications" component={NotificationsScreen} />
                    <Drawer.Screen name="deconnecter" component={Logout} />
                </Drawer.Navigator> 
               ) } 
               
               
            </NavigationContainer>
        );
    }
}

const mapStateToProps = state => {
 
    return state;
  };

export default connect(mapStateToProps,{ restoreToken  })(main);







function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}