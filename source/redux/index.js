import User_Token from './reducers/reducerProfil';
import User_Info from './reducers/reducerUserInfo';
import { combineReducers } from 'redux';

export default combineReducers({
    User_Token,
    User_Info
  });