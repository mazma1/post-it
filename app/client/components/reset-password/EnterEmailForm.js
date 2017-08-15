import React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TextField from '../common/FormTextField';
import { addFlashMessage } from '../../actions/flashMessageAction';
import FlashMessageList from '../flash-message/FlashMessagesList';


class EnterEmailForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      error: ''
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { error } = this.state;
    return (
      <div className="background">
        <div className="container">
          <div className="row">
            <div className="card-panel col s12 m8 offset-m2 l6 offset-l3 z-depth-5 signin-card">
              <header className="auth-header">
                <h5 className="center">Request Password Reset</h5>
              </header>

              <form className="col s12 auth-form">
                <div className="row">
                  <div className={classnames('input-field', 'auth-field', 'col s12', { 'has-error': error })}>
                    <TextField
                      icon='perm_identity'
                      label='Email'
                      error={error}
                      onChange={this.onChange}
                      value={this.state.email}
                      field='email'
                      autocomplete='off'
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="input-field col s12">
                    <a href="#" className="btn auth-btn waves-effect waves-light col s12">Request Reset</a>
                  </div>
                </div>

                <div className="center call-to-sign-in">
                  <p className="center">Remember your password?<Link to="/signin"> Sign In</Link></p>
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

export default EnterEmailForm;
