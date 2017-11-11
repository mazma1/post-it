import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import HomePage from './home-page/HomePage';


/**
 * Renders the index page or message board depending on user's
 * authentication status
 *
 * @class HomePageRedirect
 *
 * @extends {React.Component}
 */
class HomePageRedirect extends React.Component {

/**
  * Checks a user's authentication status when accessing the index page
  * If user's session is still active (user is still authenticated),
  * user is redirected to the message board
  * If user's session has expired, the index page is rendered
  *
  * @returns {void}
  */
  componentDidMount() {
    if (this.props.isAuthenticated) {
      this.props.history.push('/message-board');
    }
  }

  /**
   * Renders component
   *
   * @returns {ReactElement} Home page component
   */
  render() {
    return <Route path="/" component={HomePage} />;
  }
}

/**
 * Maps pieces of the redux state to props
 *
 * @param {object} state Redux state
 *
 * @returns {object} User's authentication status
 */
function mapStateToProps(state) {
  return {
    isAuthenticated: state.signedInUser.isAuthenticated
  };
}

HomePageRedirect.propTypes = {
  history: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

export default connect(mapStateToProps)(HomePageRedirect);

