import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setRedirectUrl } from '../actions/signinAction';

class EnsureLoggedIn extends React.Component {
  componentDidMount() {
    const { dispatch, currentURL, isLoggedIn } = this.props;

    if (!isLoggedIn) {
      dispatch(setRedirectUrl(currentURL)); // Set current URL for future redirection
      this.props.history.push('/signin'); // then redirect
    }
  }

  render() {
    const { isLoggedIn } = this.props;
    if (isLoggedIn) {
      return this.props.children;
    }
    return null;
  }
}

// Grab a reference to the current URL using 'ownProps'
function mapStateToProps(state, ownProps) {
  return {
    isLoggedIn: state.signedInUser.isAuthenticated,
    currentURL: ownProps.location.pathname
  };
}

export default withRouter(connect(mapStateToProps)(EnsureLoggedIn));

