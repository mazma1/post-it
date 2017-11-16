import React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import toastr from 'toastr';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import validator from 'validator';
import TextField from '../partials/FormTextField';
import { resetLinkRequest } from '../../actions/resetPassword';


/**
  * Displays form for submiting email when requesting for password reset
  *
  * @class SubmitEmailForm
  *
  * @extends {React.Component}
  */
export class SubmitEmailForm extends React.Component {

  /**
   * Creates an instance of SubmitEmailForm
   *
   * @param {any} props
   *
   * @memberof SubmitEmailForm
   */
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      error: {},
      isLoading: false,
    };

    this.onChange = this.onChange.bind(this);
    this.submitResetRequest = this.submitResetRequest.bind(this);
  }


  /**
   * Handles change event of email input form
   *
   * @param {SyntheticEvent} event
   *
   * @returns {void} null
   */
  onChange(event) {
    this.setState({ error: {} });
    this.setState({ [event.target.name]: event.target.value });
  }


  /**
   * Handles input field validation
   *
   * @returns {boolean} If an input is valid or not
   */
  isValid() {
    const error = {};
    if (this.state.email.trim().length === 0) {
      error.email = 'Email field cannot be empty';
    }
    if (this.state.email.trim().length > 0
      && !validator.isEmail(this.state.email)
    ) {
      error.email = 'Invalid email address';
    }
    this.setState({ error });
    return isEmpty(error);
  }


  /**
   * Sends email containg password reset instructions to user
   *
   * @param {SyntheticEvent} event
   *
   * @returns {void}
   */
  submitResetRequest(event) {
    event.preventDefault();
    if (this.isValid()) {
      this.setState({ error: {}, isLoading: true });
      this.props.resetLinkRequest({ email: this.state.email }).then(
        () => {
          toastr.success(
            `${this.props.emailStatus.message}! Check your inbox, ${this.state.email} for further instructions`
          );
          this.setState({ email: '', isLoading: false });
        },
        ({ response }) => {
          this.setState({ error: response.data, isLoading: false });
        }
      ).catch(() => {
        toastr.error('Unable to submit request, please try again');
      });
    }
  }

  /**
   * Renders form to submit email
   *
   * @returns {ReactElement} Email Form markup
   */
  render() {
    const { error } = this.state;
    return (
      <div className="background">
        <div className="container">
          <div className="row">
            <div
              className="card-panel col s12 m8 offset-m2 l6 offset-l3 z-depth-5 signin-card"
            >
              <header className="auth-header pwd-reset-auth-header">
                <h5 className="center">Request Password Reset</h5>
              </header>

              <form
                className="col s10 offset-s1 auth-form"
                onSubmit={this.submitResetRequest}
              >
                <div className="row">
                  <div
                    className={classnames(
                      'input-field',
                      'auth-field',
                      'col s12',
                      { 'has-error': error.email }
                    )}
                  >
                    <TextField
                      icon="email"
                      label="Email"
                      error={error.email}
                      onChange={this.onChange}
                      value={this.state.email}
                      field="email"
                      type="email"
                      autocomplete="off"
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="input-field col s12">
                    <button
                      className="btn auth-btn waves-effect waves-light col s12"
                      disabled={this.state.isLoading}
                      onClick={this.submitResetRequest}
                    >
                      Request Reset
                    </button>
                  </div>
                </div>

                <div className="center call-to-sign-in">
                  <p className="center">Remember your password?
                    <Link to="/signin"> Sign In</Link>
                  </p>
                </div>

                <div className="pwd-reset-form-padding-bottom" />
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
 * @returns {object} States if email containing reset password link was
 * successfully sent or not
 */
function mapStateToProps(state) {
  return {
    emailStatus: state.resetPassword
  };
}

SubmitEmailForm.propTypes = {
  resetLinkRequest: PropTypes.func.isRequired,
  emailStatus: PropTypes.object
};


SubmitEmailForm.defaultProps = {
  emailStatus: {}
};

export default connect(mapStateToProps, { resetLinkRequest })(SubmitEmailForm);
