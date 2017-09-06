import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import toastr from 'toastr';
import { withRouter, Link } from 'react-router-dom';
import validateInput from '../../../utils/signupValidation';
import TextField from '../common/FormTextField.jsx';

/**
 * SignupForm component
 * Parent component: SignUp.js
 */
class SignupForm extends React.Component {
  /**
   * Constructor
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      username: '',
      phone: '',
      email: '',
      password: '',
      confirm_password: '',
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
   * Dispatches userSignupRequest action
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
      this.props.userSignupRequest(this.state).then(
        () => {
          this.props.userSigninRequest({
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
              { 'has-error': errors.firstname }
            )}
          >
            <TextField
              icon="perm_identity"
              error={errors.firstname}
              label="First Name"
              onChange={this.onChange}
              value={this.state.firstname}
              field="firstname"
              autocomplete="off"
            />
          </div>

          <div
            className={classnames(
              'input-field',
              'auth-field',
              'col m6 s12',
              { 'has-error': errors.lastname }
            )}
          >
            <TextField
              icon="perm_identity"
              error={errors.lastname}
              label="Last Name"
              onChange={this.onChange}
              value={this.state.lastname}
              field="lastname"
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
              { 'has-error': errors.phone }
            )}
          >
            <TextField
              icon="phone"
              error={errors.phone}
              label="Phone Number"
              onChange={this.onChange}
              value={this.state.phone}
              field="phone"
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
              { 'has-error': errors.confirm_password }
            )}
          >
            <TextField
              icon="https"
              error={errors.confirm_password}
              label="Confirm Password"
              onChange={this.onChange}
              value={this.state.confirm_password}
              field="confirm_password"
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

SignupForm.propTypes = {
  userSignupRequest: PropTypes.func.isRequired,
  userSigninRequest: PropTypes.func.isRequired
};

export default withRouter(SignupForm);

