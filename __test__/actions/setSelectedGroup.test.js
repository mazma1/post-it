import * as actions from '../../app/client/actions/setSelectedGroupAction';
import * as types from '../../app/client/actions/types';

describe('Set selected group action creator', () => {
  it('should create an action to set the selected group as active', () => {
    const selectedGroup = {
      id: 1,
      name: 'Cohort 29'
    };
    const expectedAction = {
      type: types.SET_SELECTED_GROUP,
      selectedGroup
    };
    expect(actions.setSelectedGroup(selectedGroup)).toEqual(expectedAction);
  });
});
