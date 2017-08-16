const app = require('../app/server/app.js');
const chai = require('chai');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');

const should = chai.should();
chai.use(chaiHttp);
const token = jwt.sign({ data: { id: 1 } }, process.env.TOKEN_SECRET, { expiresIn: 1440 });


describe('POST /api/group/:group_id/messages Route', () => {
  it('returns status 403 when user is not logged in (no token is provided)', (done) => {
    chai.request(app).get('/api/group/2/messages')
      .end((err, res) => {
        res.status.should.equal(403);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('No token provided.');
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
