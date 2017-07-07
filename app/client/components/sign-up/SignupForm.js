import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withRouter } from 'react-router-dom';
import validateInput from '../../validations/signupValidation';
import TextField from '../common/FormTextField';

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
            <TextField
              icon='perm_identity'
              error={errors.firstname}
              label='First Name'
              onChange={this.onChange}
              value={this.state.firstname}
              field='firstname'
            />
          </div>

          <div className={classnames('input-field', 'auth-field', 'col m6 s12', { 'has-error': errors.lastname })}>
            <TextField
              icon='perm_identity'
              error={errors.lastname}
              label='Last Name'
              onChange={this.onChange}
              value={this.state.lastname}
              field='lastname'
            />
          </div>
        </div>

        <div className="row">
          <div className={classnames('input-field', 'auth-field', 'col s12', { 'has-error': errors.username })}>
            <TextField
              icon='perm_identity'
              error={errors.username}
              label='Username'
              onChange={this.onChange}
              value={this.state.username}
              field='username'
            />  
          </div>
        </div>

        <div className="row">
          <div className={classnames('input-field', 'auth-field', 'col s12', { 'has-error': errors.email })}>
            <TextField
              icon='email'
              error={errors.email}
              label='Email'
              onChange={this.onChange}
              value={this.state.email}
              field='email'
              type='email'
            />
          </div>
        </div>

        <div className="row">
          <div className={classnames('input-field', 'auth-field', 'col s12', { 'has-error': errors.password })}>
            <TextField
              icon='https'
              error={errors.password}
              label='Password'
              onChange={this.onChange}
              value={this.state.password}
              field='password'
              type='password'
            />
          </div>
        </div>

        <div className="row">
          <div className={classnames('input-field', 'auth-field', 'col s12', { 'has-error': errors.confirm_password })}>
            <TextField
              icon='https'
              error={errors.confirm_password}
              label='Confirm Password'
              onChange={this.onChange}
              value={this.state.confirm_password}
              field='confirm_password'
              type='password'
            />
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

