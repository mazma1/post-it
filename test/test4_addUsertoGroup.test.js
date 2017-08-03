const app = require('../app/server/app.js');
const chai = require('chai');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');

const should = chai.should();
chai.use(chaiHttp);
const token = jwt.sign({ data: { id: 1 } }, process.env.TOKEN_SECRET, { expiresIn: 1440 });


describe('POST /api/group/:group_id/user Route', () => {
  it('returns status 403 when user is not logged in (no token is provided)', (done) => {
    const identifier = 'temi';
    chai.request(app).post('/api/group/2/user')
      .send(identifier)
      .end((err, res) => {
        res.status.should.equal(403);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('No token provided.');
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

  it('returns status 400 when user already exists in group', (done) => {
    const identifier = {
      identifier: 'temi'
    };
    chai.request(app).post('/api/group/2/user')
      .set('x-access-token', token)
      .send(identifier)
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error').eql('User has already been added to group');
        done();
      });
  });
});
