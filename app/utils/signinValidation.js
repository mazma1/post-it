const isEmpty = require('lodash/isEmpty');

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
