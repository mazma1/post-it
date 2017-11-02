import chai from 'chai';
import models from '../../models';

const should = chai.should();
const group = {
  groupName: 'Cohort 29',
  userId: 1
};

describe('Group model', () => {
  it('should create a new group, Cohort 29', (done) => {
    models.Group.create(group).then((newGroup, error) => {
      if (!error) {
        group.groupName.should.equal(newGroup.groupName);
        group.userId.should.equal(newGroup.userId);
      }
      done();
    });
  });

  it('should not create the new group if group name is null', (done) => {
    group.groupName = null;
    models.Group.create(group).then().catch((error) => {
      error.errors[0].message.should.equal('groupName cannot be null');
      done();
    });
  });
});
