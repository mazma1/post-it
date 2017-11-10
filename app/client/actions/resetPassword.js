import axios from 'axios';
import toastr from 'toastr';


/**
  * Makes request to send a user password reset link
  *
  * @param {string} email - User's email
  *
  * @returns {promise} Response indicating that the email was
  * successfully sent
  */
export function resetLinkRequest(email) {
  return () => axios.post('/api/v1/users/resetpassword', email);
}


/**
  * Makes request to validate password reset token
  *
  * @param {string} token - Token to be validated
  *
  * @returns {promise} Response stating whether the token is valid or not
  */
export function validateResetPasswordToken(token) {
  return () => axios.post('/api/v1/users/newpassword', token);
}


/**
  * Makes request to update a user's password
  *
  * @param {string} newPasswordDetails - New pssword details to be updated
  *
  * @returns {response} Response that tells if the password was successfully
  * updated
  */
export function updatePassword(newPasswordDetails) {
  const { token } = newPasswordDetails;
  return () => axios.patch(
    `/api/v1/users/updatepassword/${token}`, newPasswordDetails
  );
}
