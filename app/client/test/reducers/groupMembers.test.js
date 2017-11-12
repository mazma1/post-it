import groupMembersReducer from '../../../client/reducers/groupMembers';
import * as types from '../../actions/types';


describe('Group Members Reducer', () => {
  it('should return initial state', () => {
    expect(groupMembersReducer(undefined, {})).toEqual(
      {
        isLoading: false,
        members: []
      }
    );
  });

  it('should act on an action with the type FETCHING_GROUP_MEMBERS', () => {
    const action = {
      type: types.FETCHING_GROUP_MEMBERS
    };
    expect(groupMembersReducer(undefined, action)).toEqual(
      {
        isLoading: true,
        members: []
      }
    );
  });

  it('should act on an action with the type SET_GROUP_MEMBERS', () => {
    const membersDetails = {
      members: { id: 1, name: 'mazma' }
    };
    const action = {
      type: types.SET_GROUP_MEMBERS,
      membersDetails
    };
    expect(groupMembersReducer(undefined, action)).toEqual(
      {
        isLoading: false,
        members: action.membersDetails.members
      }
    );
  });
});
