import selectedGroupReducer from '../../../client/reducers/selectedGroup';
import * as types from '../../actions/types';


describe('Selected Group Reducer', () => {
  it('should return initial state', () => {
    expect(selectedGroupReducer(undefined, {})).toEqual({});
  });

  it('should act on an action with the type SET_SELECTED_GROUP', () => {
    const action = {
      type: types.SET_SELECTED_GROUP,
      selectedGroup: {}
    };
    expect(selectedGroupReducer(undefined, action)).toEqual(action.selectedGroup);
  });
});
