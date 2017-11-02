import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import * as actions from '../../../client/actions/resetPassword';

const middlewares = [thunk];
const mock = new MockAdapter(axios);
const mockStore = configureMockStore(middlewares);

describe('Reset Password Action\'s', () => {
  describe('#resetLinkRequest', () => {
    it('should make request to send reset password link to a user', () => {
      mock.onPost('/api/v1/users/resetpassword')
        .reply(201, {});

      const store = mockStore({ isAuthenticated: [] });

      store.dispatch(actions.resetLinkRequest());
    });
  });

  describe('#validateResetPasswordToken', () => {
    it('should make request to check validity of reset password token', () => {
      mock.onPost('/api/v1/users/newpassword')
        .reply(201, {});

      const store = mockStore({ isAuthenticated: [] });

      store.dispatch(actions.validateResetPasswordToken());
    });
  });

  describe('#updatePassword', () => {
    it('should make request to update user\'s password', () => {
      const newPasswordDetails = {
        token: '56789iuyhghjkl'
      };
      mock.onPost('/api/v1/users/updatepassword/sdfhji987trdj')
        .reply(201, {});

      const store = mockStore({ isAuthenticated: [] });

      store.dispatch(actions.updatePassword(newPasswordDetails));
    });
  });
});
