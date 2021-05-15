import { ADD_ColisInfos,DROP_ColisInfos } from './actionTypesColis';



export const addColisInfos = user => ({
    type: ADD_ColisInfos,
    payload: {
     user
    }
});


  
  export const dropColisInfos = () => ({
      type: DROP_ColisInfos
  });









