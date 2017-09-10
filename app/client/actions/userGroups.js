import axios from 'axios';
import last from 'lodash/last';
import { setSelectedGroup } from '../actions/setSelectedGroup';
import { getGroupMessages } from '../actions/groupMessages';
import { getGroupMembers } from '../actions/groupMembers';
import { SET_USER_GROUPS, FETCHING_USER_GROUPS, FETCH_USER_GROUPS_FAILURE } from '../actions/types';

export function getUserGroups(userId) {
  const request = axios.get(`/api/user/${userId}/groups`); // Returns a response

  return (dispatch) => {
    dispatch(fetchingUserGroups());
    return request.then((res) => {
      const groups = res.data.groups;
      dispatch(setUserGroups(groups));
    }).catch((error) => {
      dispatch(fetchUserGroupsFailure(error));
    });
  };
}

export function fetchingUserGroups() {
  return {
    type: FETCHING_USER_GROUPS,
    group: []
  };
}

export function setUserGroups(group) {
  return {
    type: SET_USER_GROUPS,
    group
  };
}

export function fetchUserGroupsFailure(error) {
  return {
    type: FETCH_USER_GROUPS_FAILURE,
    error
  };
}

export function submitNewGroup({ groupName, userId }) {
  const reqBody = { groupName };
  const request = axios.post('/api/v1/groups', reqBody);

  return (dispatch) => {
    return request.then((res) => {
      dispatch(setNewGroupActive(userId));
    });
  };
}

export function setNewGroupActive(userId) {
  const request = axios.get(`/api/user/${userId}/groups`);

  return (dispatch) => {
    return request.then((res) => {
      const groups = res.data.groups;
      const lastGroup = last(groups);
      dispatch(setUserGroups(groups));
      dispatch(setSelectedGroup(lastGroup));
      dispatch(getGroupMessages(lastGroup.id));
      dispatch(getGroupMembers(lastGroup.id));
    });
  };
}
