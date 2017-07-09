import axios from 'axios';
import jwt from 'jsonwebtoken';
import setAuthorizationToken from '../utils/setAuthorizationToken';

export function userSigninRequest(userData) {

  const request = axios.post('/api/user/signin', userData); // Returns a response

  return (dispatch) => {
    return request.then((res) => {
      const token = res.data.token;
      localStorage.setItem('jwtToken', token);
      setAuthorizationToken(token);
      console.log(jwt.decode(token));
    });
  };
}

