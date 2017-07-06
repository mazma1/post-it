import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withRouter } from 'react-router-dom';
import validateInput from '../../validations/signup';

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      username: '',
      email: '',
      password: '',
      confirm_password: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSignupClick = this.onSignupClick.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  valid() {
    const { errors, valid } = validateInput(this.state);

    if (!valid) {
      this.setState({ errors });
    }

    return valid;
  }

  onSignupClick(e) {
    e.preventDefault();

    if (this.valid()) {
      this.setState({ errors: {} });
      this.props.userSignupRequest(this.state).then(
        () => {
          this.props.history.push('/message_board');
        },
        ({ response }) => this.setState({ errors: response.data })
      );
    }
  }

  render() {
    const { errors } = this.state;
    return (
      <form className="col s12 auth-form">
        <div className="row">
          <div className={classnames('input-field', 'auth-field', 'col m6 s12', { 'has-error': errors.firstname })}>
            <i className="material-icons prefix">perm_identity</i>
            <input id="icon_prefix" type="text" className={ classnames('validate', { 'invalid': errors.firstname })} name='firstname' value={this.state.firstname} onChange={this.onChange}/>
            <label htmlFor="icon_prefix">First Name</label>
            {errors.firstname && <span className="help-block">{errors.firstname}</span>}
          </div>

          <div className={classnames('input-field', 'auth-field', 'col m6 s12', { 'has-error': errors.lastname })}>
            <i className="material-icons prefix">perm_identity</i>
            <input id="icon_prefix" type="text" className={classnames('validate', { 'invalid': errors.lastname })} name='lastname' value={this.state.lastname} onChange={this.onChange}/>
            <label htmlFor="icon_prefix">Last Name</label>
            {errors.lastname && <span className="help-block">{errors.lastname}</span>}
          </div>
        </div>

        <div className="row">
          <div className={classnames('input-field', 'auth-field', 'col s12', { 'has-error': errors.username })}>
            <i className="material-icons prefix">perm_identity</i>
            <input id="icon_prefix" type="text" className={ classnames('validate', { 'invalid': errors.username })} name='username' value={this.state.username} onChange={this.onChange}/>
            <label htmlFor="icon_prefix">Username</label>
            {errors.username && <span className="help-block">{errors.username}</span>}
          </div>
        </div>

        <div className="row">
          <div className={classnames('input-field', 'auth-field', 'col s12', { 'has-error': errors.email })}>
            <i className="material-icons prefix">email</i>
            <input id="icon_prefix" type="email" className={classnames('validate', { 'invalid': errors.email })} name='email' value={this.state.email} onChange={this.onChange}/>
            <label htmlFor="icon_prefix">Email</label>
            {errors.email && <span className="help-block">{errors.email}</span>}
          </div>
        </div>

        <div className="row">
          <div className={classnames('input-field', 'auth-field', 'col s12', { 'has-error': errors.password })}>
            <i className="material-icons prefix">https</i>
            <input id="icon_prefix" type="password" className={classnames('validate', { 'invalid': errors.password })} name='password' value={this.state.password} onChange={this.onChange}/>
            <label htmlFor="icon_prefix">Password</label>
            {errors.password && <span className="help-block">{errors.password}</span>}
          </div>
        </div>

        <div className="row">
          <div className={classnames('input-field', 'auth-field', 'col s12', { 'has-error': errors.confirm_password })}>
            <i className="material-icons prefix">https</i>
            <input id="icon_prefix" type="password" className={classnames('validate', { 'invalid': errors.confirm_password })} name='confirm_password' value={this.state.confirm_password} onChange={this.onChange}/>
            <label htmlFor="icon_prefix">Confirm Password</label>
            {errors.confirm_password && <span className="help-block">{errors.confirm_password}</span>}
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

export default withRouter(SignupForm);

