import axios from 'axios';
import isEmpty from 'lodash/isEmpty';
import { SET_SELECTED_GROUP } from '../actions/types';

export function setSelectedGroupMsgs(groupDetails) {
  return {
    type: SET_SELECTED_GROUP,
    selectedGroup: groupDetails
  };
}

export function setSelectedGroup(group) {
  if (isEmpty(group)) {
    return (dispatch) => {
      dispatch(setSelectedGroupMsgs({}));
    };
  }

  const groupId = group.id;
  const request = axios.get(`/api/group/${groupId}/messages`);

  return (dispatch) => {
    return request.then((res) => {
      const messages = res.data;
      // const messagesObj = mapKeys(res.data, 'message_id');
      dispatch(setSelectedGroupMsgs({ id: group.id, name: group.name, messages }));
    });
  };
}
