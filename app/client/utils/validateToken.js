import jwt from 'jsonwebtoken';

/**
  * Checks if the token in the local storage is still valid or expired
  *
  * @returns {boolean} validity of token
  */
export default function validateToken() {
  const token = localStorage.getItem('jwtToken');
  let expiredToken;
  if (token) {
    const expiryDate = jwt.decode(token).exp;
    expiredToken = expiryDate > Date.now() / 1000;
  }
  return expiredToken;
}

