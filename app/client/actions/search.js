import axios from 'axios';
import {
  RESET_SEARCH,
  FETCH_SEARCHED_USER,
  FETCH_SEARCHED_USER_SUCCESS,
  FETCH_SEARCHED_USER_FAILURE } from '../actions/types';


/**
  * Makes request to search for a user using provided search query
  *
  * @param {string} searchQuery - Search query
  * @param {number} offset - Number of records before beginning to return rows
  * @param {number} limit - Maximum number of records to be returned for
  * each page
  *
  * @returns {promise} An object that contains the users found for the
  * specified offset and limit, and the pagination metadata
  */
export function searchUser({ searchQuery, offset = 0, limit = 1 }) {
  return dispatch => axios.get(
    `/api/v1/users/search?q=${searchQuery}&limit=${limit}&offset=${offset}`
  ).then((res) => {
    const { users, pagination } = res.data;
    const searchResult = {
      users,
      pagination
    };
    dispatch(fetchSearchedUserSuccess(searchResult));
  })
  .catch((error) => {
    dispatch(fetchSearchedUserFailure(error.response.data.error));
  });
}


/**
  * Informs reducer that request to search for users has begun
  *
  * @returns {object} Action with type FETCH_SEARCHED_USER
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
  * @param {array} searchResult - Array of users that match a search query
  *
  * @returns {object} Action that updates the store with the search result
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
  * @param {object} error - Error returned from failed request
  *
  * @returns {object} Action that sends the request error to the store
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
  * @returns {object} Action with type RESET_SEARCH
  */
export function resetSearch() {
  return {
    type: RESET_SEARCH
  };
}
