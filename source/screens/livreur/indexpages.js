import React from "react";
import { StyleSheet, Text, View,Picker,Button,Image,TouchableOpacity,FlatList,Dimensions } from 'react-native';
import {connect} from "react-redux";
import axios from 'axios';
import { addUserSelect,dropUserSelect } from '../../redux/actionUserSelect';
import * as SecureStore from 'expo-secure-store';


import Map from './map';
import Notification from './notification';




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







class  Indexpages extends React.Component {
  
    constructor(props){
        super(props);
        
        
        this.state={
          
          count:0
        }
        this.verifyuserSelectedParse=this.verifyuserSelectedParse.bind(this);
    }

    componentDidMount(){
       
      console.log('IndexColis');
   
      this.verifyuserSelectedParse();
      


    }

    async verifyuserSelectedParse(){


      const userSelected=await getUserSelected();
      
      
      if(userSelected!==null){
        let userSelectedParse=JSON.parse(userSelected);
        this.props.addUserSelect(userSelectedParse);
      }
      
    }
   
    

    render(){
     
       
        return(
             
            <View>
              {Object.keys(this.props.UserSelect.userSelect).length!==0 ? <View>
                     <Map />
                  </View> : 
                     <Notification />
                    }
            </View>
           );
    }
}



const mapStateToProps = state => {
 
    return state;
  };

export default connect(mapStateToProps,{ addUserSelect,dropUserSelect })(Indexpages);