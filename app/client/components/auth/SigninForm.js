import React from 'react';

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

              <form className="col s12 auth-htmlForm">
                <div className="row">
                  <div className="input-field auth-field col s12">
                    <i className="material-icons prefix">perm_identity</i>
                    <input id="icon_prefix" type="text" className="validate"/>
                    <label htmlFor="icon_prefix">Username</label>
                  </div>
                </div>

                <div className="row">
                  <div className="input-field auth-field col s12">
                    <i className="material-icons prefix">https</i>
                    <input id="icon_prefix" type="password" className="validate"/>
                    <label htmlFor="icon_prefix">Password</label>
                  </div>
                </div>
                  
                <div className="row">
                  <div className="input-field col s12">
                    <a href="#" className="btn auth-btn waves-effect waves-light col s12">Sign In</a>
                  </div>
                </div>
              </form>

              <div className="center call-to-sign-in">
                <p>Don't have an account? <a href="/signup">Sign Up</a></p>
              </div>

              <div className="form-padding-bottom"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = SignIn;
