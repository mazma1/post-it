import { combineReducers } from 'redux';
import FlashMessageReducer from '../reducers/reducer_flashMessage';
import AuthenticatedUserReducer from '../reducers/reducer_authenticatedUser';
import UserGroupsReducer from '../reducers/reducer_userGroups';
import SelectedGroupReducer from '../reducers/reducer_selectedGroup';
import GroupMessagesReducer from '../reducers/reducer_groupMessages';

// Mapping of our state
const rootReducer = combineReducers({
  flashMessages: FlashMessageReducer,
  signedInUser: AuthenticatedUserReducer,
  userGroups: UserGroupsReducer,
  selectedGroup: SelectedGroupReducer,
  groupMessages: GroupMessagesReducer
});

export default rootReducer;
