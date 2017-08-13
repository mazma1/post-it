const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app/server/app.js');
const bcrypt = require('bcryptjs');
const User = require('../app/server/models').User;

process.env.NODE_ENV = 'test';
const should = chai.should();
chai.use(chaiHttp);

const saltRounds = 7;
const salt = bcrypt.genSaltSync(saltRounds);

describe('POST /api/user/signup Route', () => {
  before((done) => {
    User.destroy({
      cascade: true,
      truncate: true,
      restartIdentity: true
    })
    .then(() => {
      User.create({
        firstname: 'Mary',
        lastname: 'Mazi',
        username: 'mary',
        email: 'mary@gmail.com',
        password: bcrypt.hashSync('1234', salt),
        confirm_password: bcrypt.hashSync('1234', salt)
      });
      done();
    })
    .catch((error) => {
      done(error);
    });
  });

  describe('Sign up a new user', () => {
    it('returns successfully signed up user', (done) => {
      const user = {
        firstname: 'Mary1',
        lastname: 'Mazi1',
        username: 'maryx',
        email: 'maryx@gmail.com',
        password: '1234',
        confirm_password: '1234'
      };
      chai.request(app)
        .post('/api/user/signup')
        .type('form')
        .send(user)
        .end((err, res) => {
          res.status.should.equal(201);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Signup was successful');
          res.body.should.have.property('token');
          done();
        });
      // done();
    });

    // describe('status 400', () => {
    it('returns status 400 for incorrect email syntax', (done) => {
      const user = {
        firstname: 'Mary2',
        lastname: 'Mazi2',
        username: 'maryx1',
        email: 'maryxgmail.com',
        password: '1234',
        confirm_password: '1234'
      };
      chai.request(app)
        .post('/api/user/signup')
        .type('form')
        .send(user)
        .end((err, res) => {
          res.status.should.equal(400);
          res.body.should.be.a('object');
          res.body.should.have.property('email').eql('Invalid email');
          done();
        });
    });

    it('returns status 400 for missing email', (done) => {
      const user = {
        firstname: 'Mary3',
        lastname: 'Mazi3',
        username: 'maryx',
        password: '1234',
        confirm_password: '1234'
      };
      chai.request(app)
        .post('/api/user/signup')
        .type('form')
        .send(user)
        .end((err, res) => {
          res.status.should.equal(400);
          res.body.should.be.a('object');
          res.body.should.have.property('email').eql('This field is required');
          done();
        });
    });

    it('returns status 400 for missing username', (done) => {
      const user = {
        firstname: 'Mary4',
        lastname: 'Mazi4',
        email: 'maryx@gmail.com',
        password: '1234',
        confirm_password: '1234'
      };
      chai.request(app)
        .post('/api/user/signup')
        .type('form')
        .send(user)
        .end((err, res) => {
          res.status.should.equal(400);
          res.body.should.be.a('object');
          res.body.should.have.property('username').eql('This field is required');
          done();
        });
    });

    it('returns status 400 for missing password', (done) => {
      const user = {
        firstname: 'Mary5',
        lastname: 'Mazi5',
        email: 'maryx@gmail.com',
        username: 'maryx',
      };
      chai.request(app)
        .post('/api/user/signup')
        .type('form')
        .send(user)
        .end((err, res) => {
          res.status.should.equal(400);
          res.body.should.be.a('object');
          res.body.should.have.property('password').eql('This field is required');
          done();
        });
    });

    it('returns status 400 when all required fields are missing', (done) => {
      const user = {
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        password: '',
        confirm_password: ''
      };
      chai.request(app)
        .post('/api/user/signup')
        .type('form')
        .send(user)
        .end((err, res) => {
          res.status.should.equal(400);
          res.body.should.be.a('object');
          res.body.should.have.property('firstname').eql('This field is required');
          res.body.should.have.property('lastname').eql('This field is required');
          res.body.should.have.property('username').eql('This field is required');
          res.body.should.have.property('email').eql('This field is required');
          res.body.should.have.property('password').eql('This field is required');
          res.body.should.have.property('confirm_password').eql('This field is required');
          done();
        });
    });
  });
});
