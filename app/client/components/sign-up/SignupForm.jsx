import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import toastr from 'toastr';
import { withRouter, Link } from 'react-router-dom';
import validateInput from '../../../utils/signupValidation';
import TextField from '../common/FormTextField';

/**
 * SignupForm component
 * Parent component: SignUp.js
 */
class SignUpForm extends React.Component {
  /**
   * Constructor
   * @param {object} props
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
    this.onSignupClick = this.onSignupClick.bind(this);
  }
  

   /**
   * Handles change event of sign up input fields
   * @param {SyntheticEvent} event
   * @returns {void}
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   * Handles sign up input validation on client
   * @returns {boolean} If an input is valid or not
   */
  valid() {
    const { errors, valid } = validateInput(this.state);

    if (!valid) {
      this.setState({ errors });
    }

    return valid;
  }

  /**
   * Handles Sign Up event
   * Dispatches userSignUpRequest action
   * If sign up request is successful, it equally signs user up and
   * redirects to the message board with a success flash message
   * If sign up was not successful, it returns the appropriate error message(s)
   * @param {SyntheticEvent} event
   * @returns {void}
   */
  onSignupClick(event) {
    event.preventDefault();

    if (this.valid()) {
      this.setState({ errors: {} });
      this.props.userSignUpRequest(this.state).then(
        () => {
          this.props.userSignInRequest({
            identifier: this.state.username,
            password: this.state.password
          })
            .then(() => {
              toastr.success('Sign up was successful. Welcome to Post It!');
              this.props.history.push('/message-board');
            },
            ({ response }) => this.setState({ errors: response.data })
          );
        },
        ({ response }) => this.setState({ errors: response.data })
      );
    }
  }


  /**
   * Render
   * @returns {ReactElement} Sign up form markup
   */
  render() {
    const { errors } = this.state;
    return (
      <form className="col s12 auth-form" onSubmit={this.onSignupClick}>
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
              label="Phone Number"
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
              onClick={this.onSignupClick}
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
  userSignUpRequest: PropTypes.func.isRequired,
  userSignInRequest: PropTypes.func.isRequired
};

export default withRouter(SignUpForm);

