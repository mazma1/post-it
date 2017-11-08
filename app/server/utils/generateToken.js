import jwt from 'jsonwebtoken';

/**
 * Generate JSON web token for authenticated users
 *
 * @param {Object} user details of authenticated user
 *
 * @returns {String} authentication token
 */
function generateToken(user) {
  const { id, firstName, lastName, username, email } = user;
  const token = jwt.sign({
    data: {
      id,
      firstName,
      lastName,
      username,
      email
    }
  }, process.env.TOKEN_SECRET, { expiresIn: '12h' });
  return token;
}

export default generateToken;
