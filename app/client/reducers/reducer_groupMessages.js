import { SET_GROUP_MESSAGES, POST_NEW_MESSAGE } from '../actions/types';

const initialState = {
  isLoading: true,
  messages: []
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
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
