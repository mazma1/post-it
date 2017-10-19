import React from 'react';
import toastr from 'toastr';
import jwt from 'jsonwebtoken';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


/**
   * Higher order component that validates a user before rendering it's
   * composed component
   *
   * @param {ReactComponent} ComposedComponet component it renders if user is
   * authenticated
   *
   * @returns {ReactComponent} CheckAuth
   */
export default function (ComposedComponent) {
  /**
   * Check the authentication status of a user
   *
   * @class CheckAuth
   *
   * @extends {React.Component}
   */
  class CheckAuth extends React.Component {

    /**
     * Creates an instance of CheckAuth
     *
     * @param {any} props
     *
     * @memberof CheckAuth
     */
    constructor(props) {
      super(props);

      this.isExpired = this.isExpired.bind(this);
    }

    /**
     * Redirects user to sign in page if not authenticated or token has
     * expired
     *
     * @returns {void}
     */
    componentWillMount() {
      const token = localStorage.getItem('jwtToken');
      const { isAuthenticated } = this.props;
      if (!isAuthenticated) {
        toastr.error('You need to sign in to access this page');
        this.props.history.push('/signin');
      }
      if (isAuthenticated && token && this.isExpired(token)) {
        localStorage.removeItem('jwtToken');
        toastr.error('Session has expired. Please log in again');
        this.props.history.push('/signin');
      }
    }

    /**
     * Checks if the token in the local storage is still valid or expired
     *
     * @param token authentication token retrieved from local storage
     *
     * @returns {boolean} validity of token
     */
    isExpired(token) {
      const expiryDate = jwt.decode(token).exp;
      return expiryDate < Date.now() / 1000;
    }

    /**
     * Renders the composed component passed as parameter to CheckAuth
     *
     * @returns {ReactElement} composed component
     */
    render() {
      return (
        <ComposedComponent {...this.props} />
      );
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

  CheckAuth.propTypes = {
    history: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool.isRequired
  };
  return connect(mapStateToProps)(CheckAuth);
}
