import { ADD_ColisInfos,DROP_ColisInfos } from '../actionTypesColis';



let initialStateColisInfo={
    colisInfos:{}
};
 
 
export default function reducerUserInfo(state=initialStateColisInfo,action){

    switch (action.type) {
        case ADD_ColisInfos:{
            
            return {
                ...state,
                colisInfos:action.payload
              };
        }
       

        case DROP_ColisInfos:{
            
            return {
                ...state,
                colisInfos:{}
              };
        }

        default:
            return state;


    }
}















