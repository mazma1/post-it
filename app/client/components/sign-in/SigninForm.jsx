import React from 'react';
import classnames from 'classnames';
import { withRouter, Link } from 'react-router-dom';
import toastr from 'toastr';
import PropTypes from 'prop-types';
import TextField from '../common/FormTextField.jsx';
import validateInput from '../../../utils/signinValidation';


/**
 * SigninForm component
 * Parent component: SignIn.js
 */
class SigninForm extends React.Component {

  /**
   * Constructor
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      identifier: '',
      password: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSigninClick = this.onSigninClick.bind(this);
  }

   /**
   * Handles input validation on client
   * @returns {boolean} If an input is valid or not
   */
  validateInput() {
    const { errors, valid } = validateInput(this.state);

    if (!valid) {
      this.setState({ errors });
    }

    return valid;
  }

  /**
   * Handles change event of sign in input fields
   * @param {SyntheticEvent} e
   * @returns {void}
   */
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  /**
   * Handles Sign In event
   * Dispatches userSigninRequest action
   * If sign in request was successful, it redirects to the message board
   * with a success flash message.
   * If sign in was not successful, it returns the appropriate error message(s)
   * @param {SyntheticEvent} e
   * @returns {void}
   */
  onSigninClick(e) {
    e.preventDefault();

    if (this.validateInput()) {
      this.setState({ errors: {} });
      this.props.userSigninRequest(this.state).then(
        () => {
          toastr.success('Sign in was successful. Welcome back!');
          this.props.history.push('/message_board');
        },
        ({ response }) => this.setState({ errors: response.data })
      );
    }
  }

  /**
   * Render
   * @returns {ReactElement} Sign in form markup
   */
  render() {
    const { errors } = this.state;
    return (
      <form className="col s12 auth-form" onSubmit={this.onSigninClick}>
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
              onClick={this.onSigninClick}
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
            <Link to="/reset_password">Forgot Password?</Link>
          </p>
        </div>

        <div className="form-padding-bottom" />
      </form>
    );
  }
}

SigninForm.propTypes = {
  userSigninRequest: PropTypes.func.isRequired
};

export default withRouter(SigninForm);

