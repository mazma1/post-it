import { combineReducers } from 'redux';
import AuthenticatedUserReducer from '../reducers/authenticatedUser';
import UserGroupsReducer from '../reducers/userGroups';
import SelectedGroupReducer from '../reducers/selectedGroup';
import GroupMembersReducer from '../reducers/groupMembers';
import GroupMessagesReducer from '../reducers/groupMessages';
import SearchUserReducer from '../reducers/searchUser';

// Mapping of our state
const rootReducer = combineReducers({
  signedInUser: AuthenticatedUserReducer,
  userGroups: UserGroupsReducer,
  selectedGroup: SelectedGroupReducer,
  groupMembers: GroupMembersReducer,
  groupMessages: GroupMessagesReducer,
  searchResult: SearchUserReducer
});

export default rootReducer;
