import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import * as actions from '../../../client/actions/resetPassword';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Reset Password Action\'s', () => {
  describe('#resetLinkRequest', () => {
    afterEach(() => {
      nock.cleanAll();
    });

    it('should make request to send reset password link to a user', () => {
      nock('http://localhost')
        .post('/api/v1/users/resetpassword')
        .reply(201, {});

      const store = mockStore({ isAuthenticated: [] });

      store.dispatch(actions.resetLinkRequest());
    });
  });

  describe('#validateResetPasswordToken', () => {
    afterEach(() => {
      nock.cleanAll();
    });

    it('should make request to check validity of reset password token', () => {
      nock('http://localhost')
        .post('/api/v1/users/newpassword')
        .reply(201, {});

      const store = mockStore({ isAuthenticated: [] });

      store.dispatch(actions.validateResetPasswordToken());
    });
  });

  describe('#updatePassword', () => {
    afterEach(() => {
      nock.cleanAll();
    });

    it('should make request to update user\'s password', () => {
      const newPasswordDetails = {
        token: '56789iuyhghjkl'
      };
      nock('http://localhost')
        .post('/api/v1/users/updatepassword/sdfhji987trdj')
        .reply(201, {});

      const store = mockStore({ isAuthenticated: [] });

      store.dispatch(actions.updatePassword(newPasswordDetails));
    });
  });
});
