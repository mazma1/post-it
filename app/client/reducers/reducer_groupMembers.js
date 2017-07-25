import { SET_GROUP_MEMBERS, FETCHING_GROUP_MEMBERS } from '../actions/types';

const initialState = {
  isLoading: false,
  members: []
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case FETCHING_GROUP_MEMBERS:
      return {
        isLoading: true,
        members: action.members
      };

    case SET_GROUP_MEMBERS:
      return {
        isLoading: false,
        group_name: action.membersDetails.group_name,
        members: action.membersDetails.members
      };

    default:
      return state;
  }
};
