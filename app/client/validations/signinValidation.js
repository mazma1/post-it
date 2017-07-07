const validator = require('validator');
const isEmpty = require('lodash/isEmpty');

export default function validateInput(data) {
  let errors = {};

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
