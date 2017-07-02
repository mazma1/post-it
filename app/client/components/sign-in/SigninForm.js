import React from 'react';

class SigninForm extends React.Component {
  render() {
    return (
      <form className="col s12 auth-form">
        <div className="row">
          <div className="input-field auth-field col s12">
            <i className="material-icons prefix">perm_identity</i>
            <input id="icon_prefix" type="text" className="validate" name='username'/>
            <label htmlFor="icon_prefix">Username</label>
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
          <div className="input-field col s12">
            <a href="#" className="btn auth-btn waves-effect waves-light col s12">Sign In</a>
          </div>
        </div>

        <div className="center call-to-sign-in">
          <p className="center">Don't have an account? <a href="/signup">Sign Up</a></p>
        </div>

        <div className="form-padding-bottom"></div>
      </form>
    );
  }
}

module.exports = SigninForm;

