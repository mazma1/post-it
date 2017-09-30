import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import { verifyToken } from '../client/actions/signIn';

export default function (ComposedComponent) {
  class Authenticate extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        validToken: null
      };
    }

    componentWillMount() {
      const token = localStorage.getItem('jwtToken');
      const { isAuthenticated } = this.props;

      if (isAuthenticated && token) {
        this.props.verifyToken(token).then(
          (res) => {
            if (res.status === 200) {
              this.setState({ validToken: true });
              toastr.success('Welcome back!');
              return this.props.history.push('/message-board');
            }
          },
          ({ response }) => {
            if (response.data.error === 'Access token has expired') {
              this.setState({ validToken: false });
              toastr.error('Session has expired. Please log in again');
              this.props.history.push('/signin');
            }
          }
        );
      }
    }
    render() {
      const token = localStorage.getItem('jwtToken');
      if (token && this.state.validToken === null) {
        return null;
      }
      return (
        <ComposedComponent {...this.props} />
      );
    }
  }


  function mapStateToProps(state) {
    return {
      isAuthenticated: state.signedInUser.isAuthenticated
    };
  }

  Authenticate.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired
  };
  return connect(mapStateToProps, { verifyToken })(Authenticate);
}
