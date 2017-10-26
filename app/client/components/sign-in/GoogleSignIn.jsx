import React from 'react';
import toastr from 'toastr';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import isEmpty from 'lodash/isEmpty';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TextField from '../common/FormTextField';
import { googleSignIn } from '../../actions/signIn';


/**
  * Displays GoogleSignIn
  *
  * @class GoogleSignIn
  *
  * @extends {React.Component}
  */
export class GoogleSignIn extends React.Component {

  /**
     * Creates an instance of GoogleSignIn
     *
     * @param {any} props
     *
     * @memberof GoogleSignIn
     */
  constructor(props) {
    super(props);

    this.state = {
      phoneNumber: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.submitPhoneNumber = this.submitPhoneNumber.bind(this);
  }

  /**
   * Handles change event of phone number input field
   *
   * @param {SyntheticEvent} event
   *
   * @returns {void} null
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
    * Submits phone number of users who register via Google
    *
    * @param {SyntheticEvent} event
    *
    * @returns {void} null
    */
  submitPhoneNumber(event) {
    event.preventDefault();
    this.setState({ errors: {} });
    if (this.isValid()) {
      const { token } = this.props;
      const { phoneNumber } = this.state;
      this.props.googleSignIn({ token, phoneNumber }).then(
        () => {
          toastr.success('Regitration was successful. Welcome to Post It!');
          this.props.history.push('/message-board');
        }
      );
    }
  }

  /**
    * Validates user's phone number to be submitted
    *
    * @returns {boolean} If an input is valid or not
    */
  isValid() {
    const errors = {};
    if (!this.state.phoneNumber) {
      errors.phoneNumber = 'Phone Number is required';
      return this.setState({ errors });
    }
    if (this.state.phoneNumber.trim().length === 0) {
      errors.phoneNumber = 'Phone Number cannot be empty';
      return this.setState({ errors });
    }
    if (this.state.phoneNumber.length !== 11) {
      errors.phoneNumber = 'Phone number must be 11 digits';
      return this.setState({ errors });
    }
    if (isNaN(this.state.phoneNumber.trim())) {
      errors.phoneNumber = 'Phone number must contain only numbers';
      return this.setState({ errors });
    }
    return isEmpty(errors);
  }

  /**
    * Render
    *
    * @returns {ReactElement} Google Sign In markup
    */
  render() {
    const { errors } = this.state;
    return (
      <div className="background">
        <div className="container">
          <div className="row">
            <div className="card-panel col s12 m8 offset-m2 l6 offset-l3 z-depth-5 signin-card">
              <header className="auth-header center">
                <h5>You're almost there!</h5><br />
                <p className="social-login">
                  Please submit your phone number to complete your registration
                </p>
              </header>

              <form className="col s10 offset-s1 auth-form" onSubmit={this.submitPhoneNumber}>
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
                  <div className="input-field col s12">
                    <a
                      className="btn auth-btn waves-effect waves-light col s12"
                      onClick={this.submitPhoneNumber}
                    >
                      Submit
                    </a>
                  </div>
                </div>

                <div className="social-padding-bottom" />
              </form>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

GoogleSignIn.propTypes = {
  googleSignIn: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired
};

export default withRouter(connect(null, { googleSignIn })(GoogleSignIn));
