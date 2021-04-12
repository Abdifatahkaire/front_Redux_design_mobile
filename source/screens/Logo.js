import React from 'react';
import { StyleSheet, Text, View,Button,Image,TouchableOpacity } from 'react-native';

import LogoImage from '../Image/moto_livreur5.png';

import { useNavigation } from '@react-navigation/native';
export default function Logo({navigation}){

    
   

        return (
           
                <View style={styles.container}>
                   <View style={styles.content}>
                       <View style={styles.contentLogo}>
                           <View style={{borderBottomWidth:1,flexDirection:'row',alignItems:'center'}}><Text style={{color:'#63ff9e',fontSize:30}}>D</Text><Text style={{fontSize:16}}>eliveroo</Text></View>
                       </View>
                       <View style={styles.contentImage}>
                           <View>
                              <Image
                                source={LogoImage}
                            /> 
                           </View>
                            
                       </View>
                       <View style={styles.contentNavigations}>
                            <TouchableOpacity
                                    style={{backgroundColor:'#63ff9e',alignItems:'center',marginBottom:10,paddingTop:10,paddingBottom:10,borderRadius:4}}
                                    onPress={()=>{navigation.navigate('Se connecter')}}
                                    >
                                    <Text style={{color:'#3f3d57',fontSize:16}}>Se connectez-vous</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                    style={{backgroundColor:'#63ff9e',alignItems:'center',paddingTop:10,paddingBottom:10,borderRadius:4}}
                                    onPress={()=>{navigation.navigate('Inscrire')}}
                                    >
                                    <Text style={{color:'#3f3d57',fontSize:16,}}>Inscrivez-vous</Text>
                            </TouchableOpacity>
                       </View>
                   </View>
                </View>
            
        );
    
}


const styles={

    container:{
        
       
        paddingLeft:10,
        paddingRight:10,
        paddingTop:10,
        height:'100%',
     
    },
    content:{
     
      height:'100%',
      justifyContent:'space-between'
    },
    contentLogo:{
     
        alignItems:'center'
    },
    contentImage:{
       
        alignItems:'center'
    },
    contentNavigations:{
      
        marginBottom:60,
        paddingTop:10,
        paddingBottom:10
    }
}