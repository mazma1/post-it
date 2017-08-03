import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addFlashMessage } from '../actions/flashMessageAction';


/**
 * Function that controls what is rendered when the index page is visited
 * @param {ReactComponent} ComposedComponent Function argument
 * @returns {ReactComponent} HomePageRedirect component
 **/
export default function (ComposedComponent) {
  /** HomepageRedirect Component */
  class HomepageRedirect extends React.Component {

  /**
   * Defines what must be executed before component mounts
   * If user's session is still active (user is still authenticated),
   * user is redirected to the message board
   * If user's session has expired, the index page is rendered
   * @returns {void}
   */
    componentWillMount() {
      if (this.props.isAuthenticated) {
        this.props.addFlashMessage({
          type: 'success',
          text: 'Welcome back!'
        });
        this.props.history.push('/message_board');
      }
    }

    /**
   * Render
   * @returns {ReactElement} ComposedComponent
   */
    render() {
      return (
        <ComposedComponent {...this.props}/>
      );
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
    isAuthenticated: PropTypes.bool.isRequired,
    addFlashMessage: PropTypes.func.isRequired
  };

  return connect(mapStateToProps, { addFlashMessage })(HomepageRedirect);
}



