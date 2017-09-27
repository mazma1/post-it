import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import app from '../app';

const should = chai.should();
chai.use(chaiHttp);
let token;

describe('Group Endpoint', () => {
  before((done) => {
    token = jwt.sign({ data: { id: 1 } }, process.env.TOKEN_SECRET, { expiresIn: '24hr' });
    done();
  });

  after((done) => {
    token = null;
    done();
  });

  // Create group
  describe('POST /api/v1/groups', () => {
    it('should return status 401 when user is not logged in (no token is provided)', (done) => {
      const group = {
        groupName: 'Test Group 4'
      };
      chai.request(app).post('/api/v1/groups')
        .send(group)
        .end((err, res) => {
          res.status.should.equal(401);
          res.body.should.be.a('object');
          res.body.should.have.property('error').eql('No token provided.');
          done();
        });
    });

    it('should successfully create group if token and group name are provided', (done) => {
      const group = {
        groupName: 'Test Group 3'
      };
      chai.request(app).post('/api/v1/groups')
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

    it('should return status 409 if group name already exists', (done) => {
      const group = {
        groupName: 'Test Group 3'
      };
      chai.request(app).post('/api/v1/groups')
        .set('x-access-token', token)
        .send(group)
        .end((err, res) => {
          res.status.should.equal(409);
          res.body.should.be.a('object');
          res.body.should.have.property('error').eql('Group already exists');
          done();
        });
    });

    it('should return status 400 if group name is not provided', (done) => {
      const group = {
        groupName: ''
      };
      chai.request(app).post('/api/v1/groups')
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
  describe('POST /api/v1/groups/:group_id/user', () => {
    it('should return status 401 when user is not logged in (no token is provided)', (done) => {
      const identifier = 'temi';
      chai.request(app).post('/api/v1/groups/2/user')
        .send(identifier)
        .end((err, res) => {
          res.status.should.equal(401);
          res.body.should.be.a('object');
          res.body.should.have.property('error').eql('No token provided.');
          done();
        });
    });

    it('should return status 400 when email or username is not provided', (done) => {
      const identifier = '';
      chai.request(app).post('/api/v1/groups/2/user')
        .set('x-access-token', token)
        .send(identifier)
        .end((err, res) => {
          res.status.should.equal(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error').eql('Username or email is required');
          done();
        });
    });

    it('should return status 404 when specified user does not exist', (done) => {
      const identifier = {
        identifier: 'teni'
      };
      chai.request(app).post('/api/v1/groups/2/user')
        .set('x-access-token', token)
        .send(identifier)
        .end((err, res) => {
          res.status.should.equal(404);
          res.body.should.be.a('object');
          res.body.should.have.property('error').eql('User does not exist');
          done();
        });
    });

    it('should successfully add specified user to group', (done) => {
      const identifier = {
        identifier: 'mazma'
      };
      chai.request(app).post('/api/v1/groups/4/user')
        .set('x-access-token', token)
        .send(identifier)
        .end((err, res) => {
          res.status.should.equal(201);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('User successfully added to group');
          done();
        });
    });

    it('should return status 409 when user already exists in group', (done) => {
      const identifier = {
        identifier: 'mazma'
      };
      chai.request(app).post('/api/v1/groups/1/user')
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
  describe('POST /api/v1/groups/:group_id/message', () => {
    it('should return status 401 when user is not logged in (no token is provided)', (done) => {
      const message = '';
      chai.request(app).post('/api/v1/groups/2/message')
        .send(message)
        .end((err, res) => {
          res.status.should.equal(401);
          res.body.should.be.a('object');
          res.body.should.have.property('error').eql('No token provided.');
          done();
        });
    });

    it('should return status 400 when message is not provided', (done) => {
      chai.request(app).post('/api/v1/groups/2/message')
        .set('x-access-token', token)
        .send({})
        .end((err, res) => {
          res.body.should.be.a('object');
          res.body.should.have.property('error').eql('Message is required');
          done();
        });
    });

    it('should successfully send specified message to group', (done) => {
      const message = {
        message: 'Test Message',
        priority: 'normal'
      };
      chai.request(app).post('/api/v1/groups/2/message')
        .set('x-access-token', token)
        .send(message)
        .end((err, res) => {
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Message was successfully sent');
          res.body.should.have.property('messageBody').eql('Test Message');
          done();
        });
    });
  });

  // Get group messages
  describe('GET /api/v1/groups/:group_id/messages', () => {
    it('should return status 401 when user is not logged in (no token is provided)', (done) => {
      chai.request(app).get('/api/v1/groups/2/messages')
        .end((err, res) => {
          res.status.should.equal(401);
          res.body.should.be.a('object');
          res.body.should.have.property('error').eql('No token provided.');
          done();
        });
    });

    it('should successfully fetch messages of specified group', (done) => {
      chai.request(app).get('/api/v1/groups/2/messages')
        .set('x-access-token', token)
        .end((err, res) => {
          res.status.should.equal(200);
          res.body.should.be.a('object');
          res.body.should.have.property('messages').with.lengthOf(4);
          res.body.messages.should.be.a('array');
          res.body.messages[0].should.have.property('message').eql('Test Message');
          res.body.messages[0].should.have.property('priority').eql('normal');
          res.body.messages[0].should.have.property('sentBy').should.be.a('object');
          res.body.messages[0].sentBy.should.have.property('username').eql('mazma');
          done();
        });
    });

    it('should return status 400 if group id is not a number', (done) => {
      chai.request(app).get('/api/v1/groups/u/messages')
        .set('x-access-token', token)
        .end((err, res) => {
          res.status.should.equal(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Invalid group id');
          done();
        });
    });

    it('should return an empty array of messages when a group does not have messages', (done) => {
      chai.request(app).get('/api/v1/groups/3/messages')
        .set('x-access-token', token)
        .end((err, res) => {
          res.status.should.equal(200);
          res.body.should.be.a('object');
          res.body.should.have.property('messages');
          res.body.messages.should.be.a('array').with.lengthOf(0);
          done();
        });
    });
  });

  // Get group members
  describe('GET /api/v1/groups/:group_id/members', () => {
    it('should return status 401 when user is not logged in (no token is provided)', (done) => {
      chai.request(app).get('/api/v1/groups/2/members')
        .end((err, res) => {
          res.status.should.equal(401);
          res.body.should.be.a('object');
          res.body.should.have.property('error').eql('No token provided.');
          done();
        });
    });

    it('should successfully fetch members of specified group', (done) => {
      chai.request(app).get('/api/v1/groups/2/members')
        .set('x-access-token', token)
        .end((err, res) => {
          res.status.should.equal(200);
          res.body.should.be.a('object');
          res.body.should.have.property('members').with.lengthOf(2);
          res.body.members.should.be.a('array');
          res.body.members[0].should.have.property('firstName').eql('Godwin');
          res.body.members[0].should.have.property('lastName').eql('Ekugbah');
          res.body.members[0].should.have.property('username').eql('chyke');
          res.body.members[0].should.have.property('email').eql('chyke@yahoo.com');
          done();
        });
    });

    it('should return status 400 if group id is not a number', (done) => {
      chai.request(app).get('/api/v1/groups/u/members')
        .set('x-access-token', token)
        .end((err, res) => {
          res.status.should.equal(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Invalid group id');
          done();
        });
    });

    it('should return status 404 if specified group does not exist', (done) => {
      chai.request(app).get('/api/v1/groups/10/members')
        .set('x-access-token', token)
        .end((err, res) => {
          res.status.should.equal(404);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Group does not exist');
          done();
        });
    });
  });
});
