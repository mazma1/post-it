import flashMsgReducer from '../../../client/reducers/flashMessage';
import * as types from '../../actions/types';


describe('flashMessage reducer', () => {
  it('should return the initial state', () => {
    expect(flashMsgReducer(undefined, {})).toEqual([]);
  });

  it('should act on an action with the type DELETE_FLASH_MESSAGE', () => {
    const newState = [
      {
        id: 12345,
        type: 'error',
        message: 'Unable to sign in'
      },
      {
        id: 6789,
        type: 'success',
        message: 'Sign in was successful'
      }
    ];
    const action = {
      type: types.DELETE_FLASH_MESSAGE,
      messageId: 12345
    };
    expect(flashMsgReducer(newState, action)).toEqual(
      [
        {
          id: 6789,
          type: 'success',
          message: 'Sign in was successful'
        }
      ]
    );
  });
});