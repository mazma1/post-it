import axios from 'axios';

/**
   * Sets a user's authorization token as header for every server request
   *
   * @param {string} token user's autjentication token
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
