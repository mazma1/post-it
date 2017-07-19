import { combineReducers } from 'redux';
import FlashMessageReducer from '../reducers/reducer_flashMessage';
import AuthenticatedUserReducer from '../reducers/reducer_authenticatedUser';
import UserGroupsReducer from '../reducers/reducer_userGroups';
import SelectedGroupReducer from '../reducers/reducer_selectedGroup';

// Mapping of our state
const rootReducer = combineReducers({
  flashMessages: FlashMessageReducer,
  signedInUser: AuthenticatedUserReducer,
  userGroups: UserGroupsReducer,
  selectedGroup: SelectedGroupReducer
});

export default rootReducer;
