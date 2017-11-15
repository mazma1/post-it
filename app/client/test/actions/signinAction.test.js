import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import * as actions from '../../../client/actions/signIn';
import * as types from '../../actions/types';
import MockLocalStorage from '../MockLocalStorage';

Object.defineProperty(window, 'localStorage', { value: MockLocalStorage });
Object.defineProperty(window.location, 'href', {
  writable: true,
  value: '/'
});

const middlewares = [thunk];
const mock = new MockAdapter(axios);
const mockStore = configureMockStore(middlewares);

describe('Sign In Action\'s', () => {
  describe('#setCurrentUser', () => {
    it('should set current user details with given data', () => {
      const user = {
        data: {
          id: 1,
          firstName: 'Mary',
          lastName: 'Mazi',
          username: 'mazma',
          email: 'holladasheila@gmail.com'
        }
      };
      const expectedAction = {
        type: types.SET_CURRENT_USER,
        user
      };
      expect(actions.setCurrentUser(user)).toEqual(expectedAction);
    });
  });

  describe('#logout', () => {
    it('should create DELETE_CURRENT_USER after successful log out', () => {
      const expectedAction = {
        type: types.DELETE_CURRENT_USER,
        user: {}
      };
      const store = mockStore();
      store.dispatch(actions.logout());
      expect(store.getActions()).toEqual([expectedAction]);
    });
  });

  describe('#deleteCurrentUser', () => {
    it('should delete a user\'s data after log out', () => {
      const user = {};
      const expectedAction = {
        type: types.DELETE_CURRENT_USER,
        user
      };
      const store = mockStore();
      store.dispatch(actions.deleteCurrentUser(user));
      expect(store.getActions()).toEqual([expectedAction]);
    });
  });

  describe('#setGoogleAuthStatus', () => {
    it('should update the store with status of a Google verified user', () => {
      const status = 'Returning user';
      const expectedAction = {
        type: types.SET_GOOGLE_AUTH_STATUS,
        status
      };
      expect(actions.setGoogleAuthStatus(status)).toEqual(expectedAction);
    });
  });

  describe('#userSigninRequest', () => {
    it('should create SET_CURRENT_USER after successful sign in', () => {
      mock.onPost('/api/v1/users/signin')
        .reply(201, { data: { token: '1234tycngsgu67890plkm' } });

      const user = { token: '1234tycngsgu67890plkm' };
      const expectedAction = {
        type: types.SET_CURRENT_USER,
        user
      };
      const store = mockStore();

      store.dispatch(actions.userSignInRequest({
        username: 'mazma',
        password: 1234
      })).then(() => {
        expect(actions.setCurrentUser(user)).toEqual(expectedAction);
      });
    });
  });

  describe('#googleSignIn', () => {
    it('should create SET_CURRENT_USER after successful sign in via Google', () => {
      mock.onPost('/api/v1/users/google-auth')
        .reply(201, { data: { token: '1234tycngsgu67890plkm' } });

      const user = { token: '1234tycngsgu67890plkm' };
      const expectedAction = {
        type: types.SET_CURRENT_USER,
        user
      };
      const store = mockStore();

      store.dispatch(actions.googleSignIn({ token: '1234tycngsgu67890plkm' }))
      .then(() => {
        expect(actions.setCurrentUser(user)).toEqual(expectedAction);
      });
    });
  });

  describe('#authorizeGoogleUser', () => {
    it('should make request to determine if user is new or returning ', () => {
      mock.onPost('/api/v1/users/verifyGoogleUser')
        .reply(200, { data: { message: 'Returning user' } });

      const expectedAction = {
        type: types.SET_GOOGLE_AUTH_STATUS,
        status: 'Returning user'
      };
      const store = mockStore({ data: { message: 'Returning user' } });

      store.dispatch(actions.authorizeGoogleUser({ email: 'mazi@yahoo.com' }))
        .then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
    });
  });
});
