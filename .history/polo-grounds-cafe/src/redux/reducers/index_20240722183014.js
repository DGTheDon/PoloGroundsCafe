import { combineReducers } from 'redux';
import userReducer from './userReducer';
import cartReducer from './cartReducer';
import menuReducer from './menuReducer';

export default combineReducers({
  user: userReducer,
  cart: cartReducer,
  menu: menuReducer,
});