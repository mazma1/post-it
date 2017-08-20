import validator from 'validator';

const isEmpty = require('lodash/isEmpty');

export default function validateInput(data) {
  const errors = {};

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
  if (!data.phone) {
    errors.phone = 'This field is required';
  } else if (data.phone.length !== 11) {
    errors.phone = 'Phone number must be 11 digits';
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
