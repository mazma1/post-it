import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import * as actions from '../../../client/actions/signIn';
import * as types from '../../actions/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Sign In Actions', () => {
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

  describe('#deleteCurrentUser', () => {
    it('should delete a user\'s data after log out', () => {
      const user = {};
      const expectedAction = {
        type: types.SET_CURRENT_USER,
        user
      };
      expect(actions.setCurrentUser(user)).toEqual(expectedAction);
    });
  });

  describe('#userSigninRequest', () => {
    afterEach(() => {
      nock.cleanAll();
    });

    it('should create SET_CURRENT_USER after successful sign in', () => {
      nock('http://localhost')
        .post('/api/v1/users/signin')
        .reply(201, { data: { token: '1234tycngsgu67890plkm' } });

      const expectedAction = {
        type: types.SET_CURRENT_USER,
        user: { token: '1234tycngsgu67890plkm' }
      };
      const store = mockStore();

      store.dispatch(actions.userSignInRequest({
        username: 'mazma',
        password: 1234
      })).then(() => {
        // return of async actions
        expect(store.getActions()).toEqual(expectedAction);
      });
    });
  });
});
