import axios from 'axios';


/**
   * Makes request to send a user password reset link
   *
   * @param {string} email user's email
   *
   * @returns {response} request response
   */
export function resetLinkRequest(email) {
  return dispatch => axios.post('/api/v1/users/resetpassword', email)
    .catch(error => (error));
}


/**
   * Makes request to validate password reset token
   *
   * @param {string} token token to be validated
   *
   * @returns {response} request response
   */
export function validateResetPasswordToken(token) {
  return dispatch => axios.post('/api/v1/users/newpassword', token)
    .catch(error => (error));
}


/**
   * Makes request to update a user's password
   *
   * @param {string} newPasswordDetails new pssword details
   *
   * @returns {response} request response
   */
export function updatePassword(newPasswordDetails) {
  const { token } = newPasswordDetails;
  return dispatch => axios.patch(`/api/v1/users/updatepassword/${token}`, newPasswordDetails)
    .catch(error => (error));
}
