import React from 'react';
import toastr from 'toastr';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import {
  Link,
  withRouter } from 'react-router-dom';
import TextField from '../partials/FormTextField';
import userSignUpRequest from '../../actions/signUp';
import validateInput from '../../../server/utils/validateInput';


/**
 * Displays sign up form
 *
 * @class SignUpForm
 *
 * @extends {React.Component}
 */
export class SignUpForm extends React.Component {

  /**
   * Creates an instance of SignUpForm
   *
   * @param {object} props
   *
   * @memberof SignUpForm
   */
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      username: '',
      phoneNumber: '',
      email: '',
      password: '',
      confirmPassword: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSignUpClick = this.onSignUpClick.bind(this);
  }


   /**
   * Handles change event of sign up input fields
   *
   * @param {SyntheticEvent} event
   *
   * @returns {void}
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }


  /**
   * Makes request to sign up a user
   *
   * @param {SyntheticEvent} event
   *
   * @returns {void}
   */
  onSignUpClick(event) {
    event.preventDefault();
    if (this.isValid()) {
      this.setState({ errors: {} });
      this.props.userSignUpRequest(this.state).then(
        () => {
          toastr.success('Sign up was successful. Welcome to Post It!');
          this.props.history.push('/message-board');
        },
        ({ response }) => this.setState({ errors: response.data })
      );
    }
  }


  /**
  * Handles sign up input validation on client
  *
  * @returns {boolean} If an input is valid or not
  */
  isValid() {
    const { errors, valid } = validateInput(this.state);
    if (!valid) {
      this.setState({ errors });
    }
    return valid;
  }

  /**
   * Renders component
   *
   * @returns {ReactElement} Sign up form markup
   */
  render() {
    const { errors } = this.state;
    return (
      <form className="col s12 auth-form" onSubmit={this.onSignUpClick}>
        <div className="row">
          <div
            className={classnames(
              'input-field',
              'auth-field',
              'col m6 s12',
              { 'has-error': errors.firstName }
            )}
          >
            <TextField
              icon="perm_identity"
              type="text"
              error={errors.firstName}
              label="First Name"
              onChange={this.onChange}
              value={this.state.firstName}
              field="firstName"
              autocomplete="off"
            />
          </div>

          <div
            className={classnames(
              'input-field',
              'auth-field',
              'col m6 s12',
              { 'has-error': errors.lastName }
            )}
          >
            <TextField
              icon="perm_identity"
              type="text"
              error={errors.lastName}
              label="Last Name"
              onChange={this.onChange}
              value={this.state.lastName}
              field="lastName"
              autocomplete="off"
            />
          </div>
        </div>

        <div className="row">
          <div
            className={classnames(
              'input-field',
              'auth-field',
              'col s12',
              { 'has-error': errors.username }
            )}
          >
            <TextField
              icon="perm_identity"
              error={errors.username}
              type="text"
              label="Username"
              onChange={this.onChange}
              value={this.state.username}
              field="username"
              autocomplete="off"
            />
          </div>
        </div>

        <div className="row">
          <div
            className={classnames(
              'input-field',
              'auth-field',
              'col s12',
              { 'has-error': errors.phoneNumber }
            )}
          >
            <TextField
              icon="phone"
              error={errors.phoneNumber}
              label="Phone Number (Eg: 2348065432345)"
              onChange={this.onChange}
              value={this.state.phoneNumber}
              field="phoneNumber"
              type="number"
              autocomplete="off"
            />
          </div>
        </div>

        <div className="row">
          <div
            className={classnames(
              'input-field',
              'auth-field',
              'col s12',
              { 'has-error': errors.email }
            )}
          >
            <TextField
              icon="email"
              error={errors.email}
              label="Email"
              onChange={this.onChange}
              value={this.state.email}
              field="email"
              type="email"
              autocomplete="off"
            />
          </div>
        </div>

        <div className="row">
          <div
            className={classnames(
              'input-field',
              'auth-field',
              'col s12',
              { 'has-error': errors.password }
            )}
          >
            <TextField
              icon="https"
              error={errors.password}
              label="Password"
              onChange={this.onChange}
              value={this.state.password}
              field="password"
              type="password"
              autocomplete="off"
            />
          </div>
        </div>

        <div className="row">
          <div
            className={classnames(
              'input-field',
              'auth-field',
              'col s12',
              { 'has-error': errors.confirmPassword }
            )}
          >
            <TextField
              icon="https"
              error={errors.confirmPassword}
              label="Confirm Password"
              onChange={this.onChange}
              value={this.state.confirmPassword}
              field="confirmPassword"
              type="password"
              autocomplete="off"
            />
          </div>
        </div>

        <div className="row">
          <div className="input-field col s12">
            <a
              className="auth-btn btn waves-effect waves-light col s12"
              onClick={this.onSignUpClick}
            >
              Sign Up
            </a>
          </div>
        </div>

        <div className="call-to-sign-in">
          <p className="center">
            Already have an account? <Link to="/signin">Sign In</Link>
          </p>
        </div>

        <div className="form-padding-bottom" />
      </form>
    );
  }
}

SignUpForm.propTypes = {
  history: PropTypes.object.isRequired,
  userSignUpRequest: PropTypes.func.isRequired
};

export default withRouter(connect(null, { userSignUpRequest })(SignUpForm));

