import React from "react";
import { StyleSheet, Text, View,Picker,Button,Image,TouchableOpacity,FlatList,Dimensions } from 'react-native';
import {connect} from "react-redux";
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import jwtDecode from 'jwt-decode';
import { TextInput } from "react-native-gesture-handler";
import { addColisInfos,dropColisInfos } from '../../redux/actionColis';
import { addUserSelect,dropUserSelect } from '../../redux/actionUserSelect';

import Colis from  './Colis';
import ListeLivreur from './ListeLivreur';
import Map from './map';

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


 async function saveColisInfos(value){
    await SecureStore.setItemAsync('colisInfo', JSON.stringify(value));
  }
  
  async function getColisInfos() {
    let result = await SecureStore.getItemAsync('colisInfo');
     
    if(result){
       return result;
    }
    else{
        return null;
    }
  
  }

  async function deleteColisInfos() {
    await SecureStore.deleteItemAsync('colisInfo');
  }

  
  async function saveUserSelected(){
    await SecureStore.setItemAsync('userSelected', JSON.stringify(value));
  } 
 
  async function getUserSelected() {
    let result = await SecureStore.getItemAsync('userSelected');
     
    if(result){
       return result;
    }
    else{
        return null;
    }
  
  }

  async function deleteUserSelected() {
    await SecureStore.deleteItemAsync('userSelected');
  }



class  IndexColis extends React.Component {
  
    constructor(props){
        super(props);
        
        
        this.state={
          
          count:0
        }
        this.verifyColisInfo=this.verifyColisInfo.bind(this);
    }

    componentDidMount(){
       
      console.log('IndexColis');
   
      this.verifyColisInfo();
      


    }

    async verifyColisInfo(){


      const colisInfos=await getColisInfos();
      
      
      if(colisInfos!==null){
        let colisInfoParse=JSON.parse(colisInfos);
        this.props.addColisInfos(colisInfoParse);

      }
    }
   
    

    render(){
     
      
        return(
             
            <View>
              {Object.keys(this.props.Colis_Infos.colisInfos).length!==0 ? <View>
                  {Object.keys(this.props.UserSelect.userSelect).length!==0 ? <View>
                     <Map />
                  </View> : 
                     <ListeLivreur />
                    }
              </View> : <View>
              <Colis />
             
                   
              </View> }
            </View>
           );
    }
}



const mapStateToProps = state => {
 
    return state;
  };

export default connect(mapStateToProps,{ addColisInfos,dropColisInfos,addUserSelect,dropUserSelect })(IndexColis);