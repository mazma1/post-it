import axios from 'axios';

/**
  * Makes request to sign up a user

  * @param {object} userData user's required credentials

  * @returns {response} request response
  */
export default function userSignUpRequest(userData) {
  return (dispatch) => {
    return axios.post('/api/v1/users/signup', userData)
      .then()
      .catch();
  };
}
