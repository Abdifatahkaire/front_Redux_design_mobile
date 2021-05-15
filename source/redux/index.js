import User_Token from './reducers/reducerProfil';
import User_Info from './reducers/reducerUserInfo';
import Colis_Infos from './reducers/reducerColis';
import UserSelect from './reducers/reducerUserSelect';

import { combineReducers } from 'redux';

export default combineReducers({
    User_Token,
    User_Info,
    Colis_Infos,
    UserSelect
  });