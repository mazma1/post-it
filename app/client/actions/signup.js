import axios from 'axios';

export function userSignupRequest(userData) {
  const request = axios.post('/api/v1/users/signup', userData); // Returns a response

  return (dispatch) => {
    return request;
  };
}
