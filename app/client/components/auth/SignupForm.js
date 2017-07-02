import React from 'react';

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

              <form className="col s12 auth-form">
                <div className="row">
                  <div className="input-field auth-field col m6 s12">
                    <i className="material-icons prefix">perm_identity</i>
                    <input id="icon_prefix" type="text" className="validate" name='firstname'/>
                    <label htmlFor="icon_prefix">First Name</label>
                  </div>

                  <div className="input-field auth-field col m6 s12">
                    <i className="material-icons prefix">perm_identity</i>
                    <input id="icon_prefix" type="text" className="validate" name='lastname'/>
                    <label htmlFor="icon_prefix">Last Name</label>
                  </div>
                </div>

                <div className="row">
                  <div className="input-field auth-field col s12">
                    <i className="material-icons prefix">perm_identity</i>
                    <input id="icon_prefix" type="text" className="validate" name='username'/>
                    <label htmlFor="icon_prefix">Username</label>
                  </div>
                </div>

                <div className="row">
                  <div className="input-field auth-field col s12">
                    <i className="material-icons prefix">email</i>
                    <input id="icon_prefix" type="email" className="validate" name='email'/>
                    <label htmlFor="icon_prefix">Email</label>
                  </div>
                </div>

                <div className="row">
                  <div className="input-field auth-field col s12">
                    <i className="material-icons prefix">https</i>
                    <input id="icon_prefix" type="password" className="validate" name='password'/>
                    <label htmlFor="icon_prefix">Password</label>
                  </div>
                </div>

                <div className="row">
                  <div className="input-field auth-field col s12">
                    <i className="material-icons prefix">https</i>
                    <input id="icon_prefix" type="password" className="validate" name='confirm_password'/>
                    <label htmlFor="icon_prefix">Confirm Password</label>
                  </div>
                </div>
                  
                <div className="row">
                  <div className="input-field col s12">
                    <a href="#" className="auth-btn btn waves-effect waves-light col s12">Sign Up</a>
                  </div>
                </div>
              </form>

              <div className="center call-to-sign-in">
                <p>Already have an account? <a href="/signin">Sign In</a></p>
              </div>

              <div className="form-padding-bottom"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = SignUp;
