import resetPasswordReducer from '../../../client/reducers/resetPassword';
import * as types from '../../actions/types';


describe('Selected Group Reducer', () => {
  it('should return initial state', () => {
    expect(resetPasswordReducer(undefined, {})).toEqual({});
  });

  it('should act on an action with the type REQUEST_NEW_PASSWORD_SUCCESS', () => {
    const action = {
      type: types.REQUEST_NEW_PASSWORD_SUCCESS,
      message: 'Email sent'
    };
    expect(resetPasswordReducer(undefined, action)).toEqual({
      message: 'Email sent'
    });
  });

  it('should act on an action with the type REQUEST_NEW_PASSWORD_FAILURE', () => {
    const action = {
      type: types.REQUEST_NEW_PASSWORD_FAILURE,
      error: 'Network error'
    };
    expect(resetPasswordReducer(undefined, action)).toEqual({
      message: 'Network error'
    });
  });

  it('should act on an action with the type SET_TOKEN_STATUS', () => {
    const action = {
      type: types.SET_TOKEN_STATUS,
      message: 'Valid token'
    };
    expect(resetPasswordReducer(undefined, action)).toEqual({
      status: 'success',
      message: 'Valid token'
    });
  });

  it('should act on an action with the type SET_TOKEN_STATUS', () => {
    const action = {
      type: types.TOKEN_STATUS_ERROR,
      message: 'Invalid token'
    };
    expect(resetPasswordReducer(undefined, action)).toEqual({
      status: 'failure',
      message: 'Invalid token'
    });
  });
});
