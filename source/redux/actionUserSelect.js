import { ADD_UserSelect,DROP_UserSelect } from './actionTypesUserSelect';



export const addUserSelect = user => ({
  type: ADD_UserSelect,
  payload: {
   user
  }
});

export const dropUserSelect = () => ({
    type: DROP_UserSelect
});



   