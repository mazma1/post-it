import axios from 'axios';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import * as types from '../../actions/types';
import MockLocalStorage from '../MockLocalStorage';
import userSignUpRequest from '../../../client/actions/signUp';

Object.defineProperty(window, 'localStorage', { value: MockLocalStorage });

const middlewares = [thunk];
const mock = new MockAdapter(axios);
const mockStore = configureMockStore(middlewares);

describe('Sign up async action', () => {
  it('should create SET_CURRENT_USER when signup is successful', () => {
    mock.onPost('/api/v1/users/signup')
      .reply(201, { data: { token: '1234tycngsgu67890plkm' } });

    const expectedAction = {
      type: types.SET_CURRENT_USER,
      user: { token: '1234tycngsgu67890plkm' }
    };
    const store = mockStore({});

    store.dispatch(userSignUpRequest()).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });
});
