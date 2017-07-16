import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import GroupList from './GroupList';
import { getUserGroups } from '../../../actions/getUserGroupsAction';

const Brand = (props) => {
  return (
    <div id="brand-name">
      {props.brand_name}
    </div>
  );
};

const MobileToggleBtn = () => {
  return (
    <button type="button" className="mobile-nav-btn  navbar-toggle collapsed" data-toggle="collapse" data-target="#menu-content" aria-expanded="false" aria-controls="menu-content">
      <span className="sr-only">Toggle navigation</span>
      <span className="icon-bar"></span>
      <span className="icon-bar"></span>
      <span className="icon-bar"></span>
    </button>
  );
};

class Sidebar extends React.Component {
  componentWillMount() {
    const userId = this.props.signedInUser.user.data.id;  // signedInUser.user.data{id, firstname,....}
    this.props.getUserGroups(userId);  // Dispatch (thunk) action fetch groups
  }

  render() {
    const { signedInUser, getUserGroups, userGroups } = this.props;
    return (
      <aside className="navbar-default mobile-navbar">
        <div id="sidebar">
          <Brand brand_name='Post It'/>
          <MobileToggleBtn />

          <GroupList
            signedInUser={signedInUser}
            getUserGroups={getUserGroups}
            userGroups={userGroups}
          />
        </div>
      </aside>
    );
  }
}

function mapStateToProps(state) {
  // Whatever is returned will show up as props in Sidebar
  return {
    signedInUser: state.signedInUser,
    userGroups: state.userGroups
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getUserGroups
  }, dispatch);
}

Sidebar.propTypes = {
  signedInUser: PropTypes.object.isRequired,
  getUserGroups: PropTypes.func.isRequired,
  userGroups: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
