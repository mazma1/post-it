import searchUserReducer from '../../../client/reducers/searchUser';
import * as types from '../../actions/types';


describe('Search User Reducer', () => {
  it('should return initial state', () => {
    expect(searchUserReducer(undefined, {})).toEqual({});
  });

  it('should act on an action with the type FETCH_SEARCHED_USER', () => {
    const action = {
      type: types.FETCH_SEARCHED_USER
    };
    expect(searchUserReducer(undefined, action)).toEqual(
      {
        isLoading: true
      }
    );
  });

  it('should act on an action with the type FETCH_SEARCHED_USER_SUCCESS', () => {
    const searchResult = {
      users: {},
      pagination: {}
    };
    const action = {
      type: types.FETCH_SEARCHED_USER_SUCCESS,
      searchResult
    };
    expect(searchUserReducer(undefined, action)).toEqual(
      {
        isLoading: false,
        users: action.searchResult.users,
        pagination: action.searchResult.pagination
      }
    );
  });

  it('should act on an action with the type FETCH_SEARCHED_USER_FAILURE', () => {
    const error = {};
    const action = {
      type: types.FETCH_SEARCHED_USER_FAILURE,
      error
    };
    expect(searchUserReducer(undefined, action)).toEqual(
      {
        isLoading: false,
        error: action.error
      }
    );
  });

  it('should act on an action with the type RESET_SEARCH', () => {
    const action = {
      type: types.RESET_SEARCH
    };
    expect(searchUserReducer(undefined, action)).toEqual({});
  });
});
