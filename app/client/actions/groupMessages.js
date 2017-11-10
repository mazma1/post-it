import axios from 'axios';
import toastr from 'toastr';
import {
  ADD_NEW_MESSAGE,
  SET_GROUP_MESSAGES,
  SET_ARCHIVED_MESSAGE,
  UPDATE_ARCHIVED_MESSSGE,
  FETCHING_GROUP_MESSAGES,
  FETCH_GROUP_MESSAGES_FAILURE } from '../actions/types';


/**
   * Makes request to get the messages of a group
   *
   * @param {number} groupId - Id of group whose messages are being fetched
   *
   * @returns {promise} An array of the messages in a specified group
   */
export function getGroupMessages(groupId) {
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
   * @param {object} message - Details of new message posted to a group
   *
   * @returns {object} Action with type ADD_NEW_MESSAGE and message to be added
   * to the store
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
   * @param {string} priority - Priority of message to be posted
   * @param {number} groupId - Id of group the message belongs to
   * @param {string} message - Message being posted
   * @param {string} readBy - Users that have read the message
   *
   * @returns {promise} An object containing details of the new message posted
   */
export function postNewMessage({ priority, groupId, message, readBy }) {
  const reqBody = { priority, groupId, message, readBy };
  return dispatch => axios.post(`/api/v1/groups/${groupId}/message`, reqBody)
    .then((res) => {
      const newMessage = res.data;
      dispatch(addNewMessage(newMessage));
    })
    .catch(error => toastr.error(`Ooops! ${error.response.data.error}`));
}


/**
   * Makes request to update the users that have read a message
   *
   * @param {object} messageDetails - Details of message to be updated
   *
   * @returns {promise} A message that indicates that the user who has read a
   * message was updated successfully
   */
export function updateReadStatus(messageDetails) {
  const { groupId, messageId } = messageDetails;
  return dispatch => axios.patch(
    `/api/v1/messages/${messageId}/read`, messageDetails
  ).then(res => dispatch(getGroupMessages(groupId)))
    .catch(error => toastr.error(`Ooops! ${error.response.data.error}`));
}


/**
  * Updates the store with details of the archived message
  *
  * @param {object} archivedMessage details of the message archived by a user
  *
  * @returns {object} Action that updates the store with the details of
  * the archived message
  */
export function setArchivedMessage(archivedMessage) {
  return {
    type: SET_ARCHIVED_MESSAGE,
    archivedMessage
  };
}


/**
  * Updates the messages in the store with messages that contain the updated
  * archived message
  *
  * @returns {object} Action that contains the details of the updated message
  */
export function updateArchivedMessage(updatedMessages) {
  return {
    type: UPDATE_ARCHIVED_MESSSGE,
    updatedMessages
  };
}


/**
   * Makes request to archive a message in a group
   *
   * @param {number} messageId - Id of message to be archived
   *
   * @returns {response} request response
   */
export function archiveMessage({ messageId }) {
  return dispatch => axios.patch(
    `/api/v1/messages/${messageId}/archive`,
    messageId
  ).then((res) => {
    const { archivedMessage } = res.data;
    dispatch(setArchivedMessage(archivedMessage));
  }).catch((error) => {
    toastr.error('Unable to archive message, please try again');
  });
}


 /**
   * Informs reducer that request to fetch group messages has begun
   *
   * @returns {object} Action with type FETCHING_GROUP_MESSAGES
   */
export function fetchingGroupMessages() {
  return {
    type: FETCHING_GROUP_MESSAGES
  };
}


/**
   * Informs reducers that the request to fetch a group's messages finished
   * successfully
   *
   * @param {object} messages - Array of messages that belong to a specified
   * group
   *
   * @returns {object} Action that updates the store with the returned messages
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
   * @param {object} error - Error returned from failed request
   *
   * @returns {object} Action that sends the returned error to the store
   */
export function fetchGroupMessagesFailure(error) {
  return {
    type: FETCH_GROUP_MESSAGES_FAILURE,
    error
  };
}
