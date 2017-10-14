import chai from 'chai';
import app from '../../app';
import sendEmail from '../../utils/sendEmail';

const should = chai.should();

describe('Send Email', () => {
  it('should be a function', (done) => {
    sendEmail.should.be.a('function');
    done();
  });
});
