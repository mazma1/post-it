const chai = require('chai');
const chaiHttp = require('chai-http');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const app = require('../app/server/app.js');
const User = require('../app/server/models').User;
const Group = require('../app/server/models').Group;
const groupMember = require('../app/server/models').Group_member;

const should = chai.should();
chai.use(chaiHttp);

const saltRounds = 7;
const salt = bcrypt.genSaltSync(saltRounds);
const token = jwt.sign({ data: { id: 1 } }, process.env.TOKEN_SECRET, { expiresIn: 1440 });

describe('POST /api/group Route', () => {
  before((done) => {
    User.destroy({
      cascade: true,
      truncate: true,
      restartIdentity: true
    })
    .then(() => {
      User.bulkCreate([
        {
          firstname: 'Mary',
          lastname: 'Mazi',
          username: 'mary',
          email: 'mary@gmail.com',
          password: bcrypt.hashSync('1234', salt),
          confirm_password: bcrypt.hashSync('1234', salt)
        },
        {
          firstname: 'Temi',
          lastname: 'Olota',
          username: 'temi',
          email: 'temi@gmail.com',
          password: bcrypt.hashSync('1234', salt),
          confirm_password: bcrypt.hashSync('1234', salt)
        }
      ])
      .then(() => {
        Group.bulkCreate([
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
        groupMember.bulkCreate([
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

  it('returns status 400 if group name already exists', (done) => {
    const group = {
      group_name: 'Test Group 2'
    };
    chai.request(app).post('/api/group')
      .set('x-access-token', token)
      .send(group)
      .end((err, res) => {
        res.status.should.equal(400);
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


