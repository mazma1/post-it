import axios from 'axios';
import last from 'lodash/last';
import setSelectedGroup from '../actions/setSelectedGroup';
import { getGroupMessages } from '../actions/groupMessages';
import { getGroupMembers } from '../actions/groupMembers';
import {
  SET_NEW_GROUP,
  SET_USER_GROUPS,
  FETCHING_USER_GROUPS,
  FETCH_USER_GROUPS_FAILURE,
  SUBMIT_NEW_GROUP_FAILURE } from '../actions/types';


/**
   * Informs reducers that the request to create a new group finished
   * successfully
   *
   * @param {object} groupDetails - Details of new group created
   *
   * @returns {object} Action that sends the newly created group to the store
   */
export function setNewGroup(groupDetails) {
  return {
    type: SET_NEW_GROUP,
    groupDetails
  };
}


/**
   * Informs reducer that request to fetch a user's groups has begun
   *
   * @returns {action} Action with type FETCHING_USER_GROUPS
   */
export function fetchingUserGroups() {
  return {
    type: FETCHING_USER_GROUPS
  };
}


/**
   * Informs reducers that the request to fetch a user's groups
   * finished successfully
   *
   * @param {array} groups - User's groups returned from the API call
   *
   * @returns {object} Action that sends the user's groups to the store
   */
export function setUserGroups(groups) {
  return {
    type: SET_USER_GROUPS,
    groups
  };
}


/**
   * Informs reducers that the request to submit a new group failed
   *
   * @param {object} error - Error returned from failed request
   *
   * @returns {object} Action that sends the request error to the store
   */
export function submittingNewGroupFailure(error) {
  return {
    type: SUBMIT_NEW_GROUP_FAILURE,
    error
  };
}


/**
   * Informs reducers that the request to fetch a user's groups failed
   *
   * @param {object} error - Error returned from failed request
   *
   * @returns {object} Action that sends the request error to the store
   */
export function fetchUserGroupsFailure(error) {
  return {
    type: FETCH_USER_GROUPS_FAILURE,
    error
  };
}


/**
 * Fetches the groups a user belongs to
 *
 * @param {number} userId - Authenticated user's id
 *
 * @returns {promise} Array of groups a user belongs to
 */
export function getUserGroups(userId) {
  return (dispatch) => {
    dispatch(fetchingUserGroups());
    return axios.get(`/api/v1/users/${userId}/groups`)
      .then((res) => {
        const { groups } = res.data;
        dispatch(setUserGroups(groups));
      })
      .catch((error) => {
        dispatch(fetchUserGroupsFailure(error));
      });
  };
}


/**
   * Sets a newly created group as the active group
   *
   * @param {number} userId - Id of the currently signed in user
   *
   * @returns {promise} Groups that the currently signed in user belongs to
   */
export function setNewGroupActive(userId) {
  return dispatch => axios.get(`/api/v1/users/${userId}/groups`)
    .then((res) => {
      const { groups } = res.data;
      const lastGroup = last(groups);
      dispatch(setUserGroups(groups));
      dispatch(setSelectedGroup(lastGroup));
      dispatch(getGroupMessages(lastGroup.id));
      dispatch(getGroupMembers(lastGroup.id));
    })
    .catch(error => (error));
}


/**
   * Posts a new group to the database
   *
   * @param {string} groupName - Name of new group
   * @param {number} userId - Id of user who created the group
   *
   * @returns {promise} Details of the newly created groups
   */
export function submitNewGroup({ groupName, userId }) {
  const reqBody = { groupName };
  return dispatch => axios.post('/api/v1/groups', reqBody)
    .then((res) => {
      const groupDetails = res.data;
      dispatch(setNewGroup(groupDetails));
      dispatch(setNewGroupActive(userId));
    });
}

