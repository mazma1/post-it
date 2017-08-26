import axios from 'axios';
import {
  FETCH_SEARCHED_USER,
  FETCH_SEARCHED_USER_SUCCESS,
  FETCH_SEARCHED_USER_FAILURE,
  RESET_SEARCH
} from '../actions/types';

export function searchUser(searchKeyword) {
  const request = axios.post('/api/user/search', searchKeyword); // Returns a response

  return (dispatch) => {
    dispatch(fetchingSearchedUser());
    return request.then((res) => {
      const searchResult = res.data.users;
      dispatch(fetchSearchedUserSuccess(searchResult));
    }).catch(error => {
      dispatch(fetchSearchedUserFailure(error.response.data.error));
    });
  };
}

export function fetchingSearchedUser() {
  return {
    type: FETCH_SEARCHED_USER
  };
}

export function fetchSearchedUserSuccess(result) {
  return {
    type: FETCH_SEARCHED_USER_SUCCESS,
    result
  };
}

export function fetchSearchedUserFailure(error) {
  return {
    type: FETCH_SEARCHED_USER_FAILURE,
    error
  };
}

export function resetSearch() {
  return {
    type: RESET_SEARCH
  };
}
