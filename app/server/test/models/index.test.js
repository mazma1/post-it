import chai from 'chai';
import models from '../../models';

const should = chai.should();

describe('Created Models', () => {
  it('should include User model', () => {
    should.exist(models.User);
  });

  it('should include Group model', () => {
    should.exist(models.Group);
  });

  it('should include Message model', () => {
    should.exist(models.Message);
  });

  it('should include Forgot Password model', () => {
    should.exist(models.ForgotPassword);
  });

  it('should include Group Members model', () => {
    should.exist(models.GroupMember);
  });
});
