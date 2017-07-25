const validator = require('validator');
const isEmpty = require('lodash/isEmpty');

export default function validateInput(data) {
  let errors = {};

  if (!data.firstname) {
    errors.firstname = 'This field is required';
  }
  if (!data.lastname) {
    errors.lastname = 'This field is required';
  }
  if (!data.email) {
    errors.email = 'This field is required';
  } else if (!validator.isEmail(data.email)) {
    errors.email = 'Invalid email';
  }
  if (!data.username) {
    errors.username = 'This field is required';
  }
  if (!data.password) {
    errors.password = 'This field is required';
  }
  if (!data.confirm_password) {
    errors.confirm_password = 'This field is required';
  } else if (!validator.equals(data.password, data.confirm_password)) {
    errors.confirm_password = 'Passwords must match';
  }
  return {
    errors,
    valid: isEmpty(errors)
  };
}