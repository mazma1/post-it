import React from 'react';
import toastr from 'toastr';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {
  Link,
  withRouter } from 'react-router-dom';
import TextField from '../common/FormTextField';
import validateInput from '../../utils/signinValidation';


/**
 * Display sign in form
 *
 * @class SignInForm
 *
 * @extends {React.Component}
 */
export class SignInForm extends React.Component {

  /**
     * Creates an instance of SignInForm
     *
     * @param {any} props
     *
     * @memberof SignInForm
     */
  constructor(props) {
    super(props);
    this.state = {
      identifier: '',
      password: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSignInClick = this.onSignInClick.bind(this);
  }


  /**
   * Handles change event of sign in input fields
   *
   * @param {SyntheticEvent} event
   *
   * @returns {void} null
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   * Makes request to authenticate a user
   *
   * @param {SyntheticEvent} event
   *
   * @returns {void}
   */
  onSignInClick(event) {
    event.preventDefault();
    if (this.isValid()) {
      this.setState({ errors: {} });
      this.props.userSignInRequest(this.state).then(
        () => {
          toastr.success('Sign in was successful. Welcome back!');
          this.props.history.push('/message-board');
        },
        ({ response }) => this.setState({ errors: response.data })
      );
    }
  }


  /**
   * Handles input validation on client
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
   * Render
   *
   * @returns {ReactElement} Sign in form markup
   */
  render() {
    const { errors } = this.state;
    return (
      <form className="col s12 auth-form" onSubmit={this.onSignInClick}>
        <div className="row">
          <div
            className={classnames(
              'input-field',
              'auth-field',
              'col s12',
              { 'has-error': errors.identifier }
            )}
          >
            <TextField
              icon="perm_identity"
              error={errors.identifier}
              type="text"
              label="Username or Email"
              onChange={this.onChange}
              value={this.state.identifier}
              field="identifier"
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
          <div className="input-field col s12">
            <a
              className="btn auth-btn waves-effect waves-light col s12"
              onClick={this.onSignInClick}
            >
              Sign In
            </a>
          </div>
        </div>

        <div className="center call-to-sign-in">
          <p className="center">{ "Don't have an account? " }
            <Link to="/signup">Sign Up</Link>
          </p>
          <p className="center">
            <Link to="/reset-password">Forgot Password?</Link>
          </p>
        </div>

        <div className="form-padding-bottom" />
      </form>
    );
  }
}

SignInForm.propTypes = {
  history: PropTypes.object.isRequired,
  userSignInRequest: PropTypes.func.isRequired
};

export default withRouter(SignInForm);

