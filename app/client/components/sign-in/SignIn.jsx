import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SignInForm from './SignInForm';
import { userSignInRequest } from '../../actions/signIn';


/** SignIn Page Component */
export class SignIn extends React.Component {

  /**
   * Render
   * @returns {ReactElement} SignIn page markup
   */
  render() {
    const { userSignInRequest } = this.props;
    return (
      <div className="background">
        <div className="container">
          <div className="row">
            <div className="card-panel col s12 m8 offset-m2 l6 offset-l3 z-depth-5 signin-card">
              <header className="auth-header">
                <h5 className="center">Sign In | Post It</h5>
              </header>

              <SignInForm userSignInRequest={userSignInRequest} />
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
    userSignInRequest
  }, dispatch);
}

SignIn.propTypes = {
  userSignInRequest: PropTypes.func.isRequired
};

export default connect(null, mapDispatchToProps)(SignIn);
