import React from "react";
import { StyleSheet, Text, View,Picker,Button,Image,TouchableOpacity,FlatList,Dimensions } from 'react-native';
import {connect} from "react-redux";
import { signOut,restoreToken   } from "../../redux/action";
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import jwtDecode from 'jwt-decode';
import { DROPuserINFOANDEMAIl } from "../../redux/actionUserInfo";
import { TextInput } from "react-native-gesture-handler";

import { addColisInfos,dropColisInfos } from '../../redux/actionColis';
import { addUserSelect,dropUserSelect } from '../../redux/actionUserSelect';

import ClearColis from "react-native-bootstrap-icons/icons/x";
import Connexion from "../../../Connexion";

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




class  ListeLivreur extends React.Component {
  
    constructor(props){
        super(props);
        
        this.VerifyTokenValud=this.VerifyTokenValud.bind(this);
        this.state={
          listConnected:[],
          count:0
        }
        this.colisDropInfo=this.colisDropInfo.bind(this);
        this.addUserSelect=this.addUserSelect.bind(this);
    }

    componentDidMount(){
       
      console.log('ListeLivreur');
   
      this.VerifyTokenValud();
      getValueFor().then(x=>{console.log(x)});
      getUserInfo().then(x=>{console.log(x)});
      this.props.User_Info.socket.on('userConnected',(data) => {

         const newUser={
          id:this.state.count,
          ID_USER: data.user.ID_USER,
          email: data.user.email,
          connected: data.user.connected,
          type: data.user.type
         }
           this.setState({listConnected:[...this.state.listConnected,newUser]})
           this.setState({count:this.state.count+1});
      });
      this.props.User_Info.socket.on('userDisconnected',(data) => {
         console.log('userID:',data.userID);  
        this.setState({listConnected:this.state.listConnected.filter((item,index)=> item.ID_USER !== data.userID)},() => {
          this.state.listConnected
         })
      });


      axios.get(Connexion.adresse+'/api/allusersconnected')
      .then(response=>{
        if(response.data.users!==undefined){
            
          if(this.state.listConnected.length === 0){
            
            for(let i=0;i<response.data.users.length;i++){
              
              
              if(response.data.users[i].ID_USER!==this.props.User_Info.socket.userID && response.data.users[i].connected!==0 && response.data.users[i].type==='livreur'){
                
                const newUser={
                  id:this.state.count,
                  ID_USER: response.data.users[i].ID_USER,
                  email: response.data.users[i].email,
                  connected:response.data.users[i].connected,
                  type:response.data.users[i].type
                 }
                   this.setState({listConnected:[...this.state.listConnected,newUser]})
                   this.setState({count:this.state.count+1});

               }
              
                 
              
               
                
            }
              

        }
        else{
          console.log('il y a users ListeLivreur.js ');
        }
        }
        else{
            console.log('undefined allusersconnected')
        }
      }) 


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
   
    colisDropInfo(){
      this.props.dropColisInfos();
    }

    addUserSelect(user){
       
      
      this.props.addUserSelect(user);
      
      const userdemandeInfos={
        nom:this.props.User_Info.nomUser,
        tel:this.props.User_Info.telUser,
        email:this.props.User_Info.emailUser
        
      }

      this.props.User_Info.socket.to(user.ID_USER).emit("userDemande", {
        user:userdemandeInfos
       });


    }

    render(){
     console.log('listConnected:',this.state.listConnected);
       
        return(
          <View style={{marginTop:20}}>
              {this.state.listConnected.length === 0 ? <View>
                <TouchableOpacity
                      style={{flexDirection:'row',borderColor:'#63ff9e',borderWidth:1,marginBottom:30,justifyContent:'space-between'}}
                  onPress={this.colisDropInfo}
                > 
                  <Text style={{fontSize:20,color:'black'}}>Annuler le colis</Text>
                  <ClearColis width="30" height="30" fill="rgb(93, 109, 126)" />
                </TouchableOpacity>
                <Text style={{color:'black'}}>Aucun Livreur</Text>
                </View>
               : <View>

                  <View>
                    <TouchableOpacity
                      style={{flexDirection:'row',borderWidth:1,marginBottom:30,justifyContent:'space-between'}}
                     onPress={this.colisDropInfo}
                    >
                        <Text style={{fontSize:20}}>Annuler le colis</Text>
                        <ClearColis width="30" height="30" fill="rgb(93, 109, 126)" />
                    </TouchableOpacity>
                    <FlatList
                      data={this.state.listConnected}
                      renderItem={({ item, index, separators })=>(
                        <TouchableOpacity 
                        style={{flexDirection:'row',borderWidth:1,borderColor:'#63ff9e',backgroundColor:'#63ff9e',marginBottom:5}}
                        onPress={()=>{this.addUserSelect(item)}}
                        >
                            <View style={{padding:20}}><Text >•</Text></View> 
                            <View style={{padding:20}}><Text >{item.email}</Text></View> 
                            
                        </TouchableOpacity>
                        )}
                      keyExtractor={(item) => item.id.toString()}
                    
                    />
                  </View>


                 </View>}
                

          </View>
           );
    }
}



const mapStateToProps = state => {
 
    return state;
  };

export default connect(mapStateToProps,{ signOut,restoreToken,DROPuserINFOANDEMAIl,addColisInfos,dropColisInfos,addUserSelect,dropUserSelect })(ListeLivreur);