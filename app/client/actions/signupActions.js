import axios from 'axios';

export function userSignupRequest(userData) {
  const request = axios.post('/api/user/signup', userData);

  return (dispatch) => {
    return request;
  };
}
