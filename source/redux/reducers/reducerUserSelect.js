import { ADD_UserSelect,DROP_UserSelect } from '../actionTypesUserSelect';



let initialStateUserSelect={
    userSelect:{}
};
 
 
 export default function reducerUserInfo(state=initialStateUserSelect,action){
 
     switch (action.type) {
         case ADD_UserSelect:{
             
             return {
                 ...state,
                 userSelect:action.payload
               };
         }
         
         case DROP_UserSelect:{
             
             return {
                 ...state,
                 userSelect:{}
               };
         }
 
         default:
             return state;
 
 
     }
 }