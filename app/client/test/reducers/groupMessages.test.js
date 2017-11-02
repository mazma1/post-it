import groupMessagesReducer from '../../../client/reducers/groupMessages';
import * as types from '../../actions/types';


describe('Group Messages Reducer', () => {
  it('should return initial state', () => {
    expect(groupMessagesReducer(undefined, {})).toEqual(
      {
        isLoading: false,
        messages: []
      }
    );
  });

  it('should act on an action with the type FETCHING_GROUP_MESSAGES', () => {
    const action = {
      type: types.FETCHING_GROUP_MESSAGES
    };
    expect(groupMessagesReducer(undefined, action)).toEqual(
      {
        isLoading: true,
        messages: []
      }
    );
  });

  it('should act on an action with the type SET_GROUP_MESSAGES', () => {
    const messages = [];
    const action = {
      type: types.SET_GROUP_MESSAGES,
      messages
    };
    expect(groupMessagesReducer(undefined, action)).toEqual(
      {
        isLoading: false,
        messages: action.messages
      }
    );
  });

  it('should act on an action with the type FETCH_GROUP_MESSAGES_FAILURE', () => {
    const error = {};
    const action = {
      type: types.FETCH_GROUP_MESSAGES_FAILURE,
      error
    };
    expect(groupMessagesReducer(undefined, action)).toEqual(
      {
        isLoading: false,
        messages: action.error
      }
    );
  });
});
