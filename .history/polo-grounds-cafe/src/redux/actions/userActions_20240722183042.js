import { auth } from '../../firebase';
import { USER_LOGIN, USER_LOGOUT } from '../types';

export const loginUser = (user) => ({
  type: USER_LOGIN,
  payload: user,
});

export const logoutUser = () => ({
  type: USER_LOGOUT,
});

export const checkUserAuth = () => (dispatch) => {
  auth.onAuthStateChanged((user) => {
    if (user) {
      dispatch(loginUser(user));
    } else {
      dispatch(logoutUser());
    }
  });
};