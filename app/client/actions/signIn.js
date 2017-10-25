import axios from 'axios';
import jwt from 'jsonwebtoken';
import { SET_CURRENT_USER, DELETE_CURRENT_USER } from './types';
import setAuthorizationToken from '../utils/setAuthorizationToken';

/**
  * Makes request to sign in a user
  *
  * @param {object} userData user's required sign in credentials
  *
  * @returns {response} request response
  */
export function userSignInRequest(userData) {
  return dispatch => axios.post('/api/v1/users/signin', userData)
    .then((res) => {
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);
      setAuthorizationToken(token);
      dispatch(setCurrentUser(jwt.decode(token)));
    });
}


/**
  * Makes request to authenticate a user via Google API
  *
  * @param {object} tokenId user's google token id to be verified
  *
  * @returns {response} request response
  */
export function googleSignIn(tokenId) {
  return dispatch => axios.post('/api/v1/users/googleAuth', tokenId)
    .then((res) => {
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);
      setAuthorizationToken(token);
      dispatch(setCurrentUser(jwt.decode(token)));
    });
}

/**
   * Informs reducers that the request to sign in user finished successfully
   *
   * @param {object} user user's information
   *
   * @returns {action} action type and payload
   */
export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  };
}


/**
   * Logs out a user and deletes token from local storage
   *
   * @returns {action} action to delete user details
   */
export function logout() {
  return (dispatch) => {
    localStorage.removeItem('jwtToken');
    setAuthorizationToken(false);
    dispatch(deleteCurrentUser());
  };
}


/**
   * Informs reducer to delete details of the current user from the store
   *
   * @returns {action} action type and payload
   */
export function deleteCurrentUser() {
  return {
    type: DELETE_CURRENT_USER,
    user: {}
  };
}
