import axios from 'axios';

export function userSigninRequest(userData) {
  const request = axios.post('/api/user/signin', userData); // Returns a response

  return (dispatch) => {
    return request;
  };
}
