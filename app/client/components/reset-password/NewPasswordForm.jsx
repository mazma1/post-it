import React from 'react';
import classnames from 'classnames';
import { withRouter } from 'react-router-dom';
import toastr from 'toastr';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TextField from '../common/FormTextField.jsx';
import {
  validateResetPasswordToken,
  updatePassword } from '../../actions/resetPassword';

/** Form for submiting new password */
class NewPasswordForm extends React.Component {

  /**
   * Constructor
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      confirm_password: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onNewPasswordSubmit = this.onNewPasswordSubmit.bind(this);
  }

  /**
   * Defines what must be executed before NewPasswordForm component mounts
   * It dispatches validateResetPasswordToken action to validate a given token
   * If token is valid, the component mounts
   * If token is invalid or expired, it redirects to forgot password page
   with appropriate error message
   * @returns {void} null
   */
  componentWillMount() {
    if (this.props.match.params.token) {
      const token = this.props.match.params.token;
      this.props.validateResetPasswordToken({ token }).then(
        () => {},
        ({ response }) => {
          let flashErrorMsg = '';
          if (response.data.message === 'Token has expired') {
            flashErrorMsg = 'Reset link has expired';
          } else if (response.data.message === 'Token does not exist') {
            flashErrorMsg = 'Reset link has expired';
          }
          toastr.error(`${flashErrorMsg}. Enter your email to receive a valid link`);
          this.props.history.push('/reset_password');
        }
      );
    }
  }

  /**
   * Handles change event of new password form
   * Updates password and confirm_password states
   * @param {SyntheticEvent} event
   * @returns {void} null
   */
  onChange(event) {
    this.setState({ errors: {} });
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   * Handles password reset request event
   * Dispatches resetLinkRequest action with provided email
   * If the submission was successful, it adds a success flash message
   * If submission was not successful, it returns the appropriate error message
   * @param {SyntheticEvent} event
   * @returns {void}
   */
  onNewPasswordSubmit(event) {
    event.preventDefault();
    const token = this.props.match.params.token;
    this.props.updatePassword({
      password: this.state.password,
      confirm_password: this.state.confirm_password,
      token
    }).then(
      () => {
        toastr.success('Password has been successfully changed. Please log in with new detail');
        this.props.history.push('/signin');
      },
      ({ response }) => this.setState({ errors: response.data })
    ).catch(() => {
      toastr.error('Unable to submit request, please try again');
    });
  }

  /**
   * Render
   * @returns {ReactElement} New password form markup
   */
  render() {
    const { errors } = this.state;
    return (
      <div className="background">
        <div className="container">
          <div className="row">
            <div className="card-panel col s12 m8 offset-m2 l6 offset-l3 z-depth-5 signin-card">
              <header className="auth-header">
                <h5 className="center">Enter New Password</h5>
              </header>

              <form className="col s12 auth-form" onSubmit={this.onNewPasswordSubmit}>
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
                      { 'has-error': errors.confirm_password }
                    )}
                  >
                    <TextField
                      icon="https"
                      label="Confirm Password"
                      error={errors.confirm_password}
                      onChange={this.onChange}
                      value={this.state.confirm_password}
                      field="confirm_password"
                      type="password"
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="input-field col s12">
                    <a
                      className="btn auth-btn waves-effect waves-light col s12"
                      onClick={this.onNewPasswordSubmit}
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
 * Maps action creators to redux dispatch function
 * Action creators bound will be available as props
 * Actions generated by the action creators flows though all the reducers
 * @param {function} dispatch Redux dispatch function
 * @returns {function} Action cretaors bound to redux dispatch function
 */
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    validateResetPasswordToken,
    updatePassword
  }, dispatch);
}

NewPasswordForm.propTypes = {
  updatePassword: PropTypes.func.isRequired,
  validateResetPasswordToken: PropTypes.func.isRequired
};

export default withRouter(connect(null, mapDispatchToProps)(NewPasswordForm));
