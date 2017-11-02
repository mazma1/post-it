import axios from 'axios';
import jwt from 'jsonwebtoken';
import { setCurrentUser } from './signIn';
import setAuthorizationToken from '../utils/setAuthorizationToken';

/**
  * Makes request to sign up a user
  *
  * @param {object} userData user's required credentials for sign up
  *
  * @returns {response} request response
  */
export default function userSignUpRequest(userData) {
  return dispatch => axios.post('/api/v1/users/signup', userData)
    .then((res) => {
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);
      setAuthorizationToken(token);
      dispatch(setCurrentUser(jwt.decode(token)));
    });
}
