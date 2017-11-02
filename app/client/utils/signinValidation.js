const isEmpty = require('lodash/isEmpty');

/**
   * Validates a user's credentials for sign in
   *
   * @param {any} data credentials submitted for sign in
   * @returns {response} validation errors(if any)
   */
export default function validateInput(data) {
  const errors = {};

  if (!data.identifier) {
    errors.identifier = 'This field is required';
  }
  if (!data.password) {
    errors.password = 'This field is required';
  }
  return {
    errors,
    valid: isEmpty(errors)
  };
}
