const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app/server/app.js');
const bcrypt = require('bcrypt');
const User = require('../app/server/models').User;

const should = chai.should();
chai.use(chaiHttp);

describe('POST /api/user/signin', () => {
  describe('status 201', () => {
    it('returns a token for successful sign in', (done) => {
      const user = {
        username: 'mary',
        password: '1234'
      };
      chai.request(app)
        .post('/api/user/signin')
          .send(user)
          .end((err, res) => {
            res.status.should.equal(201);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('User successfully logged in');
            res.body.should.have.property('token');
            done();
          });
    });
  });

  describe('status 401', () => {
    it('throws error for invalid username', (done) => {
      const user = {
        username: 'mary1',
        password: '1234'
      };
      chai.request(app)
        .post('/api/user/signin')
          .send(user)
          .end((err, res) => {
            res.status.should.equal(401);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Invalid username or password');
            done();
          });
    });

    it('throws error for invalid password', (done) => {
      const user = {
        username: 'mary',
        password: '123456'
      };
      chai.request(app)
        .post('/api/user/signin')
          .send(user)
          .end((err, res) => {
            res.status.should.equal(401);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Invalid username or password');
            done();
          });
    });

    it('throws error for no username ore password', (done) => {
      const user = {
        username: '',
        password: ''
      };
      chai.request(app)
        .post('/api/user/signin')
          .send(user)
          .end((err, res) => {
            res.status.should.equal(401);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Enter a valid username and password');
            done();
          });
    });
  });
});
