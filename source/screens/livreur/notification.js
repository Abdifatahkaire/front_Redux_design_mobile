import React from "react";
import { StyleSheet, Text, View,Button,Image,FlatList,TouchableOpacity } from 'react-native';
import {connect} from "react-redux";
import { signOut,restoreToken   } from "../../redux/action";
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import jwtDecode from 'jwt-decode';
import { DROPuserINFOANDEMAIl } from "../../redux/actionUserInfo";
import { addUserSelect,dropUserSelect } from '../../redux/actionUserSelect';
import { addColisInfos,dropColisInfos } from '../../redux/actionColis';
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

  async function saveUserSelected(value){
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


class  Notifications extends React.Component {
  
    constructor(props){
        super(props);
        this.state={
          listDemande:[],
          count:0
        }
        this.RefuserDemandeLivraison=this.RefuserDemandeLivraison.bind(this);
        this.AccepterDemandeLivraison=this.AccepterDemandeLivraison.bind(this);
    }

    componentDidMount(){
       
      this.props.User_Info.socket.on('private message',(data) => {
        

         var newColis={
          emailP:data.info.email,
          emailA:data.info.to.email,
          poids:data.info.colisInfos.user.poids,
          adresse:data.info.colisInfos.user.adresse,
          nature:data.info.colisInfos.user.nature,
          etat:0,
          nom:data.info.nom,
          tokens:data.tokenInfo,
          socketId_P:data.socketUserId,
          socketId_A:this.props.User_Info.socket.userID
          
        };

        


         axios.post(Connexion.adresse+'/api/AjouterColisInfos',newColis)
         .then(response=>{
               console.log('resultat notification.js:',response.data.messageSuccess);
             }) 


             var newColisAffiche={
              id:this.state.count,
              emailP:data.info.email,
              emailA:data.info.to.email,
              poids:data.info.colisInfos.user.poids,
              adresse:data.info.colisInfos.user.adresse,
              nature:data.info.colisInfos.user.nature,
              etat:0,
              nom:data.info.nom,
              tokens:data.tokenInfo,
              socketId_P:data.socketUserId,
              socketId_A:this.props.User_Info.socket.userID
            };


             this.setState({listDemande:[...this.state.listDemande,newColisAffiche]})
             this.setState({count:this.state.count+1});


     });


     axios.get(Connexion.adresse+'/api/afficherColisInfo')
     .then(response=>{
       if(response.data.users!==undefined){
           
         if(this.state.listDemande.length === 0){
           
           for(let i=0;i<response.data.users.length;i++){
             
             
             if(response.data.users[i].utilisateur_A===this.props.User_Info.emailUser){
               
               const newColisaffichers={
                id:this.state.count,
                emailP:response.data.users[i].utilisateur_P,
                emailA:response.data.users[i].utilisateur_A,
                poids:response.data.users[i].poids,
                adresse:response.data.users[i].adresse,
                nature:response.data.users[i].nature,
                etat:response.data.users[i].etat,
                nom:response.data.users[i].nom,
                tokens:response.data.users[i].token,
                socketId_P:response.data.users[i].socketId_P,
                socketId_A:response.data.users[i].socketId_A
                }
                  this.setState({listDemande:[...this.state.listDemande,newColisaffichers]});
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

    
    RefuserDemandeLivraison(item){
      
      const id=item.id;
      console.log('refuser demande livraison id:',id);
      console.log('refuser item:',item);
      this.setState({listDemande:this.state.listDemande.filter((item, index)=>item.id!==id)});

      this.props.User_Info.socket.emit("private Refuser", {
        userInfo:item
       });

    }

    AccepterDemandeLivraison(item){
        
      

      console.log('accepter item:',item);
       
      
      
       this.props.User_Info.socket.emit("private Accepter", {
        userInfo:item
       });
       saveUserSelected(item);
       this.props.addUserSelect(item);
    }
   
    

    render(){
     
       
        return(
            <View style={{marginTop:30}}>
                 {this.state.listDemande.length === 0 ? <View><Text>Aucun colis demander</Text></View> : <View style={{marginTop:50}}>
                   
                 <FlatList
                      data={this.state.listDemande}
                      renderItem={({ item, index, separators })=>(
                        <View>
                          {jwtDecode(item.tokens).exp < Date.now() / 1000 ? <View><Text>demande spirer</Text></View> : <TouchableOpacity 
                        style={{flexDirection:'row',borderWidth:1,borderColor:'#63ff9e',backgroundColor:'#63ff9e',marginBottom:5,alignItems:'center',padding:20}}
                        
                        >
                            <View style={{marginRight:15}}><Text >•</Text></View> 
                            <View style={{marginRight:15}}><Text >{item.nom}</Text></View>
                            
                            <TouchableOpacity 
                             style={{marginRight:15,padding:5,backgroundColor:'white',borderWidth:1,borderColor:'white',borderRadius:4}}
                             onPress={()=>{this.AccepterDemandeLivraison(item)}}
                            >
                              <Text >Accepter</Text>
                            </TouchableOpacity>

                            <TouchableOpacity 
                             style={{padding:5,backgroundColor:'white',borderWidth:1,borderColor:'white',borderRadius:4}}
                             onPress={()=>{this.RefuserDemandeLivraison(item)}}
                            >
                              <Text >Refuser</Text>
                            </TouchableOpacity> 
                            
                        </TouchableOpacity>}
                        </View>
                        
                        )}
                      keyExtractor={(item) => item.id.toString()}
                    
                    />

                   </View>} 
                
            </View>
           );
    }
}


const mapStateToProps = state => {
 
    return state;
  };

export default connect(mapStateToProps,{ signOut,restoreToken,DROPuserINFOANDEMAIl,addColisInfos,dropColisInfos,addUserSelect,dropUserSelect })(Notifications);