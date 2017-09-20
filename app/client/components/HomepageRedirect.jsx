import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import HomePage from './home-page/HomePage';


/** HomepageRedirect Component */
class HomepageRedirect extends React.Component {

/**
 * Defines what must be executed before component mounts
 * Checks a userr's authentication status when accessing the index page
 * If user's session is still active (user is still authenticated),
 * user is redirected to the message board
 * If user's session has expired, the index page is rendered
 * @returns {void}
 */
  componentWillMount() {
    if (this.props.isAuthenticated) {
      toastr.success('Welcome back!');
      this.props.history.push('/message-board');
    }
  }

  /**
 * Render
 * @returns {ReactElement} ComposedComponent
 */
  render() {
    return <Route path="/" component={HomePage} />;
  }
}

/**
 * Maps pieces of the redux state to props
 * @param {object} state Redux state
 * @returns {object} User's authentication status
 */
function mapStateToProps(state) {
  return {
    isAuthenticated: state.signedInUser.isAuthenticated
  };
}

HomepageRedirect.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
};

export default connect(mapStateToProps)(HomepageRedirect);

