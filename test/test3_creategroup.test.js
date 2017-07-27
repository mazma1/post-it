const chai = require('chai');
const chaiHttp = require('chai-http');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const app = require('../app/server/app.js');
const User = require('../app/server/models').User;
const Group = require('../app/server/models').Group;

const should = chai.should();
chai.use(chaiHttp);

const saltRounds = 7;
const salt = bcrypt.genSaltSync(saltRounds);

describe('POST /api/group', () => {
  let token;

  before((done) => {
    User.destroy({
      cascade: true,
      truncate: true,
      restartIdentity: true
    })
    .then(() => {
      User.create({
        firstname: 'Mary',
        lastname: 'Mazi',
        username: 'mary',
        email: 'mary@gmail.com',
        password: bcrypt.hashSync('1234', salt),
        confirm_password: bcrypt.hashSync('1234', salt)
      })
      .then((user) => {
        Group.bulkCreate([
          {
            group_name: 'Test Group 1',
            user_id: user.id
          },
          {
            group_name: 'Test Group 2',
            user_id: user.id
          }
        ]);
        token = jwt.sign({ data: user }, process.env.TOKEN_SECRET);
      });
      done();
    })
    .catch((error) => {
      done(error);
    });
  });

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
          res.body.should.have.property('message').eql('No token provided.');
          done();
        });
    });
  });

  describe('status 201', () => {
    it('returns successfully create group', (done) => {
      const group = {
        group_name: 'Test Group 3'
      };
      chai.request(app).post('/api/group')
        .set('x-access-token', token)
        .send(group)
        .end((err, res) => {
          res.status.should.equal(201);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Group was successfully created');
          res.body.should.have.property('groupName').eql('Test Group 3');
          res.body.should.have.property('groupOwner').eql(1);
          done();
        });
    });
  });
});


