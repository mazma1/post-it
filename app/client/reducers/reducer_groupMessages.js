import { SET_GROUP_MESSAGES, FETCHING_GROUP_MESSAGES } from '../actions/types';

const initialState = {
  isLoading: false,
  messages: []
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case FETCHING_GROUP_MESSAGES:
      return {
        isLoading: true,
        messages: action.messages
      };

    case SET_GROUP_MESSAGES:
      return {
        isLoading: false,
        messages: action.messages
      };

    // case POST_NEW_MESSAGE:
    //   return [
    //     ...state,
    //     action.message
    //   ];

    default:
      return state;
  }
};
