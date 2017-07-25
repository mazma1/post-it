import axios from 'axios';
import { SET_GROUP_MESSAGES } from '../actions/types';

export function setGroupMessages(messages) {
  return {
    type: SET_GROUP_MESSAGES,
    messages
  };
}

export function postNewMessage(message) {
  const groupId = message.group_id;
  const request = axios.post(`/api/group/${groupId}/message`, message);

  return (dispatch) => {
    return request.then((res) => {
      dispatch(getGroupMessages(groupId));
    });
  };
}

export function getGroupMessages(groupId) {
  if (!groupId) {
    return (dispatch) => {
      dispatch(setGroupMessages({}));
    };
  }

  const request = axios.get(`/api/group/${groupId}/messages`); // Returns a promise

  return (dispatch) => {
    return request.then((res) => {
      const messages = res.data;
      dispatch(setGroupMessages(messages));
    });
  };
}
