import axios from 'axios';
import {
  REQUEST_NEW_PASSWORD_SUCCESS,
  REQUEST_NEW_PASSWORD_FAILURE,
  SET_TOKEN_STATUS,
  TOKEN_STATUS_ERROR
} from '../actions/types';


/**
   * Informs reducers that the request to receive reset password link finished * successfully
   *
   * @param {string} message - Response that states that email was successfully
   * sent
   *
   * @returns {object} Sends the success message to the store
   */
export function setRequestResponse(message) {
  return {
    type: REQUEST_NEW_PASSWORD_SUCCESS,
    message
  };
}


/**
   * Informs reducers that the request to receive reset password link finished * with an error
   *
   * @param {string} error - Error message
   *
   * @returns {object} Sends the error message to the store
   */
export function resetPasswordFailure(error) {
  return {
    type: REQUEST_NEW_PASSWORD_FAILURE,
    error
  };
}


/**
  * Makes request to send a user password reset link
  *
  * @param {string} email - User's email
  *
  * @returns {promise} Response indicating that the email was
  * successfully sent
  */
export function resetLinkRequest(email) {
  return dispatch => axios.post('/api/v1/users/reset-password', email).then(
    (res) => {
      const { message } = res.data;
      dispatch(setRequestResponse(message));
    }
  ).catch((error) => {
    dispatch(resetPasswordFailure(error.data.error));
  });
}


/**
   * Informs reducers that the reset password token provided is valid
   *
   * @param {string} message - Response specifying validity of token
   *
   * @returns {object} Sends the success message to the store
   */
export function setTokenStatus(message) {
  return {
    type: SET_TOKEN_STATUS,
    message
  };
}


/**
   * Informs reducers that the reset password token provided is invalid
   *
   * @param {string} message - Error message
   *
   * @returns {object} Sends the error message to the store
   */
export function tokenStatusError(message) {
  return {
    type: TOKEN_STATUS_ERROR,
    message
  };
}

/**
  * Makes request to validate password reset token
  *
  * @param {string} token - Token to be validated
  *
  * @returns {promise} Response stating whether the token is valid or not
  */
export function validateResetPasswordToken(token) {
  return dispatch => axios.post('/api/v1/users/new-password', token).then(
    (res) => {
      const { message } = res.data;
      dispatch(setTokenStatus(message));
    }
  ).catch((error) => {
    dispatch(tokenStatusError(error.response.data.message));
  });
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
    `/api/v1/users/update-password/${token}`, newPasswordDetails
  );
}
