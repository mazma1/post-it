import axios from 'axios';
import last from 'lodash/last';
import { setSelectedGroup } from '../actions/setSelectedGroupAction';
import { SET_USER_GROUPS } from '../actions/types';

export function getUserGroups(userId) {
  const request = axios.get(`/api/user/${userId}/groups`); // Returns a response

  return (dispatch) => {
    return request.then((res) => {
      const group = res.data.group;
      dispatch(setUserGroups(group));
    });
  };
}

export function setUserGroups(group) {
  return {
    type: SET_USER_GROUPS,
    group
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
      dispatch(setUserGroups(group));
      dispatch(setSelectedGroup(last(group)));
    });
  };
}


