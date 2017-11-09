import axios from 'axios';
import {
  SET_GROUP_MESSAGES,
  SET_ARCHIVED_MESSAGE,
  UPDATE_ARCHIVED_MESSSGE,
  FETCHING_GROUP_MESSAGES,
  FETCH_GROUP_MESSAGES_FAILURE,
  ADD_NEW_MESSAGE } from '../actions/types';


/**
   * Makes request to get the messages of a group
   *
   * @param {number} groupId group id
   *
   * @returns {response} request response
   */
export function getGroupMessages(groupId) {
  // if (!groupId) {
  //   return dispatch => dispatch(setGroupMessages({}));
  // }
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

/**
   * Informs reducers that the request to post new message finished
   * successfully
   *
   * @param {object} message details of new message
   *
   * @returns {action} action type and payload
   */
export function addNewMessage(message) {
  return {
    type: ADD_NEW_MESSAGE,
    message
  };
}

/**
   * Makes request to post a new message to the database
   *
   * @param {string} priority message priority
   * @param {number} groupId group id
   * @param {string} message message being posted
   * @param {string} readBy users that have read the message
   *
   * @returns {response} request response
   */
export function postNewMessage({ priority, groupId, message, readBy }) {
  const reqBody = { priority, groupId, message, readBy };
  return dispatch => axios.post(`/api/v1/groups/${groupId}/message`, reqBody)
    .then((res) => {
      const newMessage = res.data;
      dispatch(addNewMessage(newMessage));
    })
    .catch(error => (error));
}


/**
   * Makes request to get the messages of a group for count
   *
   * @param {number} groupId group id
   *
   * @returns {response} request response
   */
export function getGroupMessagesCount(groupId) {
  return () => axios.get(`/api/v1/groups/${groupId}/messages`)
    .catch(error => (error));
}


/**
   * Makes request to update the users that have read a message
   *
   * @param {object} messageParams details of message to be updated
   *
   * @returns {response} request response
   */
export function updateReadStatus(messageParams) {
  const { groupId, messageId } = messageParams;
  return dispatch => axios.patch(`/api/v1/messages/${messageId}/read`, messageParams)
    .then((res) => {
      dispatch(getGroupMessages(groupId));
    })
    .catch(error => (error));
}

/**
  * Informs reducer that request to archive a message finished successfully
  *
  * @returns {action} action type and payload
  */
export function setArchivedMessage(archivedMessage) {
  return {
    type: SET_ARCHIVED_MESSAGE,
    archivedMessage
  };
}

export function updateArchivedMessage(updatedMessages) {
  return {
    type: UPDATE_ARCHIVED_MESSSGE,
    updatedMessages
  };
}

/**
   * Makes request to archive a message in a group
   *
   * @param {number} messageId id of message to be archived
   *
   * @returns {response} request response
   */
export function archiveMessage({ messageId }) {
  return dispatch => axios.patch(`/api/v1/messages/${messageId}/archive`, messageId)
    .then((res) => {
      const { archivedMessage } = res.data;
      dispatch(setArchivedMessage(archivedMessage));
    })
    .catch(error => (error));
}


 /**
   * Informs reducer that request to fetch group messages has begun
   *
   * @returns {action} action type and payload
   */
export function fetchingGroupMessages() {
  return {
    type: FETCHING_GROUP_MESSAGES,
    messages: []
  };
}


/**
   * Informs reducers that the request to fetch a group's messages finished
   * successfully
   *
   * @param {object} membersDetails details of members
   *
   * @returns {action} action type and payload
   */
export function setGroupMessages(messages) {
  return {
    type: SET_GROUP_MESSAGES,
    messages
  };
}


/**
   * Informs reducers that the request to fetch group messages failed
   *
   * @param {object} error error returned from failed request
   *
   * @returns {action} action type and payload
   */
export function fetchGroupMessagesFailure(error) {
  return {
    type: FETCH_GROUP_MESSAGES_FAILURE,
    error
  };
}
