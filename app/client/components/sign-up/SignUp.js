import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import SignupForm from './SignupForm';
import { userSignupRequest } from '../../actions/signupActions';

class SignUp extends React.Component {
  render() {
    const { userSignupRequest } = this.props;
    return (
      <div className="background">
        <div className="container">
          <div className="row">
            <div className="card-panel col s10 offset-s1 m8 offset-m2 l6 offset-l3 z-depth-5 signup-panel">
              <header className="auth-header">
                <h5 className="center">Sign up | Post It</h5>
              </header>

              <SignupForm userSignupRequest={userSignupRequest}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SignUp.propTypes = {
  userSignupRequest: PropTypes.func.isRequired
};

export default connect(null, { userSignupRequest })(SignUp);
