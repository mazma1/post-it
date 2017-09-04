import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import $ from 'jquery';
import toastr from 'toastr';
import isEmpty from 'lodash/isEmpty';
import GroupList from './GroupList.jsx';
import ModalFrame from '../../modal/ModalFrame.jsx';
import { Brand, MobileToggleBtn } from '../../misc/SidebarMisc.jsx'
import { getUserGroups, submitNewGroup } from '../../../actions/userGroups';
import { setSelectedGroup } from '../../../actions/setSelectedGroup';
import { getGroupMembers } from '../../../actions/groupMembers';
import {
  getGroupMessages,
  updateReadStatus,
  getGroupMessagesCount } from '../../../actions/groupMessages';
import {
  ModalHeader,
  ModalBody,
  ModalFooter,
  CancelButton,
  SubmitButton } from '../../modal/SubModals.jsx';

/**
 * Sidebar component for message board
 * Child components: GroupList and Create Group modal
 */
export class Sidebar extends React.Component {

  /**
   * Constructor
   * @param {object} props
   */
  constructor(props) {
    super(props);

    /**
     * @type {object}
     * @prop {boolean} isOpen Tells if a modal is open or not
     * @prop {string} newGroup Name of new group to be created
     * @prop {boolean} isLoading Tells if the request to create
     * new group has been completed or not
     * @prop {string} error Error message if the group was not created
     * successfully
     * @prop {array} groups Groups with their notification counts
     */
    this.state = {
      isOpen: false,
      newGroup: '',
      isLoading: false,
      error: '',
      groups: []
    };

    this.onGroupSelect = this.onGroupSelect.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.onChange = this.onChange.bind(this);
    this.newGroupSubmit = this.newGroupSubmit.bind(this);
    this.getUnreadCount = this.getUnreadCount.bind(this);
  }

  /**
   * Defines what must be executed before sidebar component mounts
   * It dispatches getUserGroups action to fetch the groups a signed
   * in user belongs to
   * If no group was found, it dispatches setSelectedGroup with an empty object
   * If groups were found:
   * it sets the first group from the returned groups as active
   * it fetches the messages and members belonging to the first group
   * @returns {void}
   */
  componentWillMount() {
    const userId = this.props.signedInUser.user.id;
    this.props.getUserGroups(userId).then(
      () => {
        if (this.props.userGroups.hasGroup === false) {
          this.props.setSelectedGroup({});
        } else {
          this.props.setSelectedGroup(this.props.userGroups.groups[0]);
          this.props.getGroupMessages(this.props.userGroups.groups[0].id);
          this.props.getGroupMembers(this.props.userGroups.groups[0].id);
        }
      }
    )
    .catch((error) => {
      toastr.error(`Unable to load user groups, ${error.message}`);
    });
  }

  /**
  * getUnreadCount is called when the component mounts
  * It gets the number of unread messgages a user has in a group
  * @param {void} null
  * @returns {void} null
  */
  componentDidMount() {
    this.getUnreadCount();
  }

  /**
   * Handles Open Modal event
   * Updates isOpen state
   * @param {SyntheticEvent} event
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
   * Updates isOpen, newGroup and error states
   * @param {SyntheticEvent} event
   * @returns {void}
   */
  closeModal(event) {
    event.preventDefault();
    this.setState({
      isOpen: false,
      newGroup: '',
      error: ''
    });
  }

  /**
   * Handles change event of New Group input form
   * Updates isOpen and newGroup states
   * @param {SyntheticEvent} event
   * @returns {void}
   */
  onChange(event) {
    this.setState({
      error: '',
      [event.target.name]: event.target.value
    });
  }

  /**
   * Function that gets count of messages unread by a user
   * @param {void} null
   * @returns {void} null
   */
  getUnreadCount() {
    const groupsWithNotification = [];
    const username = this.props.signedInUser.user.username;

    this.props.getUserGroups(this.props.signedInUser.user.id).then(
      () => {
        if (!this.props.userGroups.isLoading) {
          const groups = this.props.userGroups.groups;
          if (!isEmpty(groups)) {
            groups.map((group) => {
              this.props.getGroupMessagesCount(group.id).then(
                (res) => {
                  // map returned message array
                  let unreadCount = 0;
                  res.data.map((message) => {
                    if (!message.read_by.split(',').includes(username)) {
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
              );
            });
          }
        }
      });
  }


  /**
   * Handles Submit New Group event
   * Dispatches submitNewGroup action to add the new group record to the DB
   * If the submission was successful, it adds a success flash message
   * If submission was not successful, it returns the appropriate error message
   * @param {SyntheticEvent} event
   * @returns {void}
   */
  newGroupSubmit(event) {
    this.setState({ error: '', isLoading: true });
    event.preventDefault();
    this.props.submitNewGroup({
      group_name: this.state.newGroup,
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
   * Is called when a group name on the sidebar is clicked
   * It sets the clicked group as active
   * It fetches the messages that belong to the group
   * It fetches the members that belong to the group
   * @param {object} group Details of clicked group
   * @prop {number} group.id Group id
   * @prop {string} group.name Group name
   * @returns {void}
   */
  onGroupSelect(group) {
    this.props.setSelectedGroup(group);
    this.props.getGroupMessages(group.id);
    this.props.getGroupMembers(group.id);
  }

  /**
   * Render
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

        {/*Create Group Modal*/}
        <ModalFrame id="createGroup" show={this.state.isOpen}>
          <ModalHeader header="Group Name" onClose={this.closeModal} />

          <ModalBody
            label="Group Name"
            field="newGroup"
            onChange={this.onChange}
            value={this.state.newGroup}
            errors={this.state.error}
            onSubmit={this.newGroupSubmit}
          />

          <ModalFooter>
            <CancelButton onClick={this.closeModal} />
            <SubmitButton
              onSubmit={this.newGroupSubmit}
              isLoading={this.state.isLoading}
            />
          </ModalFooter>
        </ModalFrame>
      </div>
    );
  }
}

/**
 * Maps pieces of the redux state to props
 * Whatever is returned will show up as props in Sidebar
 * @param {object} state Redux state
 * @returns {object} Details of signed in user, his groups and the active group
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
 * Maps action creators to redux dispatch function
 * Action creators bound will be available as props in Sidebar
 * Actions generated by the action creators flows though all the reducers
 * @param {function} dispatch Redux dispatch function
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
  getGroupMessagesCount: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
