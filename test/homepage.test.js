const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app/server/app.js');

const should = chai.should();
chai.use(chaiHttp);

describe('Home page test', () => {
  // #1 should return home page
  it('should return status code 200', (done) => {
    // calling home page api
    chai.request(app)
      .get('/')
      .end((err, res) => {
        res.status.should.equal(200);
        res.error.should.equal(false);
        done();
      });
  });
});
