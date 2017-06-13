// const User = require('../models').User;
const bcrypt = require('bcrypt');
const pg = require('pg');

let signupResult = [];

exports.create = function(req, res) {
  const userData = {
    email: req.body.email,
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password),
  };

  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if (err) {
      done();
      console.log(err);
      return res.status(500).json({
        success: false, data: err
      });
    }
    // SQL Query > Insert Data
    client.query('INSERT INTO Users(email, username, password) values($1, $2, $3)',
    [userData.email, userData.username, userData.password]);
    // SQL Query > Select Data
    const query = client.query('SELECT * FROM Users ORDER BY ID DESC LIMIT 1');
    // Stream results back one row at a time
    query.on('row', (row) => {
      signupResult.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();
      return res.json(signupResult);
    });
  });
};


