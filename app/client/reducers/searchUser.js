import { FETCH_SEARCHED_USER,
  FETCH_SEARCHED_USER_SUCCESS,
  FETCH_SEARCHED_USER_FAILURE,
  RESET_SEARCH } from '../actions/types';

export default (state = {}, action = {}) => {
  switch (action.type) {
    case FETCH_SEARCHED_USER:
      return {
        ...state,
        isLoading: true
      };

    case FETCH_SEARCHED_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        users: action.searchResult
      };

    case FETCH_SEARCHED_USER_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };

    case RESET_SEARCH:
      return {
        searchResult: {}
      };

    default:
      return state;
  }
};
