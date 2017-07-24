import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addFlashMessage } from '../actions/flashMessageAction';

export default function(ComposedComponent) {
  class HomepageRedirect extends React.Component {
    componentWillMount() {
      if (this.props.isAuthenticated) {
        this.props.addFlashMessage({
          type: 'success',
          text: 'Welcome back!'
        });
        this.props.history.push('/message_board');
      }
    }
    render() {
      return (
        <ComposedComponent {...this.props}/>
      );
    }
  }

  HomepageRedirect.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    addFlashMessage: PropTypes.func.isRequired
  };

  function mapStateToProps(state) {
    return {
      isAuthenticated: state.signedInUser.isAuthenticated
    };
  }

  return connect(mapStateToProps, { addFlashMessage })(HomepageRedirect);
}



