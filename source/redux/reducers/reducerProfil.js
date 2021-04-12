import {SIGN_IN, SIGN_OUT, RESTORE_TOKEN } from "../actionTypes";
let initialState={
    isLoading: true,
    isSignout: false,
    userToken: null,
  };

function reducerProfil(state=initialState,action){
    
      switch (action.type) {
        case RESTORE_TOKEN:{
            const { userToken } = action.payload;
            return {
                ...state,
                userToken: userToken,
                isLoading: false,
              };
        }
          
        case SIGN_IN:{
            const { userToken } = action.payload;
            return {
                ...state,
                isSignout: false,
                userToken: userToken,
              };
        }
          
        case SIGN_OUT:{
            return {
                ...state,
                isSignout: true,
                userToken: null,
              };
        }
          
          default:
              return state;
      }
    

}
    
    
export default reducerProfil;