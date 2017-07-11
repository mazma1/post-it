import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { addFlashMessage } from '../actions/flashMessageAction';

class EnsureLoggedIn extends React.Component {
  componentDidMount() {
    const { isLoggedIn } = this.props;

    if (!isLoggedIn) {
      this.props.addFlashMessage({
        type: 'error',
        text: 'You need to signvin to access this page'
      });
      this.props.history.push('/signin');
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

EnsureLoggedIn.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  addFlashMessage: PropTypes.func.isRequired
};


function mapStateToProps(state) {
  return {
    isLoggedIn: state.signedInUser.isAuthenticated
  };
}

export default withRouter(connect(mapStateToProps, { addFlashMessage })(EnsureLoggedIn));

