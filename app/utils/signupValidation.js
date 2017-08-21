import validator from 'validator';

const isEmpty = require('lodash/isEmpty');

export default function validateInput(data) {
  const errors = {};

  if (!data.firstname) {
    errors.firstname = 'This field is required';
  } else if (data.firstname.trim().length === 0) {
    errors.firstname = 'First name cannot be empty';
  }

  if (!data.lastname) {
    errors.lastname = 'This field is required';
  } else if (data.lastname.trim().length === 0) {
    errors.lastname = 'Last name cannot be empty';
  }

  if (!data.email) {
    errors.email = 'This field is required';
  } else if (!validator.isEmail(data.email)) {
    errors.email = 'Invalid email';
  }

  if (!data.phone) {
    errors.phone = 'This field is required';
  } else {
    if (data.phone.length !== 11) {
      errors.phone = 'Phone number must be 11 digits';
    }
    if (data.phone.trim().length === 0) {
      errors.phone = 'Phone number cannot be empty';
    }
  }

  if (!data.username) {
    errors.username = 'This field is required';
  } else if (data.username.trim().length === 0) {
    errors.username = 'Username cannot be empty';
  }

  if (!data.password) {
    errors.password = 'This field is required';
  } else if (data.password.trim().length === 0) {
    errors.password = 'Password cannot be empty';
  }

  if (!data.confirm_password) {
    errors.confirm_password = 'This field is required';
  } else {
    if (!validator.equals(data.password, data.confirm_password)) {
      errors.confirm_password = 'Passwords must match';
    }
    if (data.confirm_password.trim().length === 0) {
      errors.confirm_password = 'Confirm password cannot be empty';
    }
  }

  return {
    errors,
    valid: isEmpty(errors)
  };
}