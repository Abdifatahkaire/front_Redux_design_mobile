import React from "react";
import { StyleSheet, Text, View,Button,Image,TouchableOpacity,Dimensions } from 'react-native';
import {connect} from "react-redux";
import { signOut,restoreToken   } from "../../redux/action";
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import jwtDecode from 'jwt-decode';
import { DROPuserINFOANDEMAIl } from "../../redux/actionUserInfo";
import MapView from 'react-native-maps';
import ImagePersonne from '../../Image/Profil_ills1_gray.png';
import Connexion from "../../../Connexion";
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



class  MapLivreur extends React.Component {
  
    constructor(props){
        super(props);
        
        this.state={
           nom:'nom'
        }
       this.functionRecupereNom=this.functionRecupereNom.bind(this);
       this.functionAnnulerDemandLivreur=this.functionAnnulerDemandLivreur.bind(this);
    }

    componentDidMount(){
       
      console.log('MAp livreur');
   
      this.functionRecupereNom();
    }

    functionRecupereNom(){
    
      const email=this.props.UserSelect.userSelect.user.emailP;
      console.log('email map livreur',email);
       axios.post(Connexion.adresse+'/api/accepterNomUser',{email:email})
     .then(response=>{
       if(response.data.users!==undefined){
         const nom=response.data.users[0].nom;
         console.log('response data users',response.data.users[0],' nom:',nom);
          this.setState({nom:nom});
       }
       else{
         console.log('erreur livreur map response data');
       }

       
     })


     }

     functionAnnulerDemandLivreur(){
      
      const item=this.props.UserSelect.userSelect.user;
      this.props.User_Info.socket.emit("private AnnulerLivreur", {
        userInfo:this.props.UserSelect.userSelect.user
       });
       axios.post(Connexion.adresse+'/api/SupprimerColisInfos',{emailA:this.props.UserSelect.userSelect.user.emailA})
     .then(response=>{

      if(response.data.users!==undefined){
        console.log('colis supprimer');
      }
     })
     this.props.dropUserSelect();
        console.log('functionAnnulerDemandLivreur',this.props.UserSelect.userSelect.user);
     }
   
    

    render(){
     
       
        return(
          <View style={styles.wrapper}>

            <View style={styles.back}>
                <MapView region={{
                        latitude: 36.89002125197227,
                        longitude: 9.939537048339846,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                      }}
                    style={styles.map} 
                />
            </View>

            <View style={styles.front}>
                <View  style={{flex:1,flexDirection:'row',justifyContent:'center'}}>
                   <View style={{flexDirection:'row'}}>
                     
                     <View style={{justifyContent:'center',marginLeft:10,marginRight:10}}>
                       <View style={{borderColor:'gray',borderWidth:1,padding:8,borderRadius:40}}><Image source={ImagePersonne} /></View>
                     </View>
                     
                     <View>
                       <Text style={{color:'black',fontWeight:'bold'}}>Nom:</Text>
                       <Text>{this.state.nom}</Text>
                     </View>
                   </View>
                   
                </View>
                <View style={{flex:1,flexDirection:'row'}}>
                     <View style={{flex:1}}>
                      <Text style={{fontWeight:'bold'}}>Etat demande de livraison:</Text>
                      <Text>Accepter ...</Text>
                   </View>
                   <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                   <TouchableOpacity 
                    style={{paddingTop:7,paddingBottom:7,paddingLeft:20,paddingRight:20,backgroundColor:'#63ff9e',borderRadius:4}} 
                    onPress={this.functionAnnulerDemandLivreur}
                   >
                     <Text>annuler</Text>
                     
                   </TouchableOpacity>
                   </View>   
                  </View>
                 
    
            </View>
          
                
           
         
      </View>
         
           );
    }
}

const styles = StyleSheet.create({
  wrapper: {
    
    width: "100%",
    height:'100%',
    borderWidth:1,
    borderColor:'green'
},
  back: {
    width: "100%",
    height:'100%',
    backgroundColor: 'blue',
    zIndex: 0,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth:1
    
    
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  front:{
    position: 'absolute',
    bottom:5,
    left:0,
    width: '100%',
    height:100,
    backgroundColor: 'white',
    zIndex: 1,
    borderWidth:1,
    borderColor:'gray',
    borderRadius:10,
    flex:1
  }
});

const mapStateToProps = state => {
 
    return state;
  };

export default connect(mapStateToProps,{ signOut,restoreToken,DROPuserINFOANDEMAIl,addUserSelect,dropUserSelect })(MapLivreur);