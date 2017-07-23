import { SET_GROUP_MEMBERS } from '../actions/types';

export default (state = [], action = {}) => {
  switch (action.type) {
    case SET_GROUP_MEMBERS:
      return action.members;

    // case ADD_NEW_MEMBER:
    //   return [
    //     ...state,
    //     action.member
    //   ];

    default:
      return state;
  }
};
