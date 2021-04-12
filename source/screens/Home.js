import React from "react";
import { StyleSheet, Text, View,Button,Image,TouchableOpacity } from 'react-native';



export default class  Home extends React.Component {


    render(){
      
       
        return(
            <View>
                <Text>Signed in !</Text>
                <Button title="Sign out" onPress={()=>{}} />
            </View>
           );
    }
}