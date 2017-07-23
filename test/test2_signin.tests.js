const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app/server/app.js');

process.env.NODE_ENV = 'test';
const should = chai.should();
chai.use(chaiHttp);

describe('POST /api/user/signin Route', () => {
  describe('User sign in', () => {
    it('returns a token on successful sign in', (done) => {
      const user = {
        identifier: 'mary',
        password: '1234'
      };
      chai.request(app)
        .post('/api/user/signin')
        .type('form')
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

  // describe('status 401', () => {
  it('returns status 401 for invalid identifier (email or username)', (done) => {
    const user = {
      identifier: 'mary1',
      password: '1234'
    };
    chai.request(app)
      .post('/api/user/signin')
      .type('form')
        .send(user)
        .end((err, res) => {
          res.status.should.equal(401);
          res.body.should.be.a('object');
          res.body.should.have.property('identifier').eql('Invalid username or password');
          done();
        });
  });

  it('returns status 401 for invalid password', (done) => {
    const user = {
      identifier: 'mary',
      password: '123456'
    };
    chai.request(app)
      .post('/api/user/signin')
      .type('form')
        .send(user)
        .end((err, res) => {
          res.status.should.equal(401);
          res.body.should.be.a('object');
          res.body.should.have.property('identifier').eql('Invalid username or password');
          done();
        });
  });

  it('returns status 401 for no identifier (email or username) or password', (done) => {
    const user = {
      identifier: '',
      password: ''
    };
    chai.request(app)
      .post('/api/user/signin')
        .send(user)
        .end((err, res) => {
          res.status.should.equal(401);
          res.body.should.be.a('object');
          res.body.should.have.property('identifier').eql('This field is required');
          res.body.should.have.property('password').eql('This field is required');
          done();
        });
  });
  // });
});
