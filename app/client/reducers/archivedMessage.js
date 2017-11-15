import { SET_ARCHIVED_MESSAGE } from '../actions/types';


/**
  * Reducer that updates the details of an archived message
  *
  * @param {object} state - The old state of the application
  * @param {object} action - The dispatched action
  *
  * @returns {object} The new application state
  */
export default (state = [], action = {}) => {
  switch (action.type) {
    case SET_ARCHIVED_MESSAGE:
      return [action.archivedMessage];

    default:
      return state;
  }
};
