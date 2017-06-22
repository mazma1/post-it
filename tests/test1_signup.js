process.env.NODE_ENV = 'test';
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app/server/app.js');
const bcrypt = require('bcrypt');
const User = require('../app/server/models').User;

const should = chai.should();
chai.use(chaiHttp);

const saltRounds = 7;
const salt = bcrypt.genSaltSync(saltRounds);

describe('POST /api/user/signup', () => {
  // This function will run before every test to clear database
  before((done) => {
    User.sync({ force: true }) // drops table and re-creates it
      .then(() => {
        User.create({
          email: 'mary@gmail.com',
          username: 'mary',
          password: bcrypt.hashSync('1234', salt)
        });
        done(null);
      })
      .catch((error) => {
        done(error);
      });
  });

  describe('status 201', () => {
    it('returns successfully signed up user', (done) => {
      const user = {
        email: 'maryx@gmail.com',
        username: 'maryx',
        password: '1234'
      };
      chai.request(app)
        .post('/api/user/signup')
          .send(user)
          .end((err, res) => {
            res.status.should.equal(201);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Signup was successful');
            done();
          });
    });
  });

  describe('status 400', () => {
    it('throws error for incorrect email syntax', (done) => {
      const user = {
        email: 'maryxgmail.com',
        username: 'maryx1',
        password: '1234'
      };
      chai.request(app)
        .post('/api/user/signup')
          .send(user)
          .end((err, res) => {
            res.status.should.equal(400);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Incorrect email syntax');
            done();
          });
    });

    it('throws error for missing email', (done) => {
      const user = {
        username: 'maryx',
        password: '1234'
      };
      chai.request(app)
        .post('/api/user/signup')
          .send(user)
          .end((err, res) => {
            res.status.should.equal(400);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Email is required');
            done();
          });
    });

    it('throws error for missing username', (done) => {
      const user = {
        email: 'maryx@gmail.com',
        password: '1234'
      };
      chai.request(app)
        .post('/api/user/signup')
          .send(user)
          .end((err, res) => {
            res.status.should.equal(400);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Username is required');
            done();
          });
    });

    it('throws error for missing password', (done) => {
      const user = {
        email: 'maryx@gmail.com',
        username: 'maryx',
      };
      chai.request(app)
        .post('/api/user/signup')
          .send(user)
          .end((err, res) => {
            res.status.should.equal(400);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Password is required');
            done();
          });
    });
  });
});

