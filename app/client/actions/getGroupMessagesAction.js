import axios from 'axios';
import { SET_GROUP_MESSAGES } from '../actions/types';

export function setGroupMessages(messages) {
  return {
    type: SET_GROUP_MESSAGES,
    messages
  };
}

export function getGroupMessages(groupId) {
  if (!groupId) {
    return (dispatch) => {
      dispatch(setGroupMessages({}));
    };
  }

  const request = axios.get(`/api/group/${groupId}/messages`); // Returns a response

  return (dispatch) => {
    return request.then((res) => {
      const messages = res.data;
      dispatch(setGroupMessages(messages));
    });
  };
}

