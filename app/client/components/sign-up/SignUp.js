import React from 'react';
import SignupForm from './SignupForm';

class SignUp extends React.Component {
  render() {
    return (
      <div className="background">
        <div className="container">
          <div className="row">
            <div className="card-panel col s10 offset-s1 m8 offset-m2 l6 offset-l3 z-depth-5 signup-panel">
              <header className="auth-header">
                <h5 className="center">Sign up | Post It</h5>
              </header>
              
              <SignupForm />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = SignUp;
