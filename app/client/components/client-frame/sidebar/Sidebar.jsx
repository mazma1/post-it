import React from 'react';
import toastr from 'toastr';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import mapKeys from 'lodash/mapKeys';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import GroupList from './GroupList';
import { Brand, MobileToggleBtn } from '../../misc/SidebarMisc';
import setSelectedGroup from '../../../actions/setSelectedGroup';
import { getGroupMembers } from '../../../actions/groupMembers';
import {
  getGroupMessages,
  updateReadStatus,
  getGroupMessagesCount } from '../../../actions/groupMessages';
import { getUserGroups } from '../../../actions/userGroups';


/**
  * Display Sidebar
  *
  * @class Sidebar
  *
  * @extends {React.Component}
  */
export class Sidebar extends React.Component {

  /**
    * Creates an instance of Sidebar
    *
    * @param {any} props
    *
    * @memberof Sidebar
    */
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isLoading: false,
      groups: []
    };

    this.onGroupSelect = this.onGroupSelect.bind(this);
    this.getUnreadCount = this.getUnreadCount.bind(this);
  }

  /**
   * Fetches the groups a signed in user belongs to
   *
   * @returns {void}
   */
  componentWillMount() {
    const token = localStorage.getItem('jwtToken');
    let expiredToken;
    if (token) {
      const expiryDate = jwt.decode(token).exp;
      expiredToken = expiryDate < Date.now() / 1000;
    }
    const userId = this.props.signedInUser.user.id;
    if (userId && expiredToken === false) {
      this.props.getUserGroups(userId).then(
        () => {
          if (this.props.userGroups.hasGroup === false) {
            this.props.setSelectedGroup({});
          } else {
            const groupId = this.props.match.params.groupId;
            // this.getUnreadCount(this.props.userGroups.groups);
            if (groupId) {
              const mappedGroups = mapKeys(this.props.userGroups.groups, 'id');
              const currentGroup = mappedGroups[groupId];
              if (currentGroup) {
                this.props.setSelectedGroup(currentGroup);
                this.props.getGroupMessages(groupId);
                this.props.getGroupMembers(groupId);
              } else {
                toastr.error('Group does not exist');
                this.props.history.push('/message-board');
              }
            }
          }
        }
      )
      .catch((error) => {
        toastr.error('Group does not exist');
        this.props.history.push('/message-board');
      });
    }
  }

  /**
    * Rerenders the component when active groups change
    *
    * @param {object} nextProps new props passed to Sidebar component
    *
    * @returns {boolean}
    */
  shouldComponentUpdate(nextProps) {
    if (nextProps.selectedGroup.id !== this.props.selectedGroup.id) {
      return true;
    }
    return nextProps.userGroups.groups > this.props.userGroups.groups;
  }


  /**
  * Sets a clicked group as active and fetches the messages and members
  * that belong to the group
  *
  * @param {object} group Details of clicked group
  *
  * @returns {void}
  */
  onGroupSelect(group) {
    const groupId = group.id;
    this.props.history.push(`/message-board/${groupId}`);
    this.props.setSelectedGroup(group);
    this.props.getGroupMessages(group.id);
    this.props.getGroupMembers(group.id);
  }


  /**
   * Function that gets count of messages unread by a user in a group
   *
   * @param {void} null
   *
   * @returns {void} null
   */
  getUnreadCount(groups) {
    const groupsWithNotification = [];
    const { username } = this.props.signedInUser.user;
    if (!isEmpty(groups)) {
      groups.map(group => this.props.getGroupMessagesCount(group.id)
        .then(
          (res) => {
            let unreadCount = 0;
            res.data.messages.map((message) => {
              if (!message.readBy.split(',').includes(username)) {
                unreadCount += 1;
              }
            });
            groupsWithNotification.push({
              id: group.id,
              name: group.name,
              unreadCount
            });
            this.setState({ groups: groupsWithNotification });
          }
        )
      );
    }
  }


  /**
   * Render
   *
   * @returns {ReactElement} Sidebar markup
   */
  render() {
    const { userGroups, selectedGroup } = this.props;
    return (
      <div>
        <aside className="navbar-default mobile-navbar">
          <div id="sidebar">
            <Brand brandName="Post It" />
            <MobileToggleBtn />

            <GroupList
              pathName={this.props.pathName}
              userGroups={userGroups}
              selectedGroup={selectedGroup}
              onGroupSelect={this.onGroupSelect}
              openModal={this.openModal}
              unreadCount={this.state.groups}
            />
          </div>
        </aside>
      </div>
    );
  }
}

/**
 * Maps pieces of the redux state to props in Sidebar
 *
 * @param {object} state Redux state
 *
 * @returns {object} Details of signed in user, his groups and the active group
 * and the group messages
 */
function mapStateToProps(state, ownProps) {
  return {
    pathName: ownProps.location.pathname,
    signedInUser: state.signedInUser,
    userGroups: state.userGroups,
    selectedGroup: state.selectedGroup,
    messages: state.groupMessages.messages
  };
}


/**
 * Maps action creators to redux dispatch function and avails them as props
 *
 * @param {function} dispatch Redux dispatch function
 *
 * @returns {function} Action cretaors bound to redux dispatch function
 */
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getUserGroups,
    setSelectedGroup,
    getGroupMessages,
    getGroupMembers,
    updateReadStatus,
    getGroupMessagesCount
  }, dispatch);
}

Sidebar.propTypes = {
  signedInUser: PropTypes.object.isRequired,
  getUserGroups: PropTypes.func.isRequired,
  userGroups: PropTypes.object.isRequired,
  setSelectedGroup: PropTypes.func.isRequired,
  selectedGroup: PropTypes.object,
  getGroupMembers: PropTypes.func.isRequired,
  getGroupMessages: PropTypes.func.isRequired,
  getGroupMessagesCount: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  pathName: PropTypes.string.isRequired
};

Sidebar.defaultProps = {
  selectedGroup: {}
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Sidebar));
