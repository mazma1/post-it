import React from 'react';
import toastr from 'toastr';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import validToken from '../utils/validateToken';

/**
    * Higher order component that validates a user before rendering it's
    * composed component
    *
    * @param {ReactComponent} ComposedComponent - Component it renders if user
    * is authenticated
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

      this.state = {
        expiredToken: null
      };
    }

    /**
      * Redirects user to sign in page if not authenticated or token
      * expired
      *
      * @returns {void}
      */
    componentWillMount() {
      const { isAuthenticated } = this.props;
      if (!isAuthenticated) {
        toastr.error('You need to sign in to access this page');
        this.props.history.push('/signin');
      }
      if (isAuthenticated && validToken()) {
        this.setState({ expiredToken: false });
      }
      if (isAuthenticated && !validToken()) {
        this.setState({ expiredToken: true });
        localStorage.removeItem('jwtToken');
        toastr.error('Session has expired. Please log in again');
        this.props.history.push('/signin');
      }
    }

    /**
      * Renders the composed component passed as parameter to CheckAuth
      *
      * @returns {ReactElement} composed component
      */
    render() {
      const { expiredToken } = this.state;
      if (expiredToken === null || expiredToken === true) {
        return null;
      }
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
