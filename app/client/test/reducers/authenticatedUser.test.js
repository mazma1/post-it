import isEmpty from 'lodash/isEmpty';
import isAuthReducer from '../../../client/reducers/authenticatedUser';
import * as types from '../../actions/types';


describe('isAuthenticated reducer', () => {
  it('should return initial state', () => {
    expect(isAuthReducer(undefined, {})).toEqual(
      {
        isAuthenticated: false,
        user: {}
      }
    );
  });

  it('should act on an action with the type SET_CURRENT_USER', () => {
    const user = {
      data: {
        id: 1,
        firstName: 'Mary',
        lastName: 'Mazi',
        username: 'mazma',
        email: 'mary@yahoo.com'
      }
    };
    const action = {
      type: types.SET_CURRENT_USER,
      user
    };
    expect(isAuthReducer(undefined, action)).toEqual(
      {
        isAuthenticated: !isEmpty(action.user),
        user: {
          id: user.data.id,
          firstname: user.data.firstName,
          lastname: user.data.lastName,
          username: user.data.username,
          email: user.data.email
        }
      }
    );
  });

  it('should act on an action with the type DELETE_CURRENT_USER', () => {
    const action = {
      type: types.DELETE_CURRENT_USER,
      user: {}
    };
    expect(isAuthReducer(undefined, action)).toEqual(
      {
        isAuthenticated: !isEmpty(action.user),
        user: action.user
      }
    );
  });
});
