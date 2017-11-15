import React from 'react';
import toastr from 'toastr';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import isEmpty from 'lodash/isEmpty';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import TextField from '../partials/FormTextField';
import {
  validateResetPasswordToken,
  updatePassword } from '../../actions/resetPassword';

/**
  * Displays form for submiting new password
  *
  * @class NewPasswordForm
  *
  * @extends {React.Component}
  */
export class NewPasswordForm extends React.Component {

  /**
    * Creates an instance of NewPasswordForm
    *
    * @param {object} props
    *
    * @memberof NewPasswordForm
    */
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      confirmPassword: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.submitNewPassword = this.submitNewPassword.bind(this);
  }

  /**
   * Validates reset password token contained in a given reset link
   *
   * @returns {void} null
   */
  componentWillMount() {
    if (this.props.match.params.token) {
      const token = this.props.match.params.token;
      this.props.validateResetPasswordToken({ token });
    }
  }

  /**
   * Sends an error message to the user if an invalid reset password
   * token is provided
   *
   * @param {object} nextProps - New props received by the component
   *
   * @returns {void} null
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.tokenStatus.status === 'failure') {
      const errorMessage = nextProps.tokenStatus.message;
      let flashErrorMsg = '';
      if (errorMessage === 'Token has expired') {
        flashErrorMsg = 'Reset link has expired';
      }
      if (errorMessage === 'Token does not exist') {
        flashErrorMsg = 'Reset link is required';
      }
      if (errorMessage === 'Invalid token') {
        flashErrorMsg = 'Invalid reset link';
      }
      toastr.error(
        `${flashErrorMsg}. Enter your email to receive a valid link`
      );
      this.props.history.push('/reset-password');
    }
  }


  /**
   * Handles change event of new password form
   *
   * @param {SyntheticEvent} event
   *
   * @returns {void} null
   */
  onChange(event) {
    this.setState({ errors: {} });
    this.setState({ [event.target.name]: event.target.value });
  }


  /**
  * Handles input field validation
  *
  * @returns {boolean} If an input is valid or not
  */
  isValid() {
    const errors = {};
    if (this.state.password.trim().length === 0) {
      errors.password = 'New password is required';
      this.setState({ errors });
    }
    if (this.state.confirmPassword.trim().length === 0) {
      errors.confirmPassword = 'New password confirmation is required';
      this.setState({ errors });
    }
    return isEmpty(errors);
  }


  /**
   * Submits a user's new password to the database
   *
   * @param {SyntheticEvent} event
   *
   * @returns {void}
   */
  submitNewPassword(event) {
    event.preventDefault();
    if (this.isValid()) {
      const token = this.props.match.params.token;
      const { password, confirmPassword } = this.state;
      this.props.updatePassword({
        password,
        confirmPassword,
        token
      }).then(
        () => {
          toastr.success(
            'Password has been successfully changed. Please log in with new detail'
          );
          this.props.history.push('/signin');
        },
        ({ response }) => this.setState({ errors: response.data })
      ).catch(() => {
        toastr.error('Unable to submit request, please try again');
      });
    }
  }

  /**
   * Renders new password form component
   *
   * @returns {ReactElement} New password form markup
   */
  render() {
    const { errors } = this.state;
    return (
      <div className="background">
        <div className="container">
          <div className="row">
            <div
              className="card-panel col s12 m8 offset-m2 l6 offset-l3 z-depth-5 signin-card"
            >
              <header className="auth-header">
                <h5 className="center">Enter New Password</h5>
              </header>

              <form
                className="col s10 offset-s1 auth-form"
                onSubmit={this.submitNewPassword}
              >
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
                      label="New Password"
                      error={errors.password}
                      onChange={this.onChange}
                      value={this.state.password}
                      field="password"
                      type="password"
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
                      label="Confirm Password"
                      error={errors.confirmPassword}
                      onChange={this.onChange}
                      value={this.state.confirmPassword}
                      field="confirmPassword"
                      type="password"
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="input-field col s12 update-password-btn">
                    <a
                      className="btn auth-btn waves-effect waves-light col s12"
                      onClick={this.submitNewPassword}
                    >
                      Update Password
                    </a>
                  </div>
                </div>

                <div className="form-padding-bottom" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


/**
 * Maps pieces of the redux state to props
 *
 * @param {object} state Redux state
 *
 * @returns {object} States if token provided to reset password is valid or not
 */
function mapStateToProps(state) {
  return {
    tokenStatus: state.resetPassword
  };
}


/**
 * Maps action creators to redux dispatch function and avails them as props
 *
 * @param {function} dispatch Redux dispatch function
 *
 * @returns {function} Action cretaors bound to redux dispatch function
 */
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    validateResetPasswordToken,
    updatePassword
  }, dispatch);
}

NewPasswordForm.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  updatePassword: PropTypes.func.isRequired,
  tokenStatus: PropTypes.object.isRequired,
  validateResetPasswordToken: PropTypes.func.isRequired
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(NewPasswordForm));
