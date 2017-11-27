import axios from 'axios';
import toastr from 'toastr';
import { SET_GROUP_MEMBERS, FETCHING_GROUP_MEMBERS } from '../actions/types';


/**
   * Makes request to get the members of a group
   *
   * @param {number} groupId - Id of group whose members are being fetched
   *
   * @returns {promise} An array of the members in a specified group
   */
export function getGroupMembers(groupId) {
  return (dispatch) => {
    dispatch(fetchingGroupMembers);
    return axios.get(`/api/v1/groups/${groupId}/members`)
      .then((res) => {
        const membersDetails = res.data;
        dispatch(setGroupMembers(membersDetails));
      })
      .catch(error => toastr.error(`Ooops! ${error.response.data.error}`));
  };
}


/**
   * Makes request to add a user to a group
   *
   * @param {number} groupId - Id of group user will be added to
   * @param {string} identifier - Username/email of user to be added to group
   *
   * @returns {promise} A message that indicates that user was successfully
   * added to group
   */
export function submitNewUser({ groupId, identifier }) {
  return dispatch => axios.post(
    `/api/v1/groups/${groupId}/user`, { identifier }
  ).then(() => {
    dispatch(getGroupMembers(groupId));
  });
}


 /**
   * Informs reducer that request to fetch group members has begun
   *
   * @returns {object} Action with type FETCHING_GROUP_MEMBERS
   */
export function fetchingGroupMembers() {
  return {
    type: FETCHING_GROUP_MEMBERS
  };
}

/**
   * Informs reducers that the request to fetch a group's members finished
   * successfully
   *
   * @param {object} membersDetails details of members to add to redux store
   *
   * @returns {object} Action that updates the store with the members in a
   * specified group
   */
export function setGroupMembers(membersDetails) {
  return {
    type: SET_GROUP_MEMBERS,
    membersDetails
  };
}
