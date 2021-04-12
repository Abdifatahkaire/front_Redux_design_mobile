import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Provider } from 'react-redux';
import Main from './main';
import store from './source/redux/store/ProfilStore';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Remote debugger']);
import AppsNavigator from './source/navigation/AppNavigators';

export default function App() {
  return (
    <Provider store={store}>
       <Main />
    </Provider>
   
  );
}


