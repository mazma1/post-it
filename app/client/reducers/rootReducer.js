import { combineReducers } from 'redux';
import AuthenticatedUserReducer from '../reducers/reducer_authenticatedUser';

// Mapping of our state
const rootReducer = combineReducers({
  signedInUser: AuthenticatedUserReducer
});

export default rootReducer;
