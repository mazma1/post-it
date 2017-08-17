import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import * as actions from '../../app/client/actions/signinAction';
import * as types from '../../app/client/actions/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);


describe('Sign in action creators tests', () => {
  describe('Sync action creators', () => {
    it('should create an action to set current user', () => {
      const user = {
        data: {
          id: 1,
          firstname: 'Mary',
          lastname: 'Mazi',
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

    it('should create an action to delete current user', () => {
      const user = {};
      const expectedAction = {
        type: types.SET_CURRENT_USER,
        user
      };
      expect(actions.setCurrentUser(user)).toEqual(expectedAction);
    });
  });

  describe('Async action creators', () => {
    afterEach(() => {
      nock.cleanAll();
    });

    it('creates SET_CURRENT_USER when signin is successful', () => {
      nock('http://localhost')
        .post('/api/user/signin')
        .reply(201, { data: { token: '1234tycngsgu67890plkm' } });

      const expectedAction = {
        type: types.SET_CURRENT_USER,
        user: { token: '1234tycngsgu67890plkm' }
      };
      const store = mockStore();

      store.dispatch(actions.userSigninRequest({ username: 'mazma', password: 1234 })).then(() => {
        // return of async actions
        expect(store.getActions()).toEqual(expectedAction);
      });
    });
  });
});

