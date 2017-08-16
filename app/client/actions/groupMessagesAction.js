import axios from 'axios';
import {
  SET_GROUP_MESSAGES,
  FETCHING_GROUP_MESSAGES,
  FETCH_GROUP_MESSAGES_FAILURE } from '../actions/types';


export function getGroupMessagesForCount(groupId) {
  const request = axios.get(`/api/group/${groupId}/messages`); // Returns a promise

  return (dispatch) => {
    return request;
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
    dispatch(fetchingGroupMessages({}));

    return request.then((res) => {
      const messages = res.data;
      dispatch(setGroupMessages(messages));
    }).catch((ex) => {
      dispatch(fetchGroupMessagesFailure(ex));
    });
  };
}

export function updateReadStatus(messageDetails) {
  const groupId = messageDetails.group_id;
  const request = axios.patch('/api/group/message/read', messageDetails);

  return dispatch => request.then((res) => {
    if (groupId) {
      dispatch(getGroupMessages(groupId));
    }
  });
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

export function fetchingGroupMessages() {
  return {
    type: FETCHING_GROUP_MESSAGES,
    messages: []
  };
}

export function setGroupMessages(messages) {
  return {
    type: SET_GROUP_MESSAGES,
    messages
  };
}

export function fetchGroupMessagesFailure(ex) {
  return {
    type: FETCH_GROUP_MESSAGES_FAILURE,
    ex
  };
}
