import { combineReducers } from 'redux';
import AuthenticatedUserReducer from '../reducers/authenticatedUser';
import UserGroupsReducer from '../reducers/userGroups';
import SelectedGroupReducer from '../reducers/selectedGroup';
import GroupMembersReducer from '../reducers/groupMembers';
import GroupMessagesReducer from '../reducers/groupMessages';
import SearchUserReducer from '../reducers/searchUser';
import GoogleAuthStatusReducer from '../reducers/googleAuthStatus';
import NewGroupReducer from '../reducers/newGroup';
import ArchivedMessageReducer from '../reducers/archivedMessage';
import ResetPasswordReducer from '../reducers/resetPassword';


const appReducer = combineReducers({
  signedInUser: AuthenticatedUserReducer,
  userGroups: UserGroupsReducer,
  selectedGroup: SelectedGroupReducer,
  groupMembers: GroupMembersReducer,
  groupMessages: GroupMessagesReducer,
  searchResult: SearchUserReducer,
  googleAuthStatus: GoogleAuthStatusReducer,
  newGroup: NewGroupReducer,
  archivedMessage: ArchivedMessageReducer,
  resetPassword: ResetPasswordReducer
});


const rootReducer = (state, action) => {
  if (action.type === 'DELETE_CURRENT_USER') {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
