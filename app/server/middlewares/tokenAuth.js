const User = require('../models/user');
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // check header or url parameters or post parameters for token
  const authorizationHeader = req.headers.authorization;
  let token;

  if (authorizationHeader) {
    token = authorizationHeader.split(' ')[1];
  } else {
    token = (req.body && req.body.access_token) ||
            (req.query && req.query.access_token) ||
            req.headers['x-access-token'];
  }
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
      if (err) {
        if (err.message === 'jwt expired') {
          res.status(401).send({ error: 'Access token has expired' });
        } else {
          res.status(401).send({ error: 'Access token has expired' });
        }
      } else {
        // if everything is good, send details of token for use in other routes
        req.decoded = decoded;
        next();
      }
    });
  } else {
    res.status(403).send({ error: 'No token provided.' });
  }
};
