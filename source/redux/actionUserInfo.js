import { ADD_User_INFO,ADD_ADRESSE_EMAIL,DROP_User_INFO,MODIFY_NOM,MODIFY_TEL } from './actionTYpesUserInfo';


export const ADDuserINFO = userInfo => ({
    type: ADD_User_INFO,
    payload: {
        nomUser:userInfo.nom,
        telUser:userInfo.tel,
        typeUser:userInfo.type
    }
  
});

export const ModifierVotreNom  = userNom => ({
    type: MODIFY_NOM,
    payload: {
        userNom
    }
});




export const ModifierNumeroTel = userTel => ({
    type: MODIFY_TEL,
    payload: {
        userTel
     }
});



  export const ADDuserADRESSE = emailUser => ({
      type: ADD_ADRESSE_EMAIL,
      payload: {
        emailUser
       }
});

export const DROPuserINFOANDEMAIl = () => ({
    type: DROP_User_INFO
});




