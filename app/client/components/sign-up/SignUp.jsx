import React from 'react';
import SignUpForm from './SignUpForm';

/**
 * Displays sign up page
 *
 * @returns {JSX} Sign up page mark up
 */
export const SignUp = () => (
  <div className="background">
    <div className="container">
      <div className="row">
        <div
          className="card-panel col s12 m8 offset-m2 l6 offset-l3 z-depth-5 signup-panel"
        >
          <header className="auth-header">
            <h5 className="center">Sign Up | Post It</h5>
          </header>

          <SignUpForm />
        </div>
      </div>
    </div>
  </div>
);


export default SignUp;
