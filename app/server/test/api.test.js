import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import models from '../models';
import app from '../app';

const should = chai.should();
const saltRounds = 7;
const salt = bcrypt.genSaltSync(saltRounds);
const token = jwt.sign({ data: { id: 1 } }, process.env.TOKEN_SECRET, { expiresIn: 1440 });
chai.use(chaiHttp);

describe('API ENDPOINT TESTS', () => {
  before((done) => {
    models.User.destroy({
      cascade: true,
      truncate: true,
      restartIdentity: true
    })
    .then(() => {
      models.User.bulkCreate([
        {
          firstname: 'Mary',
          lastname: 'Mazi',
          username: 'mary',
          mobile: '08098044534',
          email: 'mary@gmail.com',
          password: bcrypt.hashSync('1234', salt),
          confirm_password: bcrypt.hashSync('1234', salt)
        },
        {
          firstname: 'Temi',
          lastname: 'Olota',
          username: 'temi',
          mobile: '08068668100',
          email: 'temi@gmail.com',
          password: bcrypt.hashSync('1234', salt),
          confirm_password: bcrypt.hashSync('1234', salt)
        }
      ])
      .then(() => {
        models.Group.bulkCreate([
          {
            group_name: 'Test Group 1',
            user_id: 1
          },
          {
            group_name: 'Test Group 2',
            user_id: 1
          }
        ]);
      })
      .then(() => {
        models.Group_member.bulkCreate([
          {
            group_id: 1,
            user_id: 1
          },
          {
            group_id: 2,
            user_id: 1
          }
        ]);
      });
      done();
    })
    .catch((error) => {
      done(error);
    });
  });

  // Sign up test
  describe('POST /api/user/signup Route', () => {
    it('returns successfully signed up user when parameters are complete', (done) => {
      const user = {
        firstname: 'Mary1',
        lastname: 'Mazi1',
        username: 'maryx',
        phone: '08068668100',
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
    it('returns status 400 for missing first name', (done) => {
      const user = {
        lastname: 'Mazi3',
        username: 'maryx',
        phone: '08068668100',
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
          res.body.should.have.property('firstname').eql('This field is required');
          done();
        });
    });

    it('returns status 400 if first name is an empty string', (done) => {
      const user = {
        firstname: '   ',
        lastname: 'Mazi3',
        username: 'maryx',
        email: ' ',
        phone: '08068668100',
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
          res.body.should.have.property('firstname').eql('First name cannot be empty');
          done();
        });
    });

    it('returns status 400 for missing last name', (done) => {
      const user = {
        firstname: 'Larry',
        username: 'maryx',
        phone: '08068668100',
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
          res.body.should.have.property('lastname').eql('This field is required');
          done();
        });
    });

    it('returns status 400 if last name is an empty string', (done) => {
      const user = {
        firstname: 'Larry',
        lastname: '   ',
        username: 'maryx',
        email: ' ',
        phone: '08068668100',
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
          res.body.should.have.property('lastname').eql('Last name cannot be empty');
          done();
        });
    });

    it('returns status 400 for incorrect email syntax', (done) => {
      const user = {
        firstname: 'Mary2',
        lastname: 'Mazi2',
        username: 'maryx1',
        phone: '08068668100',
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
        phone: '08068668100',
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

    it('returns status 400 if email is an empty string', (done) => {
      const user = {
        firstname: 'Mary3',
        lastname: 'Mazi3',
        username: 'maryx',
        email: ' ',
        phone: '08068668100',
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

    it('returns status 409 for existing email', (done) => {
      const user = {
        firstname: 'Mary3',
        lastname: 'Mazi3',
        username: 'maryx',
        phone: '08068668100',
        email: 'mary@gmail.com',
        password: '1234',
        confirm_password: '1234'
      };
      chai.request(app)
        .post('/api/user/signup')
        .type('form')
        .send(user)
        .end((err, res) => {
          res.status.should.equal(409);
          res.body.should.be.a('object');
          res.body.should.have.property('email').eql('Email already exists');
          done();
        });
    });

    it('returns status 400 for missing username', (done) => {
      const user = {
        firstname: 'Mary4',
        lastname: 'Mazi4',
        phone: '08068668100',
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

    it('returns status 400 if username is an empty string', (done) => {
      const user = {
        firstname: 'Mary3',
        lastname: 'Mazi3',
        username: '  ',
        email: 'mary.mazi@gmail.com',
        phone: '08068668100',
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
          res.body.should.have.property('username').eql('Username cannot be empty');
          done();
        });
    });

    it('returns status 409 for existing username', (done) => {
      const user = {
        firstname: 'Mary3',
        lastname: 'Mazi3',
        username: 'maryx',
        phone: '08068668100',
        email: 'maryoo@gmail.com',
        password: '1234',
        confirm_password: '1234'
      };
      chai.request(app)
        .post('/api/user/signup')
        .type('form')
        .send(user)
        .end((err, res) => {
          res.status.should.equal(409);
          res.body.should.be.a('object');
          res.body.should.have.property('username').eql('Username already exists');
          done();
        });
    });

    it('returns status 400 for missing password', (done) => {
      const user = {
        firstname: 'Mary5',
        lastname: 'Mazi5',
        phone: '08068668100',
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

    it('returns status 400 if password is an empty string', (done) => {
      const user = {
        firstname: 'Larry',
        lastname: 'Potter',
        username: 'maryx',
        email: 'larry@gmail.com',
        phone: '08068668100',
        password: '   ',
        confirm_password: '1234'
      };
      chai.request(app)
        .post('/api/user/signup')
        .type('form')
        .send(user)
        .end((err, res) => {
          res.status.should.equal(400);
          res.body.should.be.a('object');
          res.body.should.have.property('password').eql('Password cannot be empty');
          done();
        });
    });

    it('returns status 400 for missing confirm password', (done) => {
      const user = {
        firstname: 'Mary5',
        lastname: 'Mazi5',
        phone: '08068668100',
        email: 'maryx@gmail.com',
        username: 'maryx',
        password: '1234'
      };
      chai.request(app)
        .post('/api/user/signup')
        .type('form')
        .send(user)
        .end((err, res) => {
          res.status.should.equal(400);
          res.body.should.be.a('object');
          res.body.should.have.property('confirm_password').eql('This field is required');
          done();
        });
    });

    it('returns status 400 if confirm password is an empty string', (done) => {
      const user = {
        firstname: 'Larry',
        lastname: 'Potter',
        username: 'maryx',
        email: 'larry@gmail.com',
        phone: '08068668100',
        password: '1234',
        confirm_password: '   '
      };
      chai.request(app)
        .post('/api/user/signup')
        .type('form')
        .send(user)
        .end((err, res) => {
          res.status.should.equal(400);
          res.body.should.be.a('object');
          res.body.should.have.property('confirm_password').eql('Confirm password cannot be empty');
          done();
        });
    });

    it('returns status 400 if password and confirm password do not match', (done) => {
      const user = {
        firstname: 'Larry',
        lastname: 'Potter',
        username: 'maryx',
        email: 'larry@gmail.com',
        phone: '08068668100',
        password: '12345',
        confirm_password: '1234'
      };
      chai.request(app)
        .post('/api/user/signup')
        .type('form')
        .send(user)
        .end((err, res) => {
          res.status.should.equal(400);
          res.body.should.be.a('object');
          res.body.should.have.property('confirm_password').eql('Passwords must match');
          done();
        });
    });

    it('returns status 400 for missing phone number', (done) => {
      const user = {
        firstname: 'Mary5',
        lastname: 'Mazi5',
        email: 'maryx@gmail.com',
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
          res.body.should.have.property('phone').eql('This field is required');
          done();
        });
    });

    it('returns status 400 if length of phone number is not 11 digits', (done) => {
      const user = {
        firstname: 'Mary5',
        lastname: 'Mazi5',
        email: 'maryx@gmail.com',
        phone: '0809876',
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
          res.body.should.have.property('phone').eql('Phone number must be 11 digits');
          done();
        });
    });

    it('returns status 400 if phone number is an empty string', (done) => {
      const user = {
        firstname: 'Mary3',
        lastname: 'Mazi3',
        username: 'maryx',
        email: 'xyz@yahoo.com',
        phone: '',
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
          res.body.should.have.property('phone').eql('This field is required');
          done();
        });
    });

    it('returns status 400 when all required fields are missing', (done) => {
      const user = {
        firstname: '',
        lastname: '',
        phone: '',
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

  // Sign in test
  describe('POST /api/user/signin Route', () => {
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
            res.status.should.equal(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('User successfully logged in');
            res.body.should.have.property('token');
            done();
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

    it('returns status 400 for no identifier (email or username) or password', (done) => {
      const user = {
        identifier: '',
        password: ''
      };
      chai.request(app)
        .post('/api/user/signin')
          .send(user)
          .end((err, res) => {
            res.status.should.equal(400);
            res.body.should.be.a('object');
            res.body.should.have.property('identifier').eql('This field is required');
            res.body.should.have.property('password').eql('This field is required');
            done();
          });
    });
  });

  // Password reset link test
  describe('POST /api/user/reset_password Route', () => {
    it('returns status 400 for missing email', (done) => {
      chai.request(app)
        .post('/api/user/reset_password')
        .type('form')
        .send()
        .end((err, res) => {
          res.status.should.equal(400);
          res.body.should.be.a('object');
          done();
        });
    });

    it('returns status 401 for invalid email', (done) => {
      chai.request(app)
        .post('/api/user/reset_password')
        .type('form')
        .send({email: 'xyz'})
        .end((err, res) => {
          res.status.should.equal(401);
          res.body.should.be.a('object');
          done();
        });
    });
    
  });

  // Update password test
  describe('POST /api/user/updatepassword/:token Route', () => {
    it('returns status 400 if password and confirm password fields are missing', (done) => {
      chai.request(app)
        .post('/api/user/updatepassword/:token')
        .type('form')
        .send()
        .end((err, res) => {
          res.status.should.equal(400);
          res.body.should.be.a('object');
          res.body.should.have.property('password').eql('New password is required');
          res.body.should.have.property('confirm_password').eql('Confirm new password is required');
          done();
        });
    });

    it('returns status 400 if password field is missing', (done) => {
      chai.request(app)
        .post('/api/user/updatepassword/:token')
        .type('form')
        .send({ confirm_password: '1234' })
        .end((err, res) => {
          res.status.should.equal(400);
          res.body.should.be.a('object');
          res.body.should.have.property('password').eql('New password is required');
          done();
        });
    });

    it('returns status 400 if confirm password field is missing', (done) => {
      chai.request(app)
        .post('/api/user/updatepassword/:token')
        .type('form')
        .send({ password: '1234' })
        .end((err, res) => {
          res.status.should.equal(400);
          res.body.should.be.a('object');
          res.body.should.have.property('confirm_password').eql('Confirm new password is required');
          done();
        });
    });

    it('returns status 400 if passwords don\'t match', (done) => {
      chai.request(app)
        .post('/api/user/updatepassword/:token')
        .type('form')
        .send({ password: '1234', confirm_password: '12' })
        .end((err, res) => {
          res.status.should.equal(400);
          res.body.should.be.a('object');
          res.body.should.have.property('confirm_password').eql('Passwords must match');
          done();
        });
    });
  });

  // Create group test
  describe('POST /api/group Route', () => {
    it('returns status 403 when user is not logged in (no token is provided)', (done) => {
      const group = {
        group_name: 'Test Group 4'
      };
      chai.request(app).post('/api/group')
        .send(group)
        .end((err, res) => {
          res.status.should.equal(403);
          res.body.should.be.a('object');
          res.body.should.have.property('error').eql('No token provided.');
          done();
        });
    });

    it('successfully creates group if token and group name are provided', (done) => {
      const group = {
        group_name: 'Test Group 3'
      };
      chai.request(app).post('/api/group')
        .set('x-access-token', token)
        .send(group)
        .end((err, res) => {
          res.status.should.equal(201);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Group was successfully created and you have been added to it');
          res.body.should.have.property('groupName').eql('Test Group 3');
          res.body.should.have.property('groupOwner').eql(1);
          done();
        });
    });

    it('returns status 409 if group name already exists', (done) => {
      const group = {
        group_name: 'Test Group 2'
      };
      chai.request(app).post('/api/group')
        .set('x-access-token', token)
        .send(group)
        .end((err, res) => {
          res.status.should.equal(409);
          res.body.should.be.a('object');
          res.body.should.have.property('error').eql('Group already exists');
          done();
        });
    });

    it('returns status 400 if group name is not provided', (done) => {
      const group = {
        group_name: ''
      };
      chai.request(app).post('/api/group')
        .set('x-access-token', token)
        .send(group)
        .end((err, res) => {
          res.status.should.equal(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error').eql('Group name is required');
          done();
        });
    });
  });

  // Add User to group
  describe('POST /api/group/:group_id/user Route', () => {
    it('returns status 403 when user is not logged in (no token is provided)', (done) => {
      const identifier = 'temi';
      chai.request(app).post('/api/group/2/user')
        .send(identifier)
        .end((err, res) => {
          res.status.should.equal(403);
          res.body.should.be.a('object');
          res.body.should.have.property('error').eql('No token provided.');
          done();
        });
    });

    it('returns status 400 when email or username is not provided', (done) => {
      const identifier = '';
      chai.request(app).post('/api/group/2/user')
        .set('x-access-token', token)
        .send(identifier)
        .end((err, res) => {
          res.status.should.equal(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error').eql('Username or email is required');
          done();
        });
    });

    it('returns status 404 when specified user does not exist', (done) => {
      const identifier = {
        identifier: 'teni'
      };
      chai.request(app).post('/api/group/2/user')
        .set('x-access-token', token)
        .send(identifier)
        .end((err, res) => {
          res.status.should.equal(404);
          res.body.should.be.a('object');
          res.body.should.have.property('error').eql('User does not exist');
          done();
        });
    });

    it('successfully adds specified user to group', (done) => {
      const identifier = {
        identifier: 'temi'
      };
      chai.request(app).post('/api/group/2/user')
        .set('x-access-token', token)
        .send(identifier)
        .end((err, res) => {
          res.status.should.equal(201);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('User successfully added to group');
          done();
        });
    });

    it('returns status 409 when user already exists in group', (done) => {
      const identifier = {
        identifier: 'temi'
      };
      chai.request(app).post('/api/group/2/user')
        .set('x-access-token', token)
        .send(identifier)
        .end((err, res) => {
          res.status.should.equal(409);
          res.body.should.be.a('object');
          res.body.should.have.property('error').eql('User has already been added to group');
          done();
        });
    });
  });

  // Post Message to group
  describe('POST /api/group/:group_id/message Route', () => {
    it('returns status 403 when user is not logged in (no token is provided)', (done) => {
      const message = '';
      chai.request(app).post('/api/group/2/message')
        .send(message)
        .end((err, res) => {
          res.status.should.equal(403);
          res.body.should.be.a('object');
          res.body.should.have.property('error').eql('No token provided.');
          done();
        });
    });

    it('returns status 400 when message is not provided', (done) => {
      chai.request(app).post('/api/group/2/message')
        .set('x-access-token', token)
        .send({ })
        .end((err, res) => {
          res.body.should.be.a('object');
          res.body.should.have.property('error').eql('Message is required.');
          done();
        });
    });

    it('successfully send specified message to group', (done) => {
      const message = {
        message: 'Test Message',
        read_by: 'mazma',
        priority: 'normal'
      };
      chai.request(app).post('/api/group/2/message')
        .set('x-access-token', token)
        .send(message)
        .end((err, res) => {
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Message was successfully sent');
          done();
        });
    });
  });

  // Get group messages
  describe('GET /api/group/:group_id/messages Route', () => {
    it('returns status 403 when user is not logged in (no token is provided)', (done) => {
      chai.request(app).get('/api/group/2/messages')
        .end((err, res) => {
          res.status.should.equal(403);
          res.body.should.be.a('object');
          res.body.should.have.property('error').eql('No token provided.');
          done();
        });
    });

    it('successfully fetches messages of specified group', (done) => {
      chai.request(app).get('/api/group/2/messages')
        .set('x-access-token', token)
        .end((err, res) => {
          res.status.should.equal(200);
          res.body.should.be.a('array');
          done();
        });
    });
  }); 

  // Get group Members
  describe('GET /api/group/:group_id/members', () => {
    it('returns status 200 when message read staus is updated', (done) => {
      const username = 'temi',
        readBy = 'mazma';
      const details = {
        messageId: 1,
        updatedReadBy: `${readBy},${username}`
      };
      chai.request(app).get('/api/group/message/read')
        .send(details)
        .end((err, res) => {
          res.status.should.equal(200);
          res.body.should.be.a('object');
          done();
        });
    });

    it('successfully fetches messages of specified group', (done) => {
      chai.request(app).get('/api/group/2/messages')
        .set('x-access-token', token)
        .end((err, res) => {
          res.status.should.equal(200);
          res.body.should.be.a('array');
          done();
        });
    });
  });
});
