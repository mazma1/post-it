const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app/server/app.js');
const bcrypt = require('bcryptjs');
const User = require('../app/server/models').User;

const should = chai.should();
chai.use(chaiHttp);

const saltRounds = 7;
const salt = bcrypt.genSaltSync(saltRounds);

describe('POST /api/user/signup route', () => {
  // This function will run before every test to clear database
  before((done) => {
    // User.sync({ force: true }) // drops table and re-creates it
    User.destroy({ where: {} })
      .then(() => {
        User.create({
          firstname: 'Mary',
          lastname: 'Mazi',
          username: 'mary',
          email: 'mary@gmail.com',
          password: bcrypt.hashSync('1234', salt),
          confirm_password: bcrypt.hashSync('1234', salt)
        });
        // done(null);
      })
      .catch((error) => {
        done(error);
      });
    done(null);
  });

  describe('status 201', () => {
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
  });

  describe('status 400', () => {
    it('throws error for incorrect email syntax', (done) => {
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
          .send(user)
          .end((err, res) => {
            res.status.should.equal(400);
            res.body.should.be.a('object');
            res.body.should.have.property('email').eql('Invalid email');
            done();
          });
    });

    it('throws error for missing email', (done) => {
      const user = {
        firstname: 'Mary3',
        lastname: 'Mazi3',
        username: 'maryx',
        password: '1234',
        confirm_password: '1234'
      };
      chai.request(app)
        .post('/api/user/signup')
          .send(user)
          .end((err, res) => {
            res.status.should.equal(400);
            res.body.should.be.a('object');
            res.body.should.have.property('email').eql('This field is required');
            done();
          });
    });

    it('throws error for missing username', (done) => {
      const user = {
        firstname: 'Mary4',
        lastname: 'Mazi4',
        email: 'maryx@gmail.com',
        password: '1234',
        confirm_password: '1234'
      };
      chai.request(app)
        .post('/api/user/signup')
          .send(user)
          .end((err, res) => {
            res.status.should.equal(400);
            res.body.should.be.a('object');
            res.body.should.have.property('username').eql('This field is required');
            done();
          });
    });

    it('throws error for missing password', (done) => {
      const user = {
        firstname: 'Mary5',
        lastname: 'Mazi5',
        email: 'maryx@gmail.com',
        username: 'maryx',
      };
      chai.request(app)
        .post('/api/user/signup')
          .send(user)
          .end((err, res) => {
            res.status.should.equal(400);
            res.body.should.be.a('object');
            res.body.should.have.property('password').eql('This field is required');
            done();
          });
    });

    it('throws error when all required fields are missing', (done) => {
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

