import { SET_ARCHIVED_MESSAGE } from '../actions/types';

export default (state = [], action = {}) => {
  switch (action.type) {
    case SET_ARCHIVED_MESSAGE:
      return [action.archivedMessage];

    default:
      return state;
  }
};
