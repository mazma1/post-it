import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { addFlashMessage } from '../actions/flashMessageAction';

/**
 * Component that checks if a user is logged in
 * before rendering child component
 **/
class EnsureLoggedIn extends React.Component {

  /**
   * Defines what must be executed after component mounts
   * If a user is authenticated, it renders child component
   * If user is not authenticated, it redirects to sign in page
   * with an error flash message
   * @returns {void}
   */
  componentDidMount() {
    const { isLoggedIn } = this.props;

    if (!isLoggedIn) {
      this.props.addFlashMessage({
        type: 'error',
        text: 'You need to sign in to access this page'
      });
      this.props.history.push('/signin');
    }
  }

  /**
   * Render
   * @returns {ReactElement} child component markup
   */
  render() {
    const { isLoggedIn } = this.props;
    if (isLoggedIn) {
      return this.props.children;
    }
    return null;
  }
}

/**
 * Maps pieces of the redux state to props
 * @param {object} state Redux state
 * @returns {object} User's authentication status
 */
function mapStateToProps(state) {
  return {
    isLoggedIn: state.signedInUser.isAuthenticated
  };
}


EnsureLoggedIn.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  addFlashMessage: PropTypes.func.isRequired
};

export default withRouter(connect(mapStateToProps, { addFlashMessage })(EnsureLoggedIn));

