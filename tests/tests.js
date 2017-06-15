'use strict';
const supertest = require('supertest');
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = require('chai').should;
const app = require('../app/server/app.js');


const User = require('../app/server/models').User;
const userController = require('../app/server/controllers/userController.js');
const tokenAuth = require('../app/server/middlewares/tokenAuth.js');

// Test for models
describe('Post It Models', ()  => {  
  
  describe('Users', () => {
    // This function will run before every test to clear database
    beforeEach((done) => { //Before each test we empty the database
      User.remove({}, (err) => 
        done();
      });
    });
  });

  describe('/POST New User', () => {
    it('it should POST a new user', (done) => {
      chai.request(app)
        .post('/api/user/signup')
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('Object');
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });
});
