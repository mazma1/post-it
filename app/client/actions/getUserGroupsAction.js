import axios from 'axios';
import { SET_USER_GROUPS } from '../actions/types';

export function setUserGroups(group) {
  return {
    type: SET_USER_GROUPS,
    group
  };
}

export function getUserGroups(userId) {
  const request = axios.get(`/api/user/${userId}/groups`); // Returns a response

  return (dispatch) => {
    return request.then((res) => {
      const group = res.data.group;
      dispatch(setUserGroups(group));
    });
  };
}
