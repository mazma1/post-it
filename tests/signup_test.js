const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app/server/app.js');
const bcrypt = require('bcrypt');
const User = require('../app/server/models').User;

const should = chai.should();
chai.use(chaiHttp);

const saltRounds = 7;
const salt = bcrypt.genSaltSync(saltRounds);

describe('Users sign up', () => {
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

  describe('/POST New User', () => {
    it('it should add a new user to the db', (done) => {
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

    it('it should return 400 for existing user', (done) => {
      const user = {
        email: 'maryx@gmail.com',
        username: 'maryx',
        password: '1234'
      };
      chai.request(app)
        .post('/api/user/signup')
          .send(user)
          .end((err, res) => {
            res.status.should.equal(400);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Username already exists');
            done();
          });
    });

    it('it should return 400 for missing email', (done) => {
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

    it('it should return 400 for missing username', (done) => {
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

    it('it should return 400 for missing password', (done) => {
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

