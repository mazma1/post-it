import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

/**
  * Validates a user's credentials for sign up
  *
  * @param {any} data credentials submitted for sign up
  *
  * @returns {object} validation errors(if any)
  */
export default function validateInput(data) {
  const errors = {};
  const lettersRegex = /^[A-Za-z]+$/;

  if (!data.firstName) {
    errors.firstName = 'This field is required';
  } else if (data.firstName.trim().length === 0) {
    errors.firstName = 'First name cannot be empty';
  } else if (!isNaN(data.firstName)) {
    errors.firstName = 'First name cannot be a number';
  } else if (!data.firstName.trim().match(lettersRegex)) {
    errors.firstName = 'First name must contain only alphabets';
  } else if (data.firstName.length < 3) {
    errors.firstName = 'First name must be more than two letters';
  } else if (data.firstName.length > 20) {
    errors.firstName = 'First name must not be more than twenty letters';
  }

  if (!data.lastName) {
    errors.lastName = 'This field is required';
  } else if (data.lastName.trim().length === 0) {
    errors.lastName = 'Last name cannot be empty';
  } else if (!isNaN(data.lastName)) {
    errors.lastName = 'Last name cannot be a number';
  } else if (!data.lastName.trim().match(lettersRegex)) {
    errors.lastName = 'Last name must contain only alphabets';
  } else if (data.lastName.length < 3) {
    errors.lastName = 'Last name must be more than two letters';
  } else if (data.lastName.length > 20) {
    errors.lastName = 'Last name must not be more than twenty letters';
  }

  if (!data.email) {
    errors.email = 'This field is required';
  } else if (!validator.isEmail(data.email)) {
    errors.email = 'Invalid email';
  }

  if (!data.phoneNumber) {
    errors.phoneNumber = 'This field is required';
  } else if (isNaN(data.phoneNumber.trim())) {
    errors.phoneNumber = 'Phone number must contain only numbers';
  } else if (data.phoneNumber.trim().length === 0) {
    errors.phoneNumber = 'Phone number cannot be empty';
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
  } else if (data.password.length < 6) {
    errors.password = 'Password must be six characters or more';
  }

  if (!data.confirmPassword) {
    errors.confirmPassword = 'This field is required';
  } else {
    if (!validator.equals(data.password, data.confirmPassword)) {
      errors.confirmPassword = 'Passwords must match';
    }
    if (data.confirmPassword.trim().length === 0) {
      errors.confirmPassword = 'Confirm password cannot be empty';
    }
  }

  return {
    errors,
    valid: isEmpty(errors)
  };
}
