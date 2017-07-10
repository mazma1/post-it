import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class HomepageRedirect extends React.Component {
  componentDidMount() {
    const { isLoggedIn } = this.props;
    console.log(isLoggedIn);
    if (isLoggedIn) {
      this.props.history.push('/message_board'); // then redirect
    }
  }

  render() {
    const { isLoggedIn } = this.props;
    if (!isLoggedIn) {
      return this.props.children;
    }
    return null;
  }
}


function mapStateToProps(state) {
  return {
    isLoggedIn: state.signedInUser.isAuthenticated // True or False
  };
}

export default withRouter(connect(mapStateToProps)(HomepageRedirect));

