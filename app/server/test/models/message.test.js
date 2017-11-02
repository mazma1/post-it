import chai from 'chai';
import models from '../../models';

const should = chai.should();
const message = {
  body: 'Hello',
  groupId: 1,
  userId: 1,
  priority: 'normal',
  readBy: 'mazma',
  isArchived: []
};

describe('Message model', () => {
  it('should create a new message', (done) => {
    models.Message.create(message).then((newMessage, error) => {
      if (!error) {
        message.body.should.equal(newMessage.body);
        message.userId.should.equal(newMessage.userId);
        message.groupId.should.equal(newMessage.groupId);
        message.priority.should.equal(newMessage.priority);
      }
      done();
    });
  });
});
