import { combineReducers } from 'redux';
import FlashMessageReducer from '../reducers/reducer_flashMessage';
import AuthenticatedUserReducer from '../reducers/reducer_authenticatedUser';
import UserGroupsReducer from '../reducers/reducer_userGroups';

// Mapping of our state
const rootReducer = combineReducers({
  flashMessages: FlashMessageReducer,
  signedInUser: AuthenticatedUserReducer,
  userGroups: UserGroupsReducer
});

export default rootReducer;
