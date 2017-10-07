import chai from 'chai';
import models from '../../models';

const should = chai.should();
const user = {
  firstName: 'Mary',
  lastName: 'Mazi',
  username: 'mazma',
  phoneNumber: '08098765432',
  email: 'maryyy@yahoo.com',
  password: '1234',
};
let testId;

describe('User model', () => {
  it('should create a new user Mary', (done) => {
    models.User.create(user).then((newUser, error) => {
      if (!error) {
        user.firstName.should.equal(newUser.firstName);
        user.lastName.should.equal(newUser.lastName);
        user.email.should.equal(newUser.email);
      }
      testId = newUser.id;
      done();
    });
  });

  it('should not create a new user if first name is null', (done) => {
    user.firstName = null;
    user.username = 'mazma1';
    user.email = 'test@mail.com';
    models.User.create(user).then().catch((error) => {
      error.errors[0].message.should.equal('firstName cannot be null');
      done();
    });
  });

  it('should not create a new user if username is null', (done) => {
    user.firstName = 'Mary';
    user.lastName = 'Mazi';
    user.username = null;
    user.email = 'test2@mail.com';
    models.User.create(user).then().catch((error) => {
      error.errors[0].message.should.equal('username cannot be null');
      done();
    });
  });

  it('should not create a new user if last name is null', (done) => {
    user.firstName = 'Mary';
    user.lastName = null;
    user.username = 'mazma2';
    user.email = 'test2@mail.com';
    models.User.create(user).then().catch((error) => {
      error.errors[0].message.should.equal('lastName cannot be null');
      done();
    });
  });

  it('should not create a new user if email is null', (done) => {
    user.firstName = 'Mary';
    user.lastName = 'Mazi';
    user.username = 'mazma3';
    user.email = null;
    models.User.create(user).then().catch((error) => {
      error.errors[0].message.should.equal('email cannot be null');
      done();
    });
  });

  it('should update a user\'s password', (done) => {
    models.User.findById(testId).then((existingUser) => {
      existingUser
        .update({ password: '123456' })
        .then((updatedUser) => {
          updatedUser.dataValues.id.should.equal(testId);
          updatedUser.dataValues.password.should.equal('123456');
          done();
        });
    });
  });
});
