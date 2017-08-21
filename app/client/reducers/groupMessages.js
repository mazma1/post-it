import {
  SET_GROUP_MESSAGES,
  FETCHING_GROUP_MESSAGES,
  FETCH_GROUP_MESSAGES_FAILURE } from '../actions/types';
import initialState from '../../utils/initialState';

export default (state = initialState.groupMessages, action = {}) => {
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

    case FETCH_GROUP_MESSAGES_FAILURE:
      return {
        isLoading: false,
        error: action.ex
      };

    default:
      return state;
  }
};