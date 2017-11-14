import React from 'react';
import toastr from 'toastr';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import isEmpty from 'lodash/isEmpty';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TextField from '../partials/FormTextField';
import userSignUpRequest from '../../actions/signUp';


/**
  * Displays form to collect user's phone number while signing up via Google
  *
  * @class GoogleSignUp
  *
  * @extends {React.Component}
  */
export class GoogleSignUp extends React.Component {

  /**
     * Creates an instance of GoogleSignUp
     *
     * @param {object} props
     *
     * @memberof GoogleSignUp
     */
  constructor(props) {
    super(props);

    this.state = {
      phoneNumber: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.registerGoogleUser = this.registerGoogleUser.bind(this);
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
    * Signs up a new Google user
    *
    * @param {SyntheticEvent} event
    *
    * @returns {void} null
    */
  registerGoogleUser(event) {
    event.preventDefault();
    this.setState({ errors: {} });
    if (this.isValid()) {
      const { phoneNumber } = this.state;
      const userDetails = { ...this.props.userDetails, phoneNumber };
      this.props.userSignUpRequest(userDetails).then(
        () => {
          toastr.success('Registration was successful. Welcome to Post It!');
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
    if (isNaN(this.state.phoneNumber.trim())) {
      errors.phoneNumber = 'Phone number must contain only numbers';
      return this.setState({ errors });
    }
    return isEmpty(errors);
  }


  /**
    * Renders component
    *
    * @returns {ReactElement} Google Sign In markup
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
              <header className="auth-header center">
                <h5>You're almost there!</h5><br />
                <p className="social-login">
                  Please submit your phone number to complete your registration
                </p>
              </header>

              <form
                className="col s10 offset-s1 auth-form"
                onSubmit={this.registerGoogleUser}
              >
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
                      label="Phone Number (Eg: 2348065432345)"
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
                      onClick={this.registerGoogleUser}
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

GoogleSignUp.propTypes = {
  userSignUpRequest: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  userDetails: PropTypes.object.isRequired
};

export default withRouter(connect(null, { userSignUpRequest })(GoogleSignUp));
