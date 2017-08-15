import axios from 'axios';
import last from 'lodash/last';
import { setSelectedGroup } from '../actions/setSelectedGroupAction';
import { getGroupMessages } from '../actions/groupMessagesAction';
import { getGroupMembers } from '../actions/groupMembersAction';
import { SET_USER_GROUPS, FETCHING_USER_GROUPS, FETCH_USER_GROUPS_FAILURE } from '../actions/types';

export function getUserGroups(userId) {
  const request = axios.get(`/api/user/${userId}/groups`); // Returns a response

  return (dispatch) => {
    dispatch(fetchingUserGroups({}));

    return request.then((res) => {
      const group = res.data.group;
      dispatch(setUserGroups(group));
    }).catch((ex) => {
      dispatch(fetchUserGroupsFailure(ex));
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

export function fetchUserGroupsFailure(ex) {
  return {
    type: FETCH_USER_GROUPS_FAILURE,
    ex
  };
}

export function submitNewGroup(group_name) {
  const userId = group_name.userId;
  const request = axios.post('/api/group', group_name);

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
      const group = res.data.group;
      const lastGroup = last(group);
      dispatch(setUserGroups(group));
      dispatch(setSelectedGroup(lastGroup));
      dispatch(getGroupMessages(lastGroup.id));
      dispatch(getGroupMembers(lastGroup.id));
    });
  };
}


