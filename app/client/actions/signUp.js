import axios from 'axios';
import jwt from 'jsonwebtoken';
import toastr from 'toastr';
import { setCurrentUser } from './signIn';
import setAuthorizationToken from '../utils/setAuthorizationToken';

/**
  * Makes request to sign up a new user
  *
  * @param {object} userData - User's required credentials for sign up
  *
  * @returns {promise} Authentication token
  */
export default function userSignUpRequest(userData) {
  return dispatch => axios.post('/api/v1/users/signup', userData)
    .then((res) => {
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);
      setAuthorizationToken(token);
      dispatch(setCurrentUser(jwt.decode(token)));
    })
    .catch(error => toastr.error(`Ooops! ${error.response.data.error}`));
}
