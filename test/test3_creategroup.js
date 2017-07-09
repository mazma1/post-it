const chai = require('chai');
const chaiHttp = require('chai-http');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const sinon = require('sinon');
const app = require('../app/server/app.js');
const User = require('../app/server/models').User;
const Group = require('../app/server/models').Group;

const should = chai.should();
chai.use(chaiHttp);

const saltRounds = 7;
const salt = bcrypt.genSaltSync(saltRounds);

describe('POST /api/group', () => {
  let token;
  // let userId;
  // let tokenAuthSpy;
  let testGroup;


  before((done) => {
    User.destroy({ where: {} })
      .then(() => {
        User.create({
          firstname: 'Mary',
          lastname: 'Mazi',
          username: 'mary',
          email: 'mary@gmail.com',
          password: bcrypt.hashSync('1234', salt),
          confirm_password: bcrypt.hashSync('1234', salt)
        })
        .then(user => {
          Group.destroy({ where: {} })
            .then(() => Group.bulkCreate([
              {
                group_name: 'Test Group 1',
                user_id: user.id
              },
              {
                group_name: 'Test Group 2',
                user_id: user.id
              }
            ]))
            .then((groups) => {
              testGroup = groups[0];
              token = jwt.sign({ data: user }, process.env.TOKEN_SECRET, { expiresIn: 1440 });
              done();
            });
        })
        .catch((error) => {
          done(error);
        });
      });
    done();
  });


  // describe('status 201', () => {
  //   it('returns successfully create group', (done) => {
  //     const group = {
  //       // id: 1,
  //       group_name: 'Test Group 3'
  //       // user_id: userId
  //     };
  //     chai.request(app).post('/api/group')
  //       .set('x-access-token', `${token}`)
  //       .send(group)
  //       .end((err, res) => {
  //         res.status.should.equal(200);
  //         res.body.should.be.a('object');
  //         res.body.should.have.property('message').eql('Group was successfully created');
  //         res.body.should.have.property('groupName').eql('Test Group 3');
  //         res.body.should.have.property('groupOwner').eql(1);
  //         done();
  //       });
  //   });
  // });

  describe('status 403', () => {
    it('throws an error when user is not logged in (no token is provided)', (done) => {
      const group = {
        // id: 1,
        group_name: 'Test Group 4'
        // user_id: userId
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
});


