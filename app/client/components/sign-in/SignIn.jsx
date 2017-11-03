import React from 'react';
import toastr from 'toastr';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SignInForm from './SignInForm';
import GoogleSignIn from '../sign-in/GoogleSignIn';
import { userSignInRequest, authorizeGoogleUser } from '../../actions/signIn';
import GoogleAuthButton from '../../components/sign-in/GoogleAuthButton';


/**
 * Displays sign in page
 *
 * @class SignIn
 *
 * @extends {React.Component}
 */
export class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      token: ''
    };

    this.googleSignIn = this.googleSignIn.bind(this);
    this.onFailure = this.onFailure.bind(this);
  }

  /**
  * Reports if there is an error during google sign in
  *
  * @param {any} error details of error that occurs
  *
  * @memberof HomePage
  */
  onFailure(error) {
    toastr.error('Unable to sign in with Google.Check your network and try again');
  }

  /**
   * Handles request to sign in a user via Google
   *
   * @param {any} response response received from Google API
   *
   * @memberof HomePage
   */
  googleSignIn(response) {
    const email = response.profileObj.email;
    const token = response.tokenId;
    this.setState({ token });
    this.props.authorizeGoogleUser({ email, token });
  }

  /**
   * Render
   *
   * @returns {ReactElement} SignIn page markup
   */
  render() {
    const { token } = this.state;
    const { googleAuthStatus, userSignInRequest } = this.props;
    return (
      <div>
        {
          (googleAuthStatus === 'New user') ?
            <GoogleSignIn token={token} />
          : null
        }

        {
          (googleAuthStatus !== 'New user' || googleAuthStatus === '') ?
            <div className="background">
              <div className="container">
                <div className="row">
                  <div className="card-panel col s12 m8 offset-m2 l6 offset-l3 z-depth-5 signin-card">
                    <header className="auth-header">
                      <h5 className="center">Sign In | Post It</h5>
                    </header>

                    <SignInForm userSignInRequest={userSignInRequest} />

                    <hr className="google-hr" />
                    <h6 className="google-option">or</h6>
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
