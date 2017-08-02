import React from 'react';
import { Link } from 'react-router-dom';

/**
 * HomePage component
 * @returns {ReactElement} HomePage Markup
 */
function HomePage() {
  return (
    <div className="background">
      <div className="container index-color">
        <div className="row">
          <div className="col s12 m10 offset-m1 center">
            <header className="index-header">
              <h2 className="light"><b>Welcome to PostIT!</b></h2>
            </header>
            <div className="auth">
              <h4 className="index-line-height">
                Post It is a simple application that allows you keep in touch with people that matter.
              </h4>
              <h5 className="index-desc">
                <a href="/signup">Sign Up</a> to get started!
              </h5>
              <h5 className="index-desc index-line-height">
                Already have an account? <br/><Link to="/signin">Sign In</Link> to continue enjoying Post It.
              </h5>
            </div>
            <div className="background-img-hack"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

module.exports = HomePage;
