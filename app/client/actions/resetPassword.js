import axios from 'axios';

export function resetLinkRequest(email) {
  const request = axios.post('/api/user/reset_password', email);

  return dispatch => request;
}

export function validateResetPasswordToken(token) {
  const request = axios.post('/api/user/newpassword', token);

  return dispatch => request;
}

export function updatePassword(newPasswordDetails) {
  const token = newPasswordDetails.token;
  const request = axios.patch(`/api/user/updatepassword/${token}`, newPasswordDetails);

  return dispatch => request;
}
