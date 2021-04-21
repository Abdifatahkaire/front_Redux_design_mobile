import { ADD_User_INFO,ADD_ADRESSE_EMAIL,DROP_User_INFO } from '../actionTYpesUserInfo';


let initialStateUserInfo={
   nomUser:null,
   telUser:null,
   emailUser:null,
   typeUser:null
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