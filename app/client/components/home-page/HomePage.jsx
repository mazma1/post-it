import React from 'react';
import toastr from 'toastr';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { authorizeGoogleUser } from '../../actions/signIn';
import GoogleSignIn from '../sign-in/GoogleSignIn';
import GoogleAuthButton from '../../components/sign-in/GoogleAuthButton';

/**
  * Displays HomePage
  *
  * @class HomePage
  *
  * @extends {React.Component}
  */
export class HomePage extends React.Component {
  /**
    * Creates an instance of HomePage
    *
    * @param {any} props
    *
    * @memberof HomePage
    */
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
   * Handles request to sign in via Google
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
    const { googleAuthStatus } = this.props;
    return (
      <div>
        {(googleAuthStatus === 'New user') ? <GoogleSignIn token={token} /> : null }

        {(googleAuthStatus !== 'New user' || googleAuthStatus === '') ?
          <div className="background">
            <div className="container index-color">
              <div className="row">
                <div className="col s12 m10 offset-m1 center">
                  <header className="index-header">
                    <h2 className="light"><b>Welcome to PostIT!</b></h2>
                  </header>
                  <div className="auth">
                    <h4 className="index-line-height">
                      Post It is a simple application that allows you keep in
                      touch with people that matter.
                    </h4>
                    <h5 className="index-desc">
                      <Link to="/signup">Sign Up</Link> to get started!
                    </h5>
                    <h5 className="index-desc index-line-height">
                      Already have an account? <br />
                      <Link to="/signin">Sign In</Link> to continue enjoying Post It.
                    </h5>
                    <div className="google-signin">
                      <h6 className="center">Or</h6>
                      <GoogleAuthButton
                        onSuccess={this.googleSignIn}
                        onFailure={this.onFailure}
                      />
                    </div>
                  </div>
                  <div className="background-img-hack" />
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

function mapStateToProps(state) {
  return {
    googleAuthStatus: state.googleAuthStatus
  };
}

HomePage.propTypes = {
  googleAuthStatus: PropTypes.string,
  authorizeGoogleUser: PropTypes.func.isRequired
};

HomePage.defaultProps = {
  googleAuthStatus: ''
};

export default connect(mapStateToProps, { authorizeGoogleUser })(HomePage);
