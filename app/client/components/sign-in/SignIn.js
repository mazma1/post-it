import React from 'react';
import SigninForm from './SigninForm';

class SignIn extends React.Component {
  render() {
    return (
      <div className="background">
        <div className="container">
          <div className="row">
            <div className="card-panel col s10 offset-s1 m8 offset-m2 l6 offset-l3 z-depth-5 signin-card">
              <header className="auth-header">
                <h5 className="center">Sign In | Post It</h5>
              </header>

              <SigninForm />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = SignIn;
