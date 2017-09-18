import axios from 'axios';

export function resetLinkRequest(email) {
  const request = axios.post('/api/v1/users/resetpassword', email);

  return dispatch => request;
}

export function validateResetPasswordToken(token) {
  const request = axios.post('/api/v1/users/newpassword', token);

  return dispatch => request;
}

export function updatePassword(newPasswordDetails) {
  const token = newPasswordDetails.token;
  const request = axios.patch(`/api/v1/users/updatepassword/${token}`, newPasswordDetails);

  return dispatch => request;
}
