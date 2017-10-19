import React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import toastr from 'toastr';
import { connect } from 'react-redux';
import TextField from '../common/FormTextField';
import { resetLinkRequest } from '../../actions/resetPassword';


/**
  * Displays form for submiting email for password reset
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
      error: {}
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
   * Sends email containg password reset instructions to user
   *
   * @param {SyntheticEvent} event
   *
   * @returns {void}
   */
  submitResetRequest(event) {
    event.preventDefault();
    this.setState({ error: {} });
    this.props.resetLinkRequest({ email: this.state.email }).then(
      () => {
        toastr.success(`An email has been sent to ${this.state.email} with further instructions`);
        this.setState({ email: '' });
      },
      ({ response }) => {
        this.setState({ error: response.data });
      }
    ).catch(() => {
      toastr.error('Unable to submit request, please try again');
    });
  }

  /**
   * Render
   *
   * @returns {ReactElement} Email Form markup
   */
  render() {
    const { error } = this.state;
    return (
      <div className="background">
        <div className="container">
          <div className="row">
            <div className="card-panel col s12 m8 offset-m2 l6 offset-l3 z-depth-5 signin-card">
              <header className="auth-header pwd-reset-auth-header">
                <h5 className="cSubmit">Request Password Reset</h5>
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
                    <a
                      className="btn auth-btn waves-effect waves-light col s12"
                      onClick={this.submitResetRequest}
                    >
                      Request Reset
                    </a>
                  </div>
                </div>

                <div className="cSubmit call-to-sign-in">
                  <p className="cSubmit">Remember your password?
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

SubmitEmailForm.propTypes = {
  resetLinkRequest: PropTypes.func.isRequired,
};

export default connect(null, { resetLinkRequest })(SubmitEmailForm);
