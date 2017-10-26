import React from 'react';
import toastr from 'toastr';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import GoogleButton from 'react-google-login';
import { googleSignIn, verifyGoogleUser } from '../../actions/signIn';
import GoogleSignIn from '../sign-in/GoogleSignIn';

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
      newUser: '',
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
    alert('Unable to sign in with Google. Check your network and try again');
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
    this.setState({ email, token });
    this.props.verifyGoogleUser(email).then(
      (res) => {
        if (res.data.message === 'Returning user') {
          return this.props.googleSignIn(token).then(
            () => {
              toastr.success('Sign in was successful. Welcome back!');
              this.props.history.push('/message-board');
            }
          );
        }
        if (res.data.message === 'New user') {
          this.setState({ newUser: true });
        }
      }
    ).catch();
  }

  /**
   * Render
   *
   * @returns {ReactElement} SignIn page markup
   */
  render() {
    const { newUser, token } = this.state;
    return (
      <div>
        { newUser ? <GoogleSignIn token={token} /> : null }

        { !newUser ?
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
                      <GoogleButton
                        className="google-btn btn blue accent-2 waves-effect waves-light left"
                        onSuccess={this.googleSignIn}
                        onFailure={this.onFailure}
                      >
                        <span>
                          <span className="google-icon">
                            <img
                              src="../../dist/img/google.jpg"
                              alt="no-img"
                              className="google-icon google"
                            />
                          </span>
                          Sign In with Google
                        </span>
                      </GoogleButton>
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

HomePage.propTypes = {
  googleSignIn: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  verifyGoogleUser: PropTypes.func.isRequired
};

export default connect(null, { googleSignIn, verifyGoogleUser })(HomePage);
