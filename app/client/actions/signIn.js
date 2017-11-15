import axios from 'axios';
import jwt from 'jsonwebtoken';
import toastr from 'toastr';
import {
  SET_CURRENT_USER,
  DELETE_CURRENT_USER,
  SET_GOOGLE_AUTH_STATUS } from './types';
import setAuthorizationToken from '../utils/setAuthorizationToken';


/**
   * Informs reducers that the request to sign in user finished successfully
   *
   * @param {object} user - Information of user who was successfully signed in
   *
   * @returns {object} Adds the details of the signed in user to the store
   */
export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  };
}


/**
   * Informs reducer to delete details of the current user from the store
   *
   * @returns {object} Action that sets the details of the just signed out user
   * to an empty object
   */
export function deleteCurrentUser() {
  return {
    type: DELETE_CURRENT_USER,
    user: {}
  };
}

/**
  * Makes request to sign in a user to the app
  *
  * @param {object} userData - User's required sign in credentials
  *
  * @returns {promise} Authentication token
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
   * Informs reducers that the request to verify if a Google user is a new or
   * returning user finished successfully
   *
   * @param {string} status - States whether a user is new or returning
   *
   * @returns {object} Action that sends the status to the store
   */
export function setGoogleAuthStatus(status) {
  return {
    type: SET_GOOGLE_AUTH_STATUS,
    status
  };
}


/**
  * Makes request to authenticate a user signing in via Google
  *
  * @param {object} userDetails - Details of user gotten from the Google
  * authentication API
  *
  * @returns {promise} Authentication token
  */
export function googleSignIn(userDetails) {
  return dispatch => axios.post('/api/v1/users/google-auth', userDetails)
    .then((res) => {
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);
      setAuthorizationToken(token);
      dispatch(setCurrentUser(jwt.decode(token)));
      window.location.href = '/message-board';
    });
}


/**
  * Makes request to verify if a Google user is a new or returning user, and
  * proceed to sign a returning user in
  *
  * @param {object} payload - Details of user to be verified
  *
  * @returns {promise} Status of the user
  */
export function authorizeGoogleUser(payload) {
  const { email, userDetails } = payload;
  return dispatch => axios.post(
    '/api/v1/users/verify-user', { email }
  ).then((res) => {
    const status = res.data.message;
    dispatch(setGoogleAuthStatus(status));
    if (status === 'Returning user') {
      dispatch(googleSignIn(userDetails));
    }
  }).catch(() => {
    toastr.error('Unable to verify user, please try again');
  });
}


/**
   * Logs out a user and deletes token from local storage
   *
   * @returns {action} action to delete user's details
   */
export function logout() {
  return (dispatch) => {
    localStorage.removeItem('jwtToken');
    setAuthorizationToken(false);
    dispatch(deleteCurrentUser());
  };
}

