import { SET_SELECTED_GROUP } from '../actions/types';


/**
  * Reducer that handles the selected group action
  *
  * @param {object} state - The old state of the application
  * @param {object} action - The dispatched action
  *
  * @returns {object} The new application state
  */
export default (state = {}, action = {}) => {
  switch (action.type) {
    case SET_SELECTED_GROUP:
      return action.selectedGroup;

    default:
      return state;
  }
};
