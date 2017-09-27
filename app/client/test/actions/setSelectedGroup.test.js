import setSelectedGroup from '../../actions/setSelectedGroup';
import * as types from '../../actions/types';

describe('Set Selected Group Action', () => {
  it('should set a selected group as active', () => {
    const selectedGroup = {
      id: 1,
      name: 'Cohort 29'
    };
    const expectedAction = {
      type: types.SET_SELECTED_GROUP,
      selectedGroup
    };
    expect(setSelectedGroup(selectedGroup)).toEqual(expectedAction);
  });
});
