import React from 'react';
import PropTypes from 'prop-types';


class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      username: '',
      email: '',
      password: '',
      confirm_password: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onSignupClick = this.onSignupClick.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSignupClick(e) {
    e.preventDefault();
    this.props.userSignupRequest(this.state);
  }

  render() {
    return (
      <form className="col s12 auth-form">
        <div className="row">
          <div className="input-field auth-field col m6 s12">
            <i className="material-icons prefix">perm_identity</i>
            <input id="icon_prefix" type="text" className="validate" name='firstname' value={this.state.firstname} onChange={this.onChange}/>
            <label htmlFor="icon_prefix">First Name</label>
          </div>

          <div className="input-field auth-field col m6 s12">
            <i className="material-icons prefix">perm_identity</i>
            <input id="icon_prefix" type="text" className="validate" name='lastname' value={this.state.lastname} onChange={this.onChange}/>
            <label htmlFor="icon_prefix">Last Name</label>
          </div>
        </div>

        <div className="row">
          <div className="input-field auth-field col s12">
            <i className="material-icons prefix">perm_identity</i>
            <input id="icon_prefix" type="text" className="validate" name='username' value={this.state.username} onChange={this.onChange}/>
            <label htmlFor="icon_prefix">Username</label>
          </div>
        </div>

        <div className="row">
          <div className="input-field auth-field col s12">
            <i className="material-icons prefix">email</i>
            <input id="icon_prefix" type="email" className="validate" name='email' value={this.state.email} onChange={this.onChange}/>
            <label htmlFor="icon_prefix">Email</label>
          </div>
        </div>

        <div className="row">
          <div className="input-field auth-field col s12">
            <i className="material-icons prefix">https</i>
            <input id="icon_prefix" type="password" className="validate" name='password' value={this.state.password} onChange={this.onChange}/>
            <label htmlFor="icon_prefix">Password</label>
          </div>
        </div>

        <div className="row">
          <div className="input-field auth-field col s12">
            <i className="material-icons prefix">https</i>
            <input id="icon_prefix" type="password" className="validate" name='confirm_password' value={this.state.confirm_password} onChange={this.onChange}/>
            <label htmlFor="icon_prefix">Confirm Password</label>
          </div>
        </div>
          
        <div className="row">
          <div className="input-field col s12">
            <a className="auth-btn btn waves-effect waves-light col s12" onClick={this.onSignupClick}>Sign Up</a>
          </div>
        </div>

        <div className="call-to-sign-in">
          <p className="center">Already have an account? <a href="/signin">Sign In</a></p>
        </div>

        <div className="form-padding-bottom"></div>
      </form>
    );
  }
}

SignupForm.propTypes = {
  userSignupRequest: PropTypes.func.isRequired
};

module.exports = SignupForm;

