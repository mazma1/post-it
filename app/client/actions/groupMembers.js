import axios from 'axios';
import { SET_GROUP_MEMBERS, FETCHING_GROUP_MEMBERS } from '../actions/types';


/**
   * Makes request to get the members of a group
   *
   * @param {number} groupId group id
   *
   * @returns {response} request response
   */
export function getGroupMembers(groupId) {
  // if (!groupId) {
  //   return dispatch => dispatch(setGroupMembers({}));
  // }
  return (dispatch) => {
    dispatch(fetchingGroupMembers);
    return axios.get(`/api/v1/groups/${groupId}/members`)
      .then((res) => {
        const membersDetails = res.data;
        dispatch(setGroupMembers(membersDetails));
      })
      .catch(error => (error));
  };
}


/**
   * Makes request to add a user to a group
   *
   * @param {number} groupId group id
   * @param {string} identifier username/email of user to be added to group
   *
   * @returns {response} request response
   */
export function submitNewUser({ groupId, identifier }) {
  const reqBody = { identifier };
  return dispatch => axios.post(`/api/v1/groups/${groupId}/user`, reqBody)
    .then((res) => {
      dispatch(getGroupMembers(groupId));
    });
}


 /**
   * Informs reducer that request to fetch group members has begun
   *
   * @returns {action} action type and payload
   */
export function fetchingGroupMembers() {
  return {
    type: FETCHING_GROUP_MEMBERS,
    members: []
  };
}

/**
   * Informs reducers that the request to fetch a group's members finished
   * successfully
   *
   * @param {object} membersDetails details of members
   *
   * @returns {action} action type and payload
   */
export function setGroupMembers(membersDetails) {
  return {
    type: SET_GROUP_MEMBERS,
    membersDetails
  };
}
