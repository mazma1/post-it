import * as actions from '../../actions/setSelectedGroup';
import * as types from '../../actions/types';

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
