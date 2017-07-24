import { SET_GROUP_MESSAGES, POST_NEW_MESSAGE } from '../actions/types';

export default (state = [], action = {}) => {
  switch (action.type) {
    case SET_GROUP_MESSAGES:
      return action.messages;

    case POST_NEW_MESSAGE:
      return [
        ...state,
        action.message
      ];

    default:
      return state;
  }
};
