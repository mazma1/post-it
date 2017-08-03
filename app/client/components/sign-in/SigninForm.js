import React from 'react';
import classnames from 'classnames';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextField from '../common/FormTextField';
import validateInput from '../../validations/signinValidation';


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
  valid() {
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

    if (this.valid()) {
      this.setState({ errors: {} });
      this.props.userSigninRequest(this.state).then(
        () => {
          this.props.addFlashMessage({
            type: 'success',
            text: 'Sign in was successful. Welcome back!'
          });
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
      <form className="col s12 auth-form">
        <div className="row">
          <div className={classnames('input-field', 'auth-field', 'col s12', { 'has-error': errors.identifier })}>
            <TextField
              icon='perm_identity'
              error={errors.identifier}
              label='Username or Email'
              onChange={this.onChange}
              value={this.state.identifier}
              field='identifier'
            />
          </div>
        </div>

        <div className="row">
          <div className={classnames('input-field', 'auth-field', 'col s12', { 'has-error': errors.password })}>
            <TextField
              icon='https'
              error={errors.password}
              label='Password'
              onChange={this.onChange}
              value={this.state.password}
              field='password'
              type='password'
            />
          </div>
        </div>

        <div className="row">
          <div className="input-field col s12">
            <a href="#" className="btn auth-btn waves-effect waves-light col s12" onClick={this.onSigninClick}>Sign In</a>
          </div>
        </div>

        <div className="center call-to-sign-in">
          <p className="center">Don't have an account? <a href="/signup">Sign Up</a></p>
        </div>

        <div className="form-padding-bottom"></div>
      </form>
    );
  }
}

SigninForm.propTypes = {
  userSigninRequest: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired
};

export default withRouter(SigninForm);

