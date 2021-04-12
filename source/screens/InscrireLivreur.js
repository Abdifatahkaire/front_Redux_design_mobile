import React from "react";
import { StyleSheet,ScrollView,SafeAreaView ,StatusBar, Text,TextInput, View,Button,Image,TouchableOpacity } from 'react-native';

import moto from '../Image/moto_livreur_inscrire.png';



export default class  InscrireLivreur extends React.Component {

    constructor(props){
        super(props);
        this.state={
            nom:'',
            tel:'',
            email:'',
            mot_de_passe:'',
            c_mot_de_passe:''
        }
    }

    render(){
      
       
        return(

            <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <View>
                     <View style={{alignItems:'center',marginBottom:20}}>
                        <View >
                            <View><Image source={moto}  /></View>
                            <View style={{alignItems:'center',justifyContent:'center',flexDirection:'row'}}>
                            <Text style={{color:'#63ff9e',fontSize:40}}>D</Text>
                            <Text style={{fontSize:25}}>eliveroo</Text>
                            </View>
                        </View>
                     </View>
                     <View>
                         <View>
                         <View style={{paddingBottom:15}}>
                        <TextInput  style={{borderWidth:1}}  placeholder='Entrer votre nom' onChangeText={(text)=>{this.setState({nom:text})}}  />
                     </View>
                     <View style={{paddingBottom:15}}>
                        <TextInput  style={{borderWidth:1}}  placeholder='Entrer votre tel' onChangeText={(text)=>{this.setState({tel:text})}}  />
                     </View>
                     <View style={{paddingBottom:15}}>
                       <TextInput style={{borderWidth:1}}  placeholder='Entrer votre email' onChangeText={(text)=>{this.setState({email:text})}}  />
                     </View>
                     <View  style={{paddingBottom:15}}>
                       <TextInput style={{borderWidth:1}} placeholder='Entrer votre mot de passe' onChangeText={(text)=>{this.setState({mot_de_passe:text})}}  />
                     </View>
                     <View  style={{paddingBottom:15}}>
                       <TextInput style={{borderWidth:1}} placeholder='Confirmer votre mot de passe' onChangeText={(text)=>{this.setState({c_mot_de_passe:text})}}  />
                     </View>
                     <View style={{paddingBottom:15}}>
                         <TouchableOpacity
                                style={{backgroundColor:'#63ff9e',paddingBottom:10,paddingTop:10,alignItems:'center'}}
                                >
                                <Text style={{color:'#fff',fontSize:16}}>Inscrivez-vous</Text>
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