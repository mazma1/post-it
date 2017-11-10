import axios from 'axios';

/**
  * Sets a user's authorization token as header for every server request
  *
  * @param {string} token - User's authentication token
  *
  * @returns {void} null
  */
export default function setAuthorizationToken(token) {
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
}
