import { combineReducers } from 'redux';
import FlashMessageReducer from '../reducers/flashMessage';
import AuthenticatedUserReducer from '../reducers/authenticatedUser';
import UserGroupsReducer from '../reducers/userGroups';
import SelectedGroupReducer from '../reducers/selectedGroup';
import GroupMembersReducer from '../reducers/groupMembers';
import GroupMessagesReducer from '../reducers/groupMessages';

// Mapping of our state
const rootReducer = combineReducers({
  flashMessages: FlashMessageReducer,
  signedInUser: AuthenticatedUserReducer,
  userGroups: UserGroupsReducer,
  selectedGroup: SelectedGroupReducer,
  groupMembers: GroupMembersReducer,
  groupMessages: GroupMessagesReducer
});

export default rootReducer;
