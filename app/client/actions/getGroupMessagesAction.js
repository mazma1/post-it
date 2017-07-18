import axios from 'axios';
import mapKeys from 'lodash/mapKeys';
import { SET_GROUP_MESSAGES } from '../actions/types';

export function setGroupMessages(messages) {
  return {
    type: SET_GROUP_MESSAGES,
    messages
  };
}

export function getGroupMessages(groupId) {
  const request = axios.get(`/api/group/${groupId}/messages`); // Returns a response

  return (dispatch) => {
    return request.then((res) => {
      // const messagesObj = mapKeys(res.data, 'message_id');
      dispatch(setGroupMessages(res.data));
    });
  };
}

export function noGroupMessages() {
  return (dispatch) => {
    dispatch(setGroupMessages([]));
  };
}
