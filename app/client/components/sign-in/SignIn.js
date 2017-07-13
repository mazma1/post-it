import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SigninForm from './SigninForm';
import { userSigninRequest } from '../../actions/signinAction';
import { addFlashMessage } from '../../actions/flashMessageAction';
import FlashMessageList from '../flash-message/FlashMessagesList';


class SignIn extends React.Component {
  render() {
    const { userSigninRequest, addFlashMessage } = this.props;
    return (
      <div className="background">
        <div className="container">
          <div className="row">
            <div className="card-panel col s10 offset-s1 m8 offset-m2 l6 offset-l3 z-depth-5 signin-card">
              <header className="auth-header">
                <h5 className="center">Sign In | Post It</h5>
              </header>

              <FlashMessageList/>

              <SigninForm userSigninRequest={userSigninRequest} addFlashMessage={addFlashMessage}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SignIn.propTypes = {
  userSigninRequest: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired
};

export default connect(null, { userSigninRequest, addFlashMessage })(SignIn);
