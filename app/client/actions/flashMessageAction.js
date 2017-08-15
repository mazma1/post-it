import { ADD_FLASH_MESSAGE, DELETE_FLASH_MESSAGE } from './types';

export function addFlashMessage(message) {
  return {
    type: ADD_FLASH_MESSAGE,
    message
  };
}

export function deleteFlashMessage(messageId) {
  return {
    type: DELETE_FLASH_MESSAGE,
    messageId
  };
}
