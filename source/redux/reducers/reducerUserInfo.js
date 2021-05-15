import { ADD_User_INFO,ADD_ADRESSE_EMAIL,DROP_User_INFO } from '../actionTYpesUserInfo';

import io from 'socket.io-client/dist/socket.io';

const socket = io('http://192.168.1.15:4000/', {
              jsonp: false,
              autoConnect: false,
              transports: ['websocket'], // you need to explicitly tell it to use websockets
            });


let initialStateUserInfo={
   nomUser:null,
   telUser:null,
   emailUser:null,
   typeUser:null,
   socket:socket 
}


export default function reducerUserInfo(state=initialStateUserInfo,action){

    switch (action.type) {
        case ADD_User_INFO:{
            const { nomUser,telUser,typeUser } = action.payload;
            return {
                ...state,
                nomUser:nomUser,
                telUser: telUser,
                typeUser:typeUser
              };
        }
        case ADD_ADRESSE_EMAIL:{
            const { emailUser } = action.payload;
            return {
                ...state,
                emailUser: emailUser,
              };
        }

        case DROP_User_INFO:{
            
            return {
                ...state,
                nomUser:null,
                telUser: null,
                typeUser:null,
                emailUser: null
              };
        }

        default:
            return state;


    }
}