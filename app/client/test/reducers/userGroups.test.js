import isEmpty from 'lodash/isEmpty';
import userGroupsReducer from '../../../client/reducers/userGroups';
import * as types from '../../actions/types';


describe('User Groups Reducer', () => {
  it('should return initial state', () => {
    expect(userGroupsReducer(undefined, {})).toEqual({
      isLoading: false,
      groups: []
    });
  });

  it('should act on an action with the type FETCHING_USER_GROUPS', () => {
    const action = {
      type: types.FETCHING_USER_GROUPS
    };
    expect(userGroupsReducer(undefined, action)).toEqual(
      {
        isLoading: true,
        groups: []
      }
    );
  });

  it('should act on an action with the type SET_USER_GROUPS', () => {
    const groups = [];
    const action = {
      type: types.SET_USER_GROUPS,
      groups
    };
    expect(userGroupsReducer(undefined, action)).toEqual(
      {
        isLoading: false,
        hasGroup: !isEmpty(action.groups),
        groups: action.groups
      }
    );
  });

  it('should act on an action with the type FETCH_USER_GROUPS_FAILURE', () => {
    const error = {
      response: {
        data: {
          error: {}
        }
      }
    };
    const action = {
      type: types.FETCH_USER_GROUPS_FAILURE,
      error
    };
    expect(userGroupsReducer(undefined, action)).toEqual(
      {
        isLoading: false,
        error: action.error.response.data.error
      }
    );
  });
});
