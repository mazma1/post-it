import { combineReducers } from 'redux';
import FlashMessageReducer from '../reducers/reducer_flashMessage';
import AuthenticatedUserReducer from '../reducers/reducer_authenticatedUser';

// Mapping of our state
const rootReducer = combineReducers({
  flashMessages: FlashMessageReducer,
  signedInUser: AuthenticatedUserReducer
});

export default rootReducer;
