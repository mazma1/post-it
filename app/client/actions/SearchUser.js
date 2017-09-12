import axios from 'axios';
import {
  FETCH_SEARCHED_USER,
  FETCH_SEARCHED_USER_SUCCESS,
  FETCH_SEARCHED_USER_FAILURE,
  RESET_SEARCH } from '../actions/types';


/**
   * Makes request to search for a user using provided search query

   * @param {string} searchQuery search query

   * @returns {response} request response
   */
export function searchUser({ searchQuery }) {
  return (dispatch) => {
    dispatch(fetchingSearchedUser());
    return axios.get(`/api/v1/users/search?q=${searchQuery}`)
      .then((res) => {
        const searchResult = res.data.users;
        dispatch(fetchSearchedUserSuccess(searchResult));
      })
      .catch((error) => {
        dispatch(fetchSearchedUserFailure(error.response.data.error));
      });
  };
}


/**
   * Informs reducer that request to search for users has begun
   *
   * @returns {action} action type
   */
export function fetchingSearchedUser() {
  return {
    type: FETCH_SEARCHED_USER
  };
}


/**
   * Informs reducers that the request to search for users
   * finished successfully
   *
   * @param {array} searchResult users that match a search query
   *
   * @returns {action} action type and payload
   */
export function fetchSearchedUserSuccess(searchResult) {
  return {
    type: FETCH_SEARCHED_USER_SUCCESS,
    searchResult
  };
}


/**
   * Informs reducers that the request to search for users failed
   *
   * @param {object} error error returned from failed request
   *
   * @returns {action} action type and payload
   */
export function fetchSearchedUserFailure(error) {
  return {
    type: FETCH_SEARCHED_USER_FAILURE,
    error
  };
}


/**
   * Deletes previous search results
   *
   * @returns {action} action type
   */
export function resetSearch() {
  return {
    type: RESET_SEARCH
  };
}
