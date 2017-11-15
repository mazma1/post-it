import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import sinon from 'sinon';
import models from '../../models';
import app from '../../app';

const should = chai.should();
chai.use(chaiHttp);
let token;

describe('Message Endpoint', () => {
  before((done) => {
    token = jwt.sign({ data: { id: 1 } }, process.env.TOKEN_SECRET, { expiresIn: '24hr' });
    done();
  });

  after((done) => {
    token = null;
    done();
  });

  // Update that a user has read a message
  describe('PATCH /api/v1/messages/:message_id/read', () => {
    it('should return status 201 after updating that a user has read a message', (done) => {
      chai.request(app).patch('/api/v1/messages/7/read')
        .set('x-access-token', token)
        .send({ readBy: 'mazma', username: 'chyke' })
        .end((err, res) => {
          res.status.should.equal(201);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Message read status updated successfully');
          done();
        });
    });

    it('should return status 200 if a user has already read a message', (done) => {
      chai.request(app).patch('/api/v1/messages/5/read')
        .set('x-access-token', token)
        .send({ readBy: 'mazma', username: 'mazma' })
        .end((err, res) => {
          res.status.should.equal(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('User has read message');
          done();
        });
    });

    // Bad Request
    describe('internal server error', () => {
      let stubFindOne;

      beforeEach((done) => {
        stubFindOne = sinon.stub(models.Message, 'update')
          .callsFake(() => Promise.reject({ message: 'Internal server error' }));
        done();
      });

      afterEach((done) => {
        stubFindOne.restore();
        done();
      });

      it('should return status 500', (done) => {
        chai.request(app).patch('/api/v1/messages/1/read')
          .set('x-access-token', token)
          .type('form')
          .send({ read: 'mazma', username: 'mary' })
          .end((err, res) => {
            res.status.should.equal(500);
            res.body.should.have.property('error').eql('Internal server error');
            done();
          });
      });
    });
  });

  // Archive message
  describe('PATCH /api/v1/messages/:message_id/archive', () => {
    it('should return status 200 when a user successfully archives a message', (done) => {
      chai.request(app).patch('/api/v1/messages/7/archive')
        .set('x-access-token', token)
        .send({ username: 'chyke' })
        .end((err, res) => {
          res.status.should.equal(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Message successfully archived');
          done();
        });
    });

    // Bad Request
    describe('internal server error', () => {
      let stubFindOne;

      beforeEach((done) => {
        stubFindOne = sinon.stub(models.Message, 'findOne')
          .callsFake(() => Promise.reject({ message: 'Internal server error' }));
        done();
      });

      afterEach((done) => {
        stubFindOne.restore();
        done();
      });

      it('should return status 500', (done) => {
        chai.request(app).patch('/api/v1/messages/1/archive')
          .set('x-access-token', token)
          .type('form')
          .send({ username: 'clare' })
          .end((err, res) => {
            res.error.status.should.equal(500);
            res.error.text.should.equal('Internal server error');
            done();
          });
      });
    });
  });
});
