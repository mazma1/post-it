import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import * as actions from '../../../client/actions/search';
import * as types from '../../actions/types';

const middlewares = [thunk];
const mock = new MockAdapter(axios);
const mockStore = configureMockStore(middlewares);


describe('Search Action\'s', () => {
  describe('#searchUser', () => {
    it('should create FETCH_SEARCHED_USER_SUCCESS after making a search request successfully', () => {
      mock.onGet('/api/v1/users/search')
        .reply(200, { id: 1, name: 'mazma' });

      const expectedAction = {
        type: types.FETCH_SEARCHED_USER_SUCCESS,
        users: [{ id: 1, name: 'mazma' }]
      };
      const store = mockStore({});

      store.dispatch(actions.searchUser({ searchQuery: 'm' })).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
    });
  });

  describe('#fetchingSearchedUser', () => {
    it('should set search result as empty when request has not been fulfilled', () => {
      const expectedAction = {
        type: types.FETCH_SEARCHED_USER
      };
      expect(actions.fetchingSearchedUser()).toEqual(expectedAction);
    });
  });

  describe('#fetchSearchedUserSuccess', () => {
    it('should set search result when request is successful', () => {
      const searchResult = {};
      const expectedAction = {
        type: types.FETCH_SEARCHED_USER_SUCCESS,
        searchResult
      };
      expect(actions.fetchSearchedUserSuccess(searchResult)).toEqual(expectedAction);
    });
  });

  describe('#resetSearch', () => {
    it('should set search result as empty object', () => {
      const expectedAction = {
        type: types.RESET_SEARCH
      };
      expect(actions.resetSearch()).toEqual(expectedAction);
    });
  });

  describe('#fetchSearchedUserFailure', () => {
    it('should return an error when the search request fails', () => {
      const expectedAction = {
        type: types.FETCH_SEARCHED_USER_FAILURE,
        error: {}
      };
      expect(actions.fetchSearchedUserFailure({})).toEqual(expectedAction);
    });
  });
});

