import axios from 'axios';
import {
  SET_GROUP_MESSAGES,
  FETCHING_GROUP_MESSAGES,
  FETCH_GROUP_MESSAGES_FAILURE } from '../actions/types';


export function getGroupMessagesCount(groupId) {
  const request = axios.get(`/api/v1/groups/${groupId}/messages`);

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
  return (dispatch) => {
    dispatch(fetchingGroupMessages({}));
    return axios.get(`/api/v1/groups/${groupId}/messages`)
      .then((res) => {
        const { messages } = res.data;
        dispatch(setGroupMessages(messages));
      }).catch((error) => {
        dispatch(fetchGroupMessagesFailure(error));
      });
  };
}

export function updateReadStatus(messageParams) {
  const { groupId, messageId } = messageParams;
  const request = axios.patch(`/api/v1/groups/${messageId}/read`, messageParams);

  return dispatch => request.then((res) => {
    dispatch(getGroupMessages(groupId));
  });
}

export function archiveMessage({ messageId }) {
  const request = axios.patch(`/api/v1/groups/${messageId}/archive`, messageId);

  return dispatch => request;
}

export function postNewMessage({ priority, groupId, message, readBy }) {
  const reqBody = { priority, groupId, message, readBy };
  const request = axios.post(`/api/v1/groups/${groupId}/message`, reqBody);

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
