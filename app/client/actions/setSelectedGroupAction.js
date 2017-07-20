import axios from 'axios';
import { SET_SELECTED_GROUP } from '../actions/types';

export function setSelectedGroup(group) {
  return {
    type: SET_SELECTED_GROUP,
    selectedGroup: group
  };
}
