import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SignUpForm from './SignUpForm';
import userSignUpRequest from '../../actions/signUp';

/**
 * Displays sign up page
 *
 * @class SignUp
 *
 * @extends {React.Component}
 */
export class SignUp extends React.Component {

  /**
   * Renders the component
   *
   * @returns {ReactElement} SignUp page markup
   */
  render() {
    const { userSignUpRequest } = this.props;
    return (
      <div className="background">
        <div className="container">
          <div className="row">
            <div
              className="card-panel col s12 m8 offset-m2 l6 offset-l3 z-depth-5 signup-panel"
            >
              <header className="auth-header">
                <h5 className="center">Sign up | Post It</h5>
              </header>

              <SignUpForm
                userSignUpRequest={userSignUpRequest}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
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
    userSignUpRequest
  }, dispatch);
}

SignUp.propTypes = {
  userSignUpRequest: PropTypes.func.isRequired
};


export default connect(null, mapDispatchToProps)(SignUp);
