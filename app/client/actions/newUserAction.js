import axios from 'axios';

export function submitNewUser(identifier) {
  const groupId = identifier.groupId;
  const request = axios.post(`/api/group/${groupId}/user`, identifier);

  return (dispatch) => {
    return request;
  };
}
