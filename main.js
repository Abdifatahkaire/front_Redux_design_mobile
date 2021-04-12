import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer,getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {connect} from "react-redux";
import { restoreToken  }  from './source/redux/action';
import MyTabsInscription from './source/navigation/MyTabsInscription';
import Home from './source/screens/Home';
import Logo from './source/screens/Logo';
import Login from './source/screens/Login';

const Stack = createStackNavigator();

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


    render(){

        return(
            <NavigationContainer>
               
            {this.props.userToken == null ? (

               <Stack.Navigator >
                   <Stack.Screen name="Delivery" component={Logo}/>
                   <Stack.Screen name="Inscrire" component={MyTabsInscription}  />
                   <Stack.Screen name="Se connecter" component={Login}  />
               </Stack.Navigator> 
               
                 
               ) : (
                  <Home />
               ) } 
               
               
            </NavigationContainer>
        );
    }
}

const mapStateToProps = state => {
 
    return state;
  };

export default connect(mapStateToProps,{ restoreToken  })(main);