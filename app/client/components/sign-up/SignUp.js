import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import SignupForm from './SignupForm';
import { userSignupRequest } from '../../actions/signupActions';
import { userSigninRequest } from '../../actions/signinAction';
import { addFlashMessage } from '../../actions/flashMessageAction';

class SignUp extends React.Component {
  render() {
    const { userSignupRequest, userSigninRequest, addFlashMessage } = this.props;
    return (
      <div className="background">
        <div className="container">
          <div className="row">
            <div className="card-panel col s10 offset-s1 m8 offset-m2 l6 offset-l3 z-depth-5 signup-panel">
              <header className="auth-header">
                <h5 className="center">Sign up | Post It</h5>
              </header>

              <SignupForm 
                userSignupRequest={userSignupRequest}
                userSigninRequest={userSigninRequest}
                addFlashMessage={addFlashMessage}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    userSignupRequest,
    userSigninRequest,
    addFlashMessage
  }, dispatch);
}

SignUp.propTypes = {
  userSignupRequest: PropTypes.func.isRequired,
  userSigninRequest: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired
};


export default connect(null, mapDispatchToProps)(SignUp);
