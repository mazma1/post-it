import { SET_SELECTED_GROUP } from '../actions/types';

export default (state = {}, action = {}) => {
  switch (action.type) {
    case SET_SELECTED_GROUP:
      return action.selectedGroup;

    default:
      return state;
  }
};
