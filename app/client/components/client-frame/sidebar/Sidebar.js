import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import GroupList from './GroupList';
import $ from 'jquery';
import { getUserGroups, submitNewGroup } from '../../../actions/userGroupsAction';
import { setSelectedGroup } from '../../../actions/setSelectedGroupAction';
import { getGroupMessages } from '../../../actions/groupMessagesAction';
import { getGroupMembers } from '../../../actions/groupMembersAction';
import { addFlashMessage } from '../../../actions/flashMessageAction';
import ModalFrame from '../../modal/ModalFrame';
import { ModalHeader, ModalBody, ModalFooter, CancelButton, SubmitButton } from '../../modal/SubModals';

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

/**
 * Sidebar component for message board
 * Child components: GroupList and Create Group modal
 */
class Sidebar extends React.Component {

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
     * @prop {boolean} isLoading Tells if the request to create new group has been completed or not
     * @prop {string} error Error message if the group was not created successfully
     */
    this.state = {
      isOpen: false,
      newGroup: '',
      isLoading: false,
      error: ''
    };

    this.onGroupSelect = this.onGroupSelect.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.onChange = this.onChange.bind(this);
    this.newGroupSubmit = this.newGroupSubmit.bind(this);
  }

  /**
   * Handles Open Modal event
   * Updates isOpen state
   * @param {SyntheticEvent} e
   * @returns {void}
   */
  openModal(e) {
    e.stopPropagation();
    this.setState({
      isOpen: true
    });
  }

  /**
   * Handles Close Modal event
   * Updates isOpen, newGroup and error states
   * @param {SyntheticEvent} e
   * @returns {void}
   */
  closeModal(e) {
    e.preventDefault();
    this.setState({
      isOpen: false,
      newGroup: '',
      error: ''
    });
  }

  /**
   * Handles change event of New Group input form
   * Updates isOpen and newGroup states
   * @param {SyntheticEvent} e
   * @returns {void}
   */
  onChange(e) {
    this.setState({
      error: '',
      [e.target.name]: e.target.value
    });
  }

  /**
   * Handles Submit New Group event
   * Dispatches submitNewGroup action to add the new group record to the DB
   * If the submission was successful, it adds a success flash message
   * If submission was not successful, it returns the appropriate error message
   * @param {SyntheticEvent} e
   * @returns {void}
   */
  newGroupSubmit(e) {
    this.setState({ error: '', isLoading: true });
    e.preventDefault();
    this.props.submitNewGroup({
      group_name: this.state.newGroup,
      userId: this.props.signedInUser.user.id
    }).then(
      () => {
        this.props.addFlashMessage({
          type: 'success',
          text: 'Your group has been successfully created'
        });
        $('[data-dismiss=modal]').trigger({ type: 'click' });
        this.setState({ isLoading: false });
      },
      ({ response }) => { this.setState({ error: response.data, isLoading: false }); }
    );
  }

  /**
   * Defines what must be executed before sidebar component mounts
   * It dispatches getUserGroups action to fetch the groups a signed in user belongs to
   * If no group was found, it dispatches setSelectedGroup with an empty object
   * If groups were found:
   * it sets the first group from the returned groups as active
   * it fetches the messages and members belonging to the first group
   * @returns {void}
   */
  componentWillMount() {
    const userId = this.props.signedInUser.user.id;  // signedInUser.user.data{id, firstname,....}
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
            <Brand brand_name='Post It'/>
            <MobileToggleBtn />

            <GroupList
              userGroups={userGroups}
              selectedGroup={selectedGroup}
              onGroupSelect={this.onGroupSelect}
              openModal={this.openModal}
            />
          </div>
        </aside>

        {/*Create Group Modal*/}
        <ModalFrame id='createGroup' show={this.state.isOpen}>
          <ModalHeader header='Group Name' onClose={this.closeModal}/>

          <ModalBody
            label='Group Name'
            field='newGroup'
            onChange={this.onChange}
            value={this.state.newGroup}
            errors={this.state.error}
          />

          <ModalFooter>
            <CancelButton onClick={this.closeModal} />
            <SubmitButton onSubmit={this.newGroupSubmit} isLoading={this.state.isLoading}/>
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
    selectedGroup: state.selectedGroup
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
    addFlashMessage
  }, dispatch);
}

Sidebar.propTypes = {
  signedInUser: PropTypes.object.isRequired,
  getUserGroups: PropTypes.func.isRequired,
  userGroups: PropTypes.object.isRequired,
  setSelectedGroup: PropTypes.func.isRequired,
  selectedGroup: PropTypes.object,
  addFlashMessage: PropTypes.func.isRequired,
  submitNewGroup: PropTypes.func.isRequired,
  getGroupMembers: PropTypes.func.isRequired,
  getGroupMessages: PropTypes.func.isRequired

};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
