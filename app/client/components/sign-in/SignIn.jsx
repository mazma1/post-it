import React from 'react';
import toastr from 'toastr';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SignInForm from './SignInForm';
import GoogleSignUp from '../sign-up/GoogleSignUp';
import { userSignInRequest, authorizeGoogleUser } from '../../actions/signIn';
import GoogleAuthButton from '../../components/sign-in/GoogleAuthButton';


/**
 * Displays Sign In page
 *
 * @class SignIn
 *
 * @extends {React.Component}
 */
export class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userDetails: {}
    };

    this.googleSignIn = this.googleSignIn.bind(this);
    this.onFailure = this.onFailure.bind(this);
  }


  /**
  * Reports if there is an error during google sign in
  *
  * @param {object} error -Details of error that occurs
  *
  * @memberof HomePage
  */
  onFailure(error) {
    toastr.error(
      'Unable to sign in with Google.Check your network and try again'
    );
  }

  /**
   * Handles request to sign in via Google
   *
   * @param {object} response - Response received from Google API
   *
   * @returns {void}
   */
  googleSignIn(response) {
    const userDetails = {
      firstName: response.profileObj.givenName,
      lastName: response.profileObj.familyName,
      username: response.profileObj.givenName,
      email: response.profileObj.email,
      password: response.profileObj.googleId,
      confirmPassword: response.profileObj.googleId
    };
    const email = userDetails.email;
    this.setState({ userDetails });
    this.props.authorizeGoogleUser({ email, userDetails });
  }

  /**
   * Renders the Sign In component
   *
   * @returns {ReactElement} SignIn page markup
   */
  render() {
    const { userDetails } = this.state;
    const { googleAuthStatus, userSignInRequest } = this.props;
    return (
      <div>
        {
          (googleAuthStatus === 'New user') ?
            <GoogleSignUp userDetails={userDetails} />
            : null
        }

        {
          (googleAuthStatus !== 'New user' || googleAuthStatus === '') ?
            <div className="background">
              <div className="container">
                <div className="row">
                  <div
                    className="card-panel col s12 m8 offset-m2 l6 offset-l3 z-depth-5 signin-card"
                  >
                    <header className="auth-header">
                      <h5 className="center">Sign In | Post It</h5>
                    </header>

                    <SignInForm userSignInRequest={userSignInRequest} />

                    <div className="col s12">
                      <hr className="google-hr" />
                      <h6 className="google-option">or</h6>
                    </div>

                    <div className="col s6 offset-s3 google-signin auth-button">
                      <GoogleAuthButton
                        onSuccess={this.googleSignIn}
                        onFailure={this.onFailure}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          : null
        }
      </div>
    );
  }
}


/**
 * Maps pieces of the redux state to props
 *
 * @param {object} state Redux state
 *
 * @returns {object} The status of user, whether a new or returning user
 */
function mapStateInProps(state) {
  return {
    googleAuthStatus: state.googleAuthStatus
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
    userSignInRequest,
    authorizeGoogleUser
  }, dispatch);
}

SignIn.propTypes = {
  userSignInRequest: PropTypes.func.isRequired,
  authorizeGoogleUser: PropTypes.func.isRequired,
  googleAuthStatus: PropTypes.string
};

SignIn.defaultProps = {
  googleAuthStatus: ''
};

export default connect(mapStateInProps, mapDispatchToProps)(SignIn);
