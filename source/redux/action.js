import {SIGN_IN, SIGN_OUT, RESTORE_TOKEN } from "./actionTypes";

let nextTodoId = 0;

export const signIn = userToken => ({
  type: SIGN_IN,
  payload: {
   userToken
  }
});

export const signOut = () => ({
    type: SIGN_OUT
  });



  export const restoreToken = userToken => ({
    type: RESTORE_TOKEN,
    payload: {
     userToken
    }
  });  