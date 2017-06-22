// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const sinon = require('sinon');
// const User = require('../app/server/models').User;
// const Group = require('../app/server/models').Group;
// const tokenAuth = require('../app/server/middlewares/tokenAuth.js');

// const should = chai.should();
// chai.use(chaiHttp);

// const saltRounds = 7;
// const salt = bcrypt.genSaltSync(saltRounds);

// describe('POST /api/group', () => {
//   let app;
//   let token;
//   let userId;
//   let tokenAuthSpy;


//   before((done) => {
//     tokenAuthSpy = sinon.stub(tokenAuth, (req, res, next) => { // stub middleware before we load our app
//       req.decoded.data.id = 1;
//       next();
//     });
//     // tokenAuthSpy.callsArg(2); // this ensures we call our next() function on our middleware
//     app = require('../app/server/app.js');

//     User.destroy({ where: {} })
//       .then(() => {
//         User.create({
//           id: 1,
//           email: 'mary@gmail.com',
//           username: 'mary',
//           password: bcrypt.hashSync('1234', salt)
//         })
//         .then((user) => {
//           userId = user[0];
//           token = jwt.sign({ user_id: userId }, 'qWgdh*ujh7778Qwee');
//           done();
//         })
//         .catch((error) => {
//           done(error);
//         });
//       });
//   });

//   afterEach(() => {
//     // sinon.assert.calledOnce(tokenAuthSpy); // assert that our middleware was called once for each test
//     tokenAuthSpy.reset();
//   });


//   describe('status 201', () => {
//     it('returns successfully create group', (done) => {
//       const group = {
//         id: 1,
//         group_name: 'Test Group 1',
//         user_id: userId
//       };
//       chai.request(app).post('/api/group', tokenAuthSpy)
//         .set('x-access-token', token)
//         .send(group)
//         .end((err, res) => {
//           res.status.should.equal(201);
//           res.body.should.be.a('object');
//           res.body.should.have.property('message').eql('Group was successfully created');
//           res.body.should.have.property('groupName').eql('Test Group 1');
//           res.body.should.have.property('groupOwner').eql(1);
//           done(err);
//         });
//     });
//   });
// });


