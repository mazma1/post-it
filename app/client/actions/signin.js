import axios from 'axios';
import jwt from 'jsonwebtoken';
import { SET_CURRENT_USER, DELETE_CURRENT_USER } from './types';
import setAuthorizationToken from '../../utils/setAuthorizationToken';


export function deleteCurrentUser() {
  return {
    type: DELETE_CURRENT_USER,
    user: {}
  };
}

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  };
}

export function logout() {
  return (dispatch) => {
    localStorage.removeItem('jwtToken');
    setAuthorizationToken(false);
    dispatch(deleteCurrentUser());
  };
}

export function userSigninRequest(userData) {
  const request = axios.post('/api/v1/users/signin', userData);

  return (dispatch) => {
    return request.then((res) => {
      const token = res.data.token;
      localStorage.setItem('jwtToken', token);
      setAuthorizationToken(token);
      dispatch(setCurrentUser(jwt.decode(token)));
    });
  };
}

