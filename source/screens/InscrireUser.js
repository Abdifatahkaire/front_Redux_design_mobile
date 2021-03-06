import React from "react";
import { StyleSheet,ScrollView,SafeAreaView ,StatusBar,Alert, Text,TextInput, View,Button,Image,TouchableOpacity } from 'react-native';

import moto from '../Image/moto_livreur_inscrire.png';
import {connect} from "react-redux";
import { signIn  } from "../redux/action";
import axios from 'axios';
import Connexion from "../../Connexion";

class  InscrireUser extends React.Component {


    constructor(props){
        super(props);
        this.state={
            nom:'',
            tel:'',
            email:'',
            type:'utilisateur',
            mot_de_passe:'',
            c_mot_de_passe:'',
            isFocused1:false,
            isFocused2:false,
            isFocused3:false,
            isFocused4:false,
            isFocused5:false,
            error1:false,error2:false,error1:false,error3:false,error4:false,error5:false
        }
        this.SignUpUser=this.SignUpUser.bind(this);
    }

    handleFocus1 = () => this.setState({isFocused1: true})

    handleBlur1 = () => this.setState({isFocused1: false})

    handleFocus2 = () => this.setState({isFocused2: true})

    handleBlur2 = () => this.setState({isFocused2: false})

    handleFocus3 = () => this.setState({isFocused3: true})

    handleBlur3 = () => this.setState({isFocused3: false})

    handleFocus4 = () => this.setState({isFocused4: true})

    handleBlur4 = () => this.setState({isFocused4: false})

    handleFocus5 = () => this.setState({isFocused5: true})

    handleBlur5 = () => this.setState({isFocused5: false})





    async SignUpUser(){

        if(this.state.nom === ''){
            this.setState({error1:true})
        }
        if(this.state.tel === ''){
         this.setState({error2:true})
     }
     if(this.state.email === ''){
         this.setState({error3:true})
     }
     
     if(this.state.mot_de_passe === ''){
         this.setState({error4:true})
     }
     if(this.state.c_mot_de_passe === ''){
         this.setState({error5:true})
     }


     if(this.state.nom !=='' && this.state.tel!=='' && this.state.email!=='' && this.state.mot_de_passe!=='' && this.state.c_mot_de_passe!==''){

        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(this.state.email) === false) {
            Alert.alert("ceci n'est un email adresse");
          }
          else {
            if(this.state.mot_de_passe==this.state.c_mot_de_passe){
                console.log(this.state.nom);
                console.log(this.state.tel);
                console.log(this.state.email);
                console.log(this.state.mot_de_passe);
                console.log(this.state.c_mot_de_passe);
                console.log(this.state.type);
                try {
                    
                    axios.post(Connexion.adresse+'/api/auth/signup',{nom:this.state.nom,tel:this.state.tel,email:this.state.email,type:this.state.type,mot_de_passe:this.state.mot_de_passe})
                    .then(response=>{
                        
                        if(response.data.messageSuccess===undefined){
    
                            Alert.alert(response.data.messageError);
                          }
                        else{
                           
                            Alert.alert(response.data.messageSuccess);
                            this.props.navigation.navigate('Se connecter');
                        }
    
                   
    
                    })

                } catch (error) {
                    
                }
                
            }
            else{
                Alert.alert("confirmer votre mot de passe");
            }
          }


     }



    }





    borderColor1() {
        if(this.state.isFocused1 === false && this.state.error1 === true){
           ;
            return 'red';
        }else if(this.state.isFocused1 === true ){
            
            return '#63ff9e';
        }else{
            
            return '#000';
        }
    }
    borderColor2() {
        if(this.state.isFocused2 === false && this.state.error2 === true){
           ;
            return 'red';
        }else if(this.state.isFocused2 === true ){
            
            return '#63ff9e';
        }else{
            
            return '#000';
        }
    }
    borderColor3() {
        if(this.state.isFocused3 === false && this.state.error3 === true){
           ;
            return 'red';
        }else if(this.state.isFocused3 === true ){
            
            return '#63ff9e';
        }else{
            
            return '#000';
        }
    }
    borderColor4() {
        if(this.state.isFocused4 === false && this.state.error4 === true){
           ;
            return 'red';
        }else if(this.state.isFocused4 === true ){
            
            return '#63ff9e';
        }else{
            
            return '#000';
        }
    }

    borderColor5() {
        if(this.state.isFocused5 === false && this.state.error5 === true){
           ;
            return 'red';
        }else if(this.state.isFocused5 === true ){
            
            return '#63ff9e';
        }else{
            
            return '#000';
        }
    }


    render(){
      
       const bordercolor1=this.borderColor1();
       const bordercolor2=this.borderColor2();
       const bordercolor3=this.borderColor3();
       const bordercolor4=this.borderColor4();
       const bordercolor5=this.borderColor5();
       

        return(
            <SafeAreaView style={styles.container}>

             <View style={{flex:1,marginTop:0,marginLeft:20,marginRight:20}}>
                    <ScrollView style={styles.scrollView}>
                        
                            <View style={{alignItems:'center',marginBottom:20}}>
                                <TouchableOpacity  onPress={()=>{this.props.navigation.navigate('Deliveroo')}}>
                                    <View><Image source={moto}  /></View>
                                    <View style={{alignItems:'center',justifyContent:'center',flexDirection:'row'}}>
                                    <Text style={{color:'#63ff9e',fontSize:40}}>D</Text>
                                    <Text style={{fontSize:25}}>eliveroo</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View>
                                <View>
                                <View style={{paddingBottom:19}}>
                                <TextInput value={this.state.nom}  onFocus={this.handleFocus1}  onBlur={this.handleBlur1}  style={{borderWidth:1,borderColor:bordercolor1,borderRadius:4,paddingLeft:10,paddingTop:5,paddingBottom:5}} maxLength = {10}  placeholder='Entrer votre nom' onChangeText={(text)=>{this.setState({nom:text})}}  />
                            </View>
                            <View style={{paddingBottom:19}}>
                                <TextInput value={this.state.tel} onFocus={this.handleFocus2}  onBlur={this.handleBlur2}  style={{borderWidth:1,borderColor:bordercolor2,borderRadius:4,paddingLeft:10,paddingTop:5,paddingBottom:5}} maxLength = {8} keyboardType="numeric"  placeholder='Entrer votre tel' onChangeText={(text)=>{this.setState({tel:text})}}  />
                            </View>
                            <View style={{paddingBottom:19}}>
                            <TextInput value={this.state.email} onFocus={this.handleFocus3}  onBlur={this.handleBlur3} style={{borderWidth:1,borderColor:bordercolor3,borderRadius:4,paddingLeft:10,paddingTop:5,paddingBottom:5}} maxLength = {25} keyboardType="email-address" placeholder='Entrer votre email' onChangeText={(text)=>{this.setState({email:text})}}  />
                            </View>
                            <View  
                            
                            style={{paddingBottom:19}}>
                            <TextInput value={this.state.mot_de_passe} 
                            onFocus={this.handleFocus4} 
                                onBlur={this.handleBlur4} 
                                style={{borderWidth:1,borderColor:bordercolor4,borderRadius:4,paddingLeft:10,paddingTop:5,paddingBottom:5}} 
                                placeholder='Entrer votre mot de passe' 
                                onChangeText={(text)=>{this.setState({mot_de_passe:text})}}
                                maxLength = {15}
                                secureTextEntry
                                />
                            
                            </View>
                            <View  style={{paddingBottom:19}}>
                            <TextInput   secureTextEntry value={this.state.c_mot_de_passe} maxLength = {15} onFocus={this.handleFocus5}  onBlur={this.handleBlur5} style={{borderWidth:1,borderColor:bordercolor5,borderRadius:4,paddingLeft:10,paddingTop:5,paddingBottom:5}} placeholder='Confirmer votre mot de passe' onChangeText={(text)=>{this.setState({c_mot_de_passe:text})}}  />
                            </View>
                            <View style={{paddingBottom:19}}>
                                <TouchableOpacity
                                        style={{backgroundColor:'#63ff9e',borderRadius:4,paddingLeft:10,paddingTop:10,paddingBottom:10,alignItems:'center'}}
                                        onPress={this.SignUpUser}
                                        >
                                        <Text style={{color:'#fff',fontSize:16}}>Inscrivez-vous</Text>
                                </TouchableOpacity>
                            </View>
                                </View>
                            </View>
                       
                    
                    </ScrollView>
             </View>   
            
          </SafeAreaView>
           );
    }
}


const mapStateToProps = state => {
 
    return state;
  };

export default connect(mapStateToProps,{ signIn  })(InscrireUser);




const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: StatusBar.currentHeight,
      borderWidth:4,
      borderColor:'white'
    },
    scrollView: {
      
     
      
    },
    text: {
      fontSize: 42,
    },
  });