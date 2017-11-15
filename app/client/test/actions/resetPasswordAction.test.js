import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import * as types from '../../actions/types';
import * as actions from '../../../client/actions/resetPassword';

const middlewares = [thunk];
const mock = new MockAdapter(axios);
const mockStore = configureMockStore(middlewares);

describe('Reset Password Action\'s', () => {
  describe('#resetLinkRequest', () => {
    it('should make request to send reset password link to a user', () => {
      mock.onPost('/api/v1/users/resetpassword')
        .reply(201, {});

      const expectedAction = {
        type: types.REQUEST_NEW_PASSWORD_SUCCESS,
        message: 'Email sent'
      };
      const store = mockStore();

      store.dispatch(actions.resetLinkRequest()).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
    });
  });

  describe('#validateResetPasswordToken', () => {
    it('should make request to check validity of reset password token', () => {
      mock.onPost('/api/v1/users/newpassword')
        .reply(201, {});

      const store = mockStore();
      const expectedAction = {
        type: types.SET_TOKEN_STATUS,
        message: 'Email sent'
      };

      store.dispatch(actions.validateResetPasswordToken()).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
    });
  });
});
