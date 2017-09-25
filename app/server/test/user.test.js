import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import app from '../app';

const should = chai.should();
chai.use(chaiHttp);
let token;
let passwordHash;

describe('User Endpoint', () => {
  before((done) => {
    token = jwt.sign({ data: { id: 1 } }, process.env.TOKEN_SECRET, { expiresIn: '24hr' });
    passwordHash = crypto.randomBytes(20).toString('hex');
    done();
  });

  after((done) => {
    token = null;
    passwordHash = null;
    done();
  });

  // Sign up test
  describe('POST /api/v1/users/signup', () => {
    it('should return a JSON web token after successful signup', (done) => {
      const user = {
        firstName: 'Mary',
        lastName: 'Mazi',
        username: 'maryx',
        phoneNumber: '08068668100',
        email: 'mary@gmail.com',
        password: '123456',
        confirmPassword: '123456'
      };
      chai.request(app)
        .post('/api/v1/users/signup')
        .type('form')
        .send(user)
        .end((err, res) => {
          res.status.should.equal(201);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Signup was successful');
          res.body.should.have.property('token');
          done();
        });
    });

    it('should return status 400 for missing first name', (done) => {
      const user = {
        lastName: 'Mazi3',
        username: 'maryx',
        phoneNumber: '08068668100',
        password: '123456',
        confirmPassword: '123456'
      };
      chai.request(app)
        .post('/api/v1/users/signup')
        .type('form')
        .send(user)
        .end((err, res) => {
          res.status.should.equal(400);
          res.body.should.be.a('object');
          res.body.should.have.property('firstName').eql('This field is required');
          done();
        });
    });

    it('should return status 400 if first name is an empty string', (done) => {
      const user = {
        firstName: '   ',
        lastName: 'Mazi3',
        username: 'maryx',
        email: ' ',
        phoneNumber: '08068668100',
        password: '123456',
        confirmPassword: '123456'
      };
      chai.request(app)
        .post('/api/v1/users/signup')
        .type('form')
        .send(user)
        .end((err, res) => {
          res.status.should.equal(400);
          res.body.should.be.a('object');
          res.body.should.have.property('firstName').eql('First name cannot be empty');
          done();
        });
    });

    it('should return status 400 for missing last name', (done) => {
      const user = {
        firstName: 'Larry',
        username: 'maryx',
        phoneNumber: '08068668100',
        password: '123456',
        confirmPassword: '123456'
      };
      chai.request(app)
        .post('/api/v1/users/signup')
        .type('form')
        .send(user)
        .end((err, res) => {
          res.status.should.equal(400);
          res.body.should.be.a('object');
          res.body.should.have.property('lastName').eql('This field is required');
          done();
        });
    });

    it('should return status 400 if last name is an empty string', (done) => {
      const user = {
        firstName: 'Larry',
        lastName: '   ',
        username: 'maryx',
        email: ' ',
        phoneNumber: '08068668100',
        password: '123456',
        confirmPassword: '123456'
      };
      chai.request(app)
        .post('/api/v1/users/signup')
        .type('form')
        .send(user)
        .end((err, res) => {
          res.status.should.equal(400);
          res.body.should.be.a('object');
          res.body.should.have.property('lastName').eql('Last name cannot be empty');
          done();
        });
    });

    it('should return status 400 for incorrect email syntax', (done) => {
      const user = {
        firstName: 'Mary2',
        lastName: 'Mazi2',
        username: 'maryx1',
        phoneNumber: '08068668100',
        email: 'maryxgmail.com',
        password: '123456',
        confirmPassword: '123456'
      };
      chai.request(app)
        .post('/api/v1/users/signup')
        .type('form')
        .send(user)
        .end((err, res) => {
          res.status.should.equal(400);
          res.body.should.be.a('object');
          res.body.should.have.property('email').eql('Invalid email');
          done();
        });
    });

    it('should return status 400 for missing email', (done) => {
      const user = {
        firstName: 'Mary3',
        lastName: 'Mazi3',
        username: 'maryx',
        phone: '08068668100',
        password: '123456',
        confirmPassword: '123456'
      };
      chai.request(app)
        .post('/api/v1/users/signup')
        .type('form')
        .send(user)
        .end((err, res) => {
          res.status.should.equal(400);
          res.body.should.be.a('object');
          res.body.should.have.property('email').eql('This field is required');
          done();
        });
    });

    it('should return status 400 if email is an empty string', (done) => {
      const user = {
        firstName: 'Mary3',
        lastName: 'Mazi3',
        username: 'maryx',
        email: ' ',
        phoneNumber: '08068668100',
        password: '123456',
        confirmPassword: '123456'
      };
      chai.request(app)
        .post('/api/v1/users/signup')
        .type('form')
        .send(user)
        .end((err, res) => {
          res.status.should.equal(400);
          res.body.should.be.a('object');
          res.body.should.have.property('email').eql('Invalid email');
          done();
        });
    });

    it('should return status 409 for existing email', (done) => {
      const user = {
        firstName: 'Maryyy',
        lastName: 'Maziii',
        username: 'maryx',
        phoneNumber: '08068668100',
        email: 'mary@gmail.com',
        password: '123456',
        confirmPassword: '123456'
      };
      chai.request(app)
        .post('/api/v1/users/signup')
        .type('form')
        .send(user)
        .end((err, res) => {
          res.status.should.equal(409);
          res.body.should.be.a('object');
          res.body.should.have.property('email').eql('Email already exists');
          done();
        });
    });

    it('should return status 400 for missing username', (done) => {
      const user = {
        firstName: 'Mary4',
        lastName: 'Mazi4',
        phoneNumber: '08068668100',
        email: 'maryx@gmail.com',
        password: '123456',
        confirmPassword: '123456'
      };
      chai.request(app)
        .post('/api/v1/users/signup')
        .type('form')
        .send(user)
        .end((err, res) => {
          res.status.should.equal(400);
          res.body.should.be.a('object');
          res.body.should.have.property('username').eql('This field is required');
          done();
        });
    });

    it('should return status 400 if username is an empty string', (done) => {
      const user = {
        firstName: 'Mary3',
        lastName: 'Mazi3',
        username: '  ',
        email: 'mary.mazi@gmail.com',
        phoneNumber: '08068668100',
        password: '123456',
        confirmPassword: '123456'
      };
      chai.request(app)
        .post('/api/v1/users/signup')
        .type('form')
        .send(user)
        .end((err, res) => {
          res.status.should.equal(400);
          res.body.should.be.a('object');
          res.body.should.have.property('username').eql('Username cannot be empty');
          done();
        });
    });

    it('should return status 409 for existing username', (done) => {
      const user = {
        firstName: 'Maryyy',
        lastName: 'Maziii',
        username: 'maryx',
        phoneNumber: '08068668100',
        email: 'maryoo@gmail.com',
        password: '123456',
        confirmPassword: '123456'
      };
      chai.request(app)
        .post('/api/v1/users/signup')
        .type('form')
        .send(user)
        .end((err, res) => {
          res.status.should.equal(409);
          res.body.should.be.a('object');
          res.body.should.have.property('username').eql('Username already exists');
          done();
        });
    });

    it('should return status 400 for missing password', (done) => {
      const user = {
        firstName: 'Mary5',
        lastName: 'Mazi5',
        phoneNumber: '08068668100',
        email: 'maryx@gmail.com',
        username: 'maryx',
      };
      chai.request(app)
        .post('/api/v1/users/signup')
        .type('form')
        .send(user)
        .end((err, res) => {
          res.status.should.equal(400);
          res.body.should.be.a('object');
          res.body.should.have.property('password').eql('This field is required');
          done();
        });
    });

    it('should return status 400 if password is an empty string', (done) => {
      const user = {
        firstName: 'Larry',
        lastName: 'Potter',
        username: 'maryx',
        email: 'larry@gmail.com',
        phoneNumber: '08068668100',
        password: '   ',
        confirmPassword: '1234'
      };
      chai.request(app)
        .post('/api/v1/users/signup')
        .type('form')
        .send(user)
        .end((err, res) => {
          res.status.should.equal(400);
          res.body.should.be.a('object');
          res.body.should.have.property('password').eql('Password cannot be empty');
          done();
        });
    });

    it('should return status 400 for missing confirm password', (done) => {
      const user = {
        firstName: 'Mary5',
        lastName: 'Mazi5',
        phoneNumber: '08068668100',
        email: 'maryx@gmail.com',
        username: 'maryx',
        password: '123456'
      };
      chai.request(app)
        .post('/api/v1/users/signup')
        .type('form')
        .send(user)
        .end((err, res) => {
          res.status.should.equal(400);
          res.body.should.be.a('object');
          res.body.should.have.property('confirmPassword').eql('This field is required');
          done();
        });
    });

    it('should return status 400 if confirm password is an empty string', (done) => {
      const user = {
        firstName: 'Larry',
        lastName: 'Potter',
        username: 'maryx',
        email: 'larry@gmail.com',
        phoneNumber: '08068668100',
        password: '123456',
        confirmPassword: '   '
      };
      chai.request(app)
        .post('/api/v1/users/signup')
        .type('form')
        .send(user)
        .end((err, res) => {
          res.status.should.equal(400);
          res.body.should.be.a('object');
          res.body.should.have.property('confirmPassword').eql('Confirm password cannot be empty');
          done();
        });
    });

    it('should return status 400 if password and confirm password do not match', (done) => {
      const user = {
        firstName: 'Larry',
        lastName: 'Potter',
        username: 'maryx',
        email: 'larry@gmail.com',
        phoneNumber: '08068668100',
        password: '123456',
        confirmPassword: '1234'
      };
      chai.request(app)
        .post('/api/v1/users/signup')
        .type('form')
        .send(user)
        .end((err, res) => {
          res.status.should.equal(400);
          res.body.should.be.a('object');
          res.body.should.have.property('confirmPassword').eql('Passwords must match');
          done();
        });
    });

    it('should return status 400 for missing phone number', (done) => {
      const user = {
        firstName: 'Mary5',
        lastName: 'Mazi5',
        email: 'maryx@gmail.com',
        username: 'maryx',
        password: '123456',
        confirmPassword: '123456'
      };
      chai.request(app)
        .post('/api/v1/users/signup')
        .type('form')
        .send(user)
        .end((err, res) => {
          res.status.should.equal(400);
          res.body.should.be.a('object');
          res.body.should.have.property('phoneNumber').eql('This field is required');
          done();
        });
    });

    it('should return status 400 if length of phone number is not 11 digits', (done) => {
      const user = {
        firstName: 'Mary5',
        lastame: 'Mazi5',
        email: 'maryx@gmail.com',
        phoneNumber: '0809876',
        username: 'maryx',
        password: '123456',
        confirmPassword: '123456'
      };
      chai.request(app)
        .post('/api/v1/users/signup')
        .type('form')
        .send(user)
        .end((err, res) => {
          res.status.should.equal(400);
          res.body.should.be.a('object');
          res.body.should.have.property('phoneNumber').eql('Phone number must be 11 digits');
          done();
        });
    });

    it('should return status 400 if phone number is an empty string', (done) => {
      const user = {
        firstName: 'Mary3',
        lastName: 'Mazi3',
        username: 'maryx',
        email: 'xyz@yahoo.com',
        phoneNumber: '',
        password: '123456',
        confirmPassword: '123456'
      };
      chai.request(app)
        .post('/api/v1/users/signup')
        .type('form')
        .send(user)
        .end((err, res) => {
          res.status.should.equal(400);
          res.body.should.be.a('object');
          res.body.should.have.property('phoneNumber').eql('This field is required');
          done();
        });
    });

    it('should return status 400 when all required fields are missing', (done) => {
      const user = {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      };
      chai.request(app)
        .post('/api/v1/users/signup')
        .type('form')
        .send(user)
        .end((err, res) => {
          res.status.should.equal(400);
          res.body.should.be.a('object');
          res.body.should.have.property('firstName').eql('This field is required');
          res.body.should.have.property('lastName').eql('This field is required');
          res.body.should.have.property('username').eql('This field is required');
          res.body.should.have.property('email').eql('This field is required');
          res.body.should.have.property('phoneNumber').eql('This field is required');
          res.body.should.have.property('password').eql('This field is required');
          res.body.should.have.property('confirmPassword').eql('This field is required');
          done();
        });
    });
  });

  // Sign in test
  describe('POST /api/v1/users/signin', () => {
    it('should return a token on successful sign in', (done) => {
      const user = {
        identifier: 'maryx',
        password: '123456'
      };
      chai.request(app)
        .post('/api/v1/users/signin')
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
    it('should return status 401 for invalid identifier (email or username)', (done) => {
      const user = {
        identifier: 'mary1',
        password: '123456'
      };
      chai.request(app)
        .post('/api/v1/users/signin')
        .type('form')
        .send(user)
        .end((err, res) => {
          res.status.should.equal(401);
          res.body.should.be.a('object');
          res.body.should.have.property('identifier').eql('Invalid username or password');
          done();
        });
    });

    it('should return status 401 for invalid password', (done) => {
      const user = {
        identifier: 'mazma',
        password: '12345678'
      };
      chai.request(app)
        .post('/api/v1/users/signin')
        .type('form')
        .send(user)
        .end((err, res) => {
          res.status.should.equal(401);
          res.body.should.be.a('object');
          res.body.should.have.property('identifier').eql('Invalid username or password');
          done();
        });
    });

    it('should return status 400 for no identifier (email or username) or password', (done) => {
      const user = {
        identifier: '',
        password: ''
      };
      chai.request(app)
        .post('/api/v1/users/signin')
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

  // Password reset hash token
  describe('POST /api/v1/users/resetpassword', () => {
    it('should return status 400 for missing email', (done) => {
      chai.request(app)
        .post('/api/v1/users/resetpassword')
        .type('form')
        .send()
        .end((err, res) => {
          res.status.should.equal(400);
          res.body.should.be.a('object');
          res.body.should.have.property('email').eql('Email field is required');
          done();
        });
    });

    it('should return status 401 for invalid email', (done) => {
      chai.request(app)
        .post('/api/v1/users/resetpassword')
        .type('form')
        .send({ email: 'xyz' })
        .end((err, res) => {
          res.status.should.equal(401);
          res.body.should.be.a('object');
          res.body.should.have.property('email').eql('Invalid email address');
          done();
        });
    });

    it('should generate a hash token that will be sent to user', (done) => {
      chai.request(app)
        .post('/api/v1/users/resetpassword')
        .type('form')
        .send({ email: 'mazi.mary.o@gmail.com' })
        .end((err, res) => {
          res.status.should.equal(200);
          res.body.should.be.a('object');
          res.body.should.have.property('resetPasswordHash');
          done();
        });
    });
  });

  // Update password
  describe('POST /api/v1/users/updatepassword/:token', () => {
    it('should return status 400 if password and confirm password fields are missing', (done) => {
      chai.request(app)
        .patch('/api/v1/users/updatepassword/:token')
        .type('form')
        .send()
        .end((err, res) => {
          res.status.should.equal(400);
          res.body.should.be.a('object');
          res.body.should.have.property('password').eql('New password is required');
          res.body.should.have.property('confirmPassword').eql('Confirm new password is required');
          done();
        });
    });

    it('returns status 400 if password field is missing', (done) => {
      chai.request(app)
        .patch('/api/v1/users/updatepassword/:token')
        .type('form')
        .send({ confirmPassword: '123456' })
        .end((err, res) => {
          res.status.should.equal(400);
          res.body.should.be.a('object');
          res.body.should.have.property('password').eql('New password is required');
          done();
        });
    });

    it('should return status 400 if confirm password field is missing', (done) => {
      chai.request(app)
        .patch('/api/v1/users/updatepassword/:token')
        .type('form')
        .send({ password: '123456' })
        .end((err, res) => {
          res.status.should.equal(400);
          res.body.should.be.a('object');
          res.body.should.have.property('confirmPassword').eql('Confirm new password is required');
          done();
        });
    });

    it('should return status 400 if passwords don\'t match', (done) => {
      chai.request(app)
        .patch('/api/v1/users/updatepassword/:token')
        .type('form')
        .send({ password: '123456', confirmPassword: '12' })
        .end((err, res) => {
          res.status.should.equal(400);
          res.body.should.be.a('object');
          res.body.should.have.property('confirmPassword').eql('Passwords must match');
          done();
        });
    });

    it('should return status 404 with message that token does not exist', (done) => {
      chai.request(app)
        .patch(`/api/v1/users/updatepassword/${passwordHash}`)
        .type('form')
        .send({ password: '12345678', confirmPassword: '12345678' })
        .end((err, res) => {
          res.status.should.equal(404);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Token does not exist');
          done();
        });
    });
  });

  // Search
  describe('POST /api/v1/users/search', () => {
    it('should return status 401 if user is not logged in', (done) => {
      chai.request(app)
        .get('/api/v1/users/search?q=mazma')
        .end((err, res) => {
          res.status.should.equal(401);
          res.body.should.be.a('object');
          res.body.should.have.property('error').eql('No token provided.');
          done();
        });
    });

    it('should return status 400 search query is not provided', (done) => {
      chai.request(app)
        .get('/api/v1/users/search')
        .set('x-access-token', token)
        .end((err, res) => {
          res.status.should.equal(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error').eql('A search keyword is required');
          done();
        });
    });

    it('should return the users that match a search query', (done) => {
      chai.request(app)
        .get('/api/v1/users/search?q=mazma')
        .set('x-access-token', token)
        .end((err, res) => {
          res.status.should.equal(200);
          res.body.should.be.a('object');
          res.body.should.have.property('users').with.lengthOf(1);
          res.body.users.should.be.a('array');
          res.body.users[0].should.have.property('firstName').eql('Mary');
          res.body.users[0].should.have.property('lastName').eql('Mazi');
          res.body.should.have.property('pagination');
          res.body.pagination.should.be.a('object');
          res.body.pagination.should.have.property('totalRows').eql(1);
          res.body.pagination.should.have.property('numberOfPages').eql(1);
          res.body.pagination.should.have.property('currentPage').eql(1);
          res.body.pagination.should.have.property('pageSize').eql(1);
          done();
        });
    });

    it('should return status 404 if no user was found', (done) => {
      chai.request(app)
        .get('/api/v1/users/search?q=hippopo')
        .set('x-access-token', token)
        .end((err, res) => {
          res.status.should.equal(404);
          res.body.should.be.a('object');
          res.body.should.have.property('error').eql('User was not found');
          done();
        });
    });
  });
});
