import axios from 'axios';
import { SET_GROUP_MEMBERS, FETCHING_GROUP_MEMBERS } from '../actions/types';

export function setGroupMembers(membersDetails) {
  return {
    type: SET_GROUP_MEMBERS,
    membersDetails
  };
}

export function fetchingGroupMembers() {
  return {
    type: FETCHING_GROUP_MEMBERS,
    members: []
  };
}

export function submitNewUser(identifier) {
  const groupId = identifier.groupId;
  const request = axios.post(`/api/group/${groupId}/user`, identifier);

  return (dispatch) => {
    return request.then((res) => {
      dispatch(getGroupMembers(groupId));
    });
  };
}

export function getGroupMembers(groupId) {
  if (!groupId) {
    return (dispatch) => {
      dispatch(setGroupMembers({}));
    };
  }

  const request = axios.get(`/api/group/${groupId}/members`);

  return (dispatch) => {
    dispatch(fetchingGroupMembers);

    return request.then((res) => {
      const membersDetails = res.data;
      dispatch(setGroupMembers(membersDetails));
    });
  };
}