import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
// import expect from 'expect';
import { userSigninRequest } from '../../app/client/actions/signinAction';
import * as types from '../../app/client/actions/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Sign up async action', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('creates SET_CURRENT_USER when signin is successful', () => {
    nock('http://localhost')
      .post('/api/user/signup')
      .reply(201, { data: { token: '1234tycngsgu67890plkm' } });

    const expectedAction = {
      type: types.SET_CURRENT_USER,
      user: { token: '1234tycngsgu67890plkm' }
    };
    const store = mockStore({ isAuthenticated: [] });

    store.dispatch(userSigninRequest({ username: 'mazma', password: 1234 })).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedAction);
    });
  });
});