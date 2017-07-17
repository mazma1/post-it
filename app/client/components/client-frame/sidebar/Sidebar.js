import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import GroupList from './GroupList';
import { getUserGroups } from '../../../actions/getUserGroupsAction';
import { setSelectedGroup } from '../../../actions/setSelectedGroupAction';

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
  constructor(props) {
    super(props);
  //   this.state = {
  //     selectedGroupId: ''
  //   };

    this.onGroupSelect = this.onGroupSelect.bind(this);
  }

  componentWillMount() {
    const userId = this.props.signedInUser.user.data.id;  // signedInUser.user.data{id, firstname,....}
    this.props.getUserGroups(userId).then(
      () => {
        if (this.props.userGroups.hasGroup === false) {
          this.props.setSelectedGroup({});
        } else {
          this.props.setSelectedGroup(this.props.userGroups.groups[0]);
        }
      }
    );
  }

  onGroupSelect(group) {
    this.props.setSelectedGroup(group);
  }

  render() {
    const { userGroups, selectedGroup } = this.props;
    return (
      <aside className="navbar-default mobile-navbar">
        <div id="sidebar">
          <Brand brand_name='Post It'/>
          <MobileToggleBtn />

          <GroupList
            userGroups={userGroups}
            selectedGroup={selectedGroup}
            onGroupSelect={this.onGroupSelect}
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
    userGroups: state.userGroups,
    selectedGroup: state.selectedGroup
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getUserGroups,
    setSelectedGroup
  }, dispatch);
}

Sidebar.propTypes = {
  signedInUser: PropTypes.object.isRequired,
  getUserGroups: PropTypes.func.isRequired,
  userGroups: PropTypes.object.isRequired,
  setSelectedGroup: PropTypes.func.isRequired,
  selectedGroup: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
