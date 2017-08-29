import React from 'react';
import classnames from 'classnames';
import { withRouter } from 'react-router-dom';
import toastr from 'toastr';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TextField from '../common/FormTextField.jsx';
import { validateResetPasswordToken, updatePassword } from '../../actions/resetPassword';


class NewPasswordForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      confirm_password: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onNewPasswordSubmit = this.onNewPasswordSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ errors: {} });
    this.setState({ [e.target.name]: e.target.value });
  }

  onNewPasswordSubmit(e) {
    e.preventDefault();
    const token = this.props.match.params.token;
    this.props.updatePassword({
      password: this.state.password,
      confirm_password: this.state.confirm_password,
      token
    }).then(
      () => {
        toastr.success('Password has been successfully changed. Please log in with new detail');
        this.props.history.push('/signin');
      },
      ({ response }) => this.setState({ errors: response.data })
    ).catch();

  }

  componentWillMount() {
    if (this.props.match.params.token) {
      const token = this.props.match.params.token;
      this.props.validateResetPasswordToken({ token }).then(
        () => {
          // DO nothing, mount component if token is valid
        },
        ({ response }) => {
          let flashErrorMsg = '';
          if (response.data === 'Token has expired') {
            flashErrorMsg = 'Reset link has expired';
          } else if (response.data === 'Token does not exist') {
            flashErrorMsg = 'Reset link has expired';
          }
          // Redirect to forgot password page
          toastr.error(`${flashErrorMsg}. Enter your email to receive a valid link`);
          this.props.history.push('/reset_password');
        }
      );
    }
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="background">
        <div className="container">
          <div className="row">
            <div className="card-panel col s12 m8 offset-m2 l6 offset-l3 z-depth-5 signin-card">
              <header className="auth-header">
                <h5 className="center">Enter New Password</h5>
              </header>

              <form className="col s12 auth-form" onSubmit={this.onNewPasswordSubmit}>
                <div className="row">
                  <div className={classnames('input-field', 'auth-field', 'col s12', { 'has-error': errors.password })}>
                    <TextField
                      icon='https'
                      label='New Password'
                      error={errors.password}
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
                      label='Confirm Password'
                      error={errors.confirm_password}
                      onChange={this.onChange}
                      value={this.state.confirm_password}
                      field='confirm_password'
                      type='password'
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="input-field col s12">
                    <a className="btn auth-btn waves-effect waves-light col s12" onClick={this.onNewPasswordSubmit}>Update Password</a>
                  </div>
                </div>

                <div className="form-padding-bottom"></div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    validateResetPasswordToken,
    updatePassword
  }, dispatch);
}

export default withRouter(connect(null, mapDispatchToProps)(NewPasswordForm));
