import React from "react";
import { StyleSheet, Text, View,Picker,Button,Image,Alert,TouchableOpacity,Dimensions } from 'react-native';
import {connect} from "react-redux";

import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import jwtDecode from 'jwt-decode';

import { TextInput } from "react-native-gesture-handler";
import { addColisInfos,dropColisInfos } from '../../redux/actionColis';
import { addUserSelect,dropUserSelect } from '../../redux/actionUserSelect';

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


class  Colis extends React.Component {
  
    constructor(props){
        super(props);
        this.state={
          poids:0,
          nature:'',
          adresse:'',
        }
       this.colisInfos=this.colisInfos.bind(this);
       this.handleChangeOption=this.handleChangeOption.bind(this);
    }

    componentDidMount(){
       
      console.log('Colis');
   
      
    }

    colisInfos(){
      
      if(this.state.poids === 0 && this.state.adresse === ''){
        Alert.alert("veuillez completer le poids et l'adresse de votre colis");
      }

      if(this.state.poids === 0 && this.state.adresse !== ''){
        Alert.alert('veuillez completer le poids de votre colis');
      }

      if(this.state.adresse === '' && this.state.poids !== 0 ){
        Alert.alert("veuillez completer  l'adresse de votre colis");

      }

      if(this.state.poids !== 0 && this.state.adresse !== '' && this.state.nature !==''){
        
        const colis={
          poids:this.state.poids,
          adresse:this.state.adresse,
          nature:this.state.nature
        }

        this.props.addColisInfos(colis);
        saveColisInfos(colis);

      }
      else{
        console.log('poids:',this.state.poids,'adresse:',this.state.adresse,'nature:',this.state.nature);
      }




    }

    handleChangeOption(val) {
      if (val !== 'please') {
        this.setState({nature:val})
        console.log('handleChangeOption:',val);
      }
    }
   
    

    render(){
     
       
        return(
          <View style={{marginTop:20}}>
              
                 <View  style={{flexDirection:'row',justifyContent:'center'}}>
                       <View style={{width:250}}>
                       <Text style={{marginBottom:5}} >Poids en kg:</Text>
                        <TextInput maxLength = {4} keyboardType="numeric" 
                        style={{borderWidth:1,marginBottom:10,paddingLeft:3,paddingTop:3,paddingBottom:3,borderRadius:4}} 
                         
                        value={this.state.poids.toString()}
                        onChangeText={(text)=>this.setState({poids:text})}
                       />
                        
                        <Text >Nature du colis</Text>
                        <Picker
                            selectedValue={this.state.nature}
                            style={{borderWidth:1,marginBottom:5}}
                            onValueChange={(itemValue, itemIndex) => this.handleChangeOption(itemValue)}    
                        >
                                    <Picker.Item label="Please select" value="please" />
                                    <Picker.Item label="Pizza" value="Pizza" />
                                    <Picker.Item label="autre" value="autre" />
                                    
                                    
                        </Picker>
                        <Text style={{marginBottom:5}}>Addresse:</Text>
                        <TextInput style={{borderWidth:1,marginBottom:15,paddingLeft:3,paddingTop:3,paddingBottom:3,borderRadius:4}} 
                        placeholder='adresse de destination' 
                        value={this.state.adresse}
                        onChangeText={(text)=>this.setState({adresse:text})}
                        />
                    
                        <TouchableOpacity 
                        style={{backgroundColor:'#63ff9e',paddingTop:8,paddingBottom:8,borderRadius:4,flexDirection:'row',justifyContent:'center'}}
                        
                        onPress={this.colisInfos}
                        >
                            <Text >Proposer un colis</Text>
                        </TouchableOpacity>
                       </View>
                 </View>
          </View>
           );
    }
}



const mapStateToProps = state => {
 
    return state;
  };

export default connect(mapStateToProps,{ addColisInfos,dropColisInfos,addUserSelect,dropUserSelect })(Colis);