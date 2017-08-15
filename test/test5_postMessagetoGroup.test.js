const app = require('../app/server/app.js');
const chai = require('chai');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');

const should = chai.should();
chai.use(chaiHttp);
const token = jwt.sign({ data: { id: 1 } }, process.env.TOKEN_SECRET, { expiresIn: 1440 });


describe('POST /api/group/:group_id/message Route', () => {
  it('returns status 403 when user is not logged in (no token is provided)', (done) => {
    const message = '';
    chai.request(app).post('/api/group/2/message')
      .send(message)
      .end((err, res) => {
        res.status.should.equal(403);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('No token provided.');
        done();
      });
  });

  it('returns status 400 when message is not provided', (done) => {
    chai.request(app).post('/api/group/2/message')
      .set('x-access-token', token)
      .send({ })
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Message is required.');
        done();
      });
  });

  it('successfully send specified message to group', (done) => {
    const message = {
      message: 'Test Message'
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
