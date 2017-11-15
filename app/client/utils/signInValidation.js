const isEmpty = require('lodash/isEmpty');

/**
  * Validates a user's credentials for sign in
  *
  * @param {string} data - Credentials submitted for sign in
  *
  * @returns {object} Validation errors (if any)
  */
export default function signInValidation(data) {
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
