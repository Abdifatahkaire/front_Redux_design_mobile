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


  async function saveEtatConfirm(value){
    await SecureStore.setItemAsync('etat', JSON.stringify(value));
  } 
 
  async function getEtatConfirm(){
    let result = await SecureStore.getItemAsync('etat');
     
    if(result){
       return result;
    }
    else{
        return null;
    }
  
  }

  async function deleteEtatConfirm() {
    await SecureStore.deleteItemAsync('etat');
  }



class  MapClient extends React.Component {
  
    constructor(props){
        super(props);
        
        this.state={
          etat:0
        }
        this.functionEtatComfirm=this.functionEtatComfirm.bind(this);
    }

    componentDidMount(){
       
      console.log('MapClient');
   
      
      this.functionEtatComfirm();

    }

    
      async functionEtatComfirm(){

        const etatconfirm=await getEtatConfirm();
        let etatC=JSON.parse(etatconfirm);
        this.setState({etat:etatC});
  
        console.log('etatC',etatC);
      }
    

    render(){
     
       console.log('Statetat sur MapCliente',this.state.etat);
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
                       <Text>abdifatah</Text>
                     </View>
                   </View>
                   
                </View>
                <View  style={{flex:1,flexDirection:'row'}}>
                   
                   <View style={{flex:1}}>
                      <Text style={{fontWeight:'bold'}}>Etat demande de livraison:</Text>
                      <Text>en cours d'attends ...</Text>
                   </View>

                   <TouchableOpacity  
                    style={{flex:1,justifyContent:'center',alignItems:'center'}}
                    
                   >
                     <View style={{paddingTop:7,paddingBottom:7,paddingLeft:20,paddingRight:20,backgroundColor:'#63ff9e',borderRadius:4}}><Text>annuler</Text></View>
                     
                   </TouchableOpacity>
                       
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

export default connect(mapStateToProps,{ signOut,restoreToken,DROPuserINFOANDEMAIl })(MapClient);