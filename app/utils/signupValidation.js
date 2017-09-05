import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

/**
   * Validates a user's credentials for sign up
   *
   * @param {any} data credentials submitted for sign up
   * @returns {response} validation errors(if any)
   */
export default function validateInput(data) {
  const errors = {};
  const lettersRegex = /^[A-Za-z]+$/;

  if (!data.firstname) {
    errors.firstname = 'This field is required';
  } else if (data.firstname.trim().length === 0) {
    errors.firstname = 'First name cannot be empty';
  } else if (!isNaN(data.firstname)) {
    errors.firstname = 'First name cannot be a number';
  } else if (!data.firstname.match(lettersRegex)) {
    errors.firstname = 'First name must contain only alphabets';
  } else if (data.firstname.length < 3) {
    errors.firstname = 'First name must be more than two letters';
  } else if (data.firstname.length > 20) {
    errors.firstname = 'First name must not be more than twenty letters';
  }

  if (!data.lastname) {
    errors.lastname = 'This field is required';
  } else if (data.lastname.trim().length === 0) {
    errors.lastname = 'Last name cannot be empty';
  } else if (!isNaN(data.lastname)) {
    errors.lastname = 'Last name cannot be a number';
  } else if (!data.lastname.match(lettersRegex)) {
    errors.lastname = 'Last name must contain only alphabets';
  } else if (data.lastname.length < 3) {
    errors.lastname = 'Last name must be more than two letters';
  } else if (data.lastname.length > 20) {
    errors.lastname = 'Last name must not be more than twenty letters';
  }

  if (!data.email) {
    errors.email = 'This field is required';
  } else if (!validator.isEmail(data.email)) {
    errors.email = 'Invalid email';
  }

  if (!data.phone) {
    errors.phone = 'This field is required';
  } else if (isNaN(data.phone)) {
    errors.phone = 'Phone number must contain only numbers';
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
  } else if (data.password.length < 6) {
    errors.password = 'Password must be six characters or more';
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
