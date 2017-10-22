import React from 'react';
import $ from 'jquery';
import toastr from 'toastr';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import mapKeys from 'lodash/mapKeys';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import GroupList from './GroupList';
import {
  ModalHeader,
  ModalBody,
  ModalFooter,
  CancelButton,
  SubmitButton } from '../../modal/SubModals';
import ModalFrame from '../../modal/ModalFrame';
import { Brand, MobileToggleBtn } from '../../misc/SidebarMisc';
import setSelectedGroup from '../../../actions/setSelectedGroup';
import { getGroupMembers } from '../../../actions/groupMembers';
import {
  getGroupMessages,
  updateReadStatus,
  getGroupMessagesCount } from '../../../actions/groupMessages';
import { getUserGroups, submitNewGroup } from '../../../actions/userGroups';


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
      newGroup: '',
      isLoading: false,
      error: {},
      groups: []
    };

    this.onChange = this.onChange.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.onGroupSelect = this.onGroupSelect.bind(this);
    this.submitNewGroup = this.submitNewGroup.bind(this);
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
            this.getUnreadCount(this.props.userGroups.groups);
            if (groupId) {
              const mappedGroups = mapKeys(this.props.userGroups.groups, 'id');
              const currentGroup = mappedGroups[groupId];
              this.props.setSelectedGroup(currentGroup);
              this.props.getGroupMessages(groupId);
              this.props.getGroupMembers(groupId);
            }
          }
        }
      )
      .catch((error) => {
        toastr.error('Unable to load groups, please try again later');
      });
    }
  }


  /**
   * Handles change event of New Group form
   *
   * @param {SyntheticEvent} event
   *
   * @returns {void}
   */
  onChange(event) {
    this.setState({
      error: {},
      [event.target.name]: event.target.value
    });
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
   * Handles Open Modal event
   *
   * @param {SyntheticEvent} event
   *
   * @returns {void}
   */
  openModal(event) {
    event.stopPropagation();
    this.setState({
      isOpen: true
    });
  }

  /**
   * Handles Close Modal event
   *
   * @param {SyntheticEvent} event
   *
   * @returns {void}
   */
  closeModal(event) {
    event.preventDefault();
    this.setState({
      isOpen: false,
      newGroup: '',
      error: {}
    });
  }


  /**
   * Adds a new group record to the DB
   *
   * @param {SyntheticEvent} event
   *
   * @returns {void}
   */
  submitNewGroup(event) {
    this.setState({ error: {}, isLoading: true });
    event.preventDefault();
    this.props.submitNewGroup({
      groupName: this.state.newGroup,
      userId: this.props.signedInUser.user.id
    }).then(
      () => {
        toastr.success('Your group has been successfully created');
        $('[data-dismiss=modal]').trigger({ type: 'click' });
        this.setState({ isLoading: false });
      },
      ({ response }) => {
        this.setState({ error: response.data, isLoading: false });
      }
    );
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
              userGroups={userGroups}
              selectedGroup={selectedGroup}
              onGroupSelect={this.onGroupSelect}
              openModal={this.openModal}
              unreadCount={this.state.groups}
            />
          </div>
        </aside>

        <ModalFrame id="createGroup" show={this.state.isOpen}>
          <ModalHeader header="Group Name" onClose={this.closeModal} />

          <ModalBody
            label="Group Name"
            field="newGroup"
            onChange={this.onChange}
            value={this.state.newGroup}
            errors={this.state.error}
            onSubmit={this.submitNewGroup}
          />

          <ModalFooter>
            <CancelButton onClick={this.closeModal} />
            <SubmitButton
              onSubmit={this.submitNewGroup}
              isLoading={this.state.isLoading}
            />
          </ModalFooter>
        </ModalFrame>
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
function mapStateToProps(state) {
  return {
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
    submitNewGroup,
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
  submitNewGroup: PropTypes.func.isRequired,
  getGroupMembers: PropTypes.func.isRequired,
  getGroupMessages: PropTypes.func.isRequired,
  getGroupMessagesCount: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

Sidebar.defaultProps = {
  selectedGroup: {}
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Sidebar));
