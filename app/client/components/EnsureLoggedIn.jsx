import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import { withRouter, Route } from 'react-router-dom';
import MessageBoard from './message-board/MessageBoard';

/**
 * Component that checks if a user is logged in
 * before rendering message board component
 */
class EnsureLoggedIn extends React.Component {

  /**
   * Checks if a user is authenticated. If yes, it renders message board component
   * If no, it redirects to sign in page
   *
   * @returns {void}
   */
  componentDidMount() {
    const { isLoggedIn } = this.props;

    if (!isLoggedIn) {
      toastr.error('You need to sign in to access this page');
      this.props.history.push('/signin');
    }
  }

  /**
   * Render
   *
   * @returns {ReactElement} message board component markup
   */
  render() {
    const { isLoggedIn } = this.props;
    if (isLoggedIn) {
      return <Route path="/message-board" component={MessageBoard} />;
    }
    return null;
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
    isLoggedIn: state.signedInUser.isAuthenticated
  };
}


EnsureLoggedIn.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
};

export default withRouter(connect(mapStateToProps)(EnsureLoggedIn));

