import axios from 'axios';
import last from 'lodash/last';
import setSelectedGroup from '../actions/setSelectedGroup';
import { getGroupMessages } from '../actions/groupMessages';
import { getGroupMembers } from '../actions/groupMembers';
import {
  SET_USER_GROUPS,
  FETCHING_USER_GROUPS,
  FETCH_USER_GROUPS_FAILURE,
  SUBMIT_NEW_GROUP_FAILURE } from '../actions/types';


  /**
   * Fetches the groups a user belongs to
   *
   * @param {integer} userId authenticated user's id
   *
   * @returns {response} request response
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
   * Informs reducer that request to fetch a user's groups has begun
   *
   * @returns {action} action type and payload
   */
export function fetchingUserGroups() {
  return {
    type: FETCHING_USER_GROUPS,
    group: []
  };
}


/**
   * Informs reducers that the request to fetch a user's groups
   * finished successfully
   *
   * @param {array} groups user's groups returned from API request
   *
   * @returns {action} action type and payload
   */
export function setUserGroups(groups) {
  return {
    type: SET_USER_GROUPS,
    groups
  };
}


/**
   * Informs reducers that the request to fetch a user's groups failed
   *
   * @param {object} error error returned from failed request
   *
   * @returns {action} action type and payload
   */
export function fetchUserGroupsFailure(error) {
  return {
    type: FETCH_USER_GROUPS_FAILURE,
    error
  };
}


/**
   * Posts a new group to the database
   *
   * @param {string} groupName mane of new group
   * @param {integer} userId id of user who created the group
   *
   * @returns {response} request response
   */
export function submitNewGroup({ groupName, userId }) {
  const reqBody = { groupName };
  return dispatch => axios.post('/api/v1/groups', reqBody)
    .then((res) => {
      dispatch(setNewGroupActive(userId));
    });
}


/**
   * Sets a newly created group as active
   *
   * @param {integer} userId id of authenticated user
   *
   * @returns {response} request response
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
   * Informs reducers that the request to submit a new group failed
   *
   * @param {object} error error returned from failed request
   *
   * @returns {action} action type and payload
   */
export function submittingNewGroupFailure(error) {
  return {
    type: SUBMIT_NEW_GROUP_FAILURE,
    error
  };
}
