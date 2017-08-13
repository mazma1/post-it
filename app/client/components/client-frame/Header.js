import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import $ from 'jquery';
import isEmpty from 'lodash/isEmpty';
import { logout } from '../../actions/signinAction';
import { setSelectedGroup } from '../../actions/setSelectedGroupAction';
import { setGroupMessages } from '../../actions/groupMessagesAction';
import { addFlashMessage } from '../../actions/flashMessageAction';
import { submitNewUser } from '../../actions/groupMembersAction';
import ModalFrame from '../modal/ModalFrame';
import { ModalHeader, ModalBody, ModalFooter, CloseButton, CancelButton, SubmitButton } from '../modal/SubModals';
import Table from '../table/Table';

const noMarginBottom = {
  marginBottom: 0
};

const AddUserBtn = (props) => {
  if (isEmpty(props.selectedGroup)) {
    return null;
  }
  return (
    <button
      className="btn waves-effect waves-light blue lighten-1"
      data-toggle="modal" data-target="#addUser"
      onClick={props.openModal}>
      Add User
    </button>
  );
};

const GroupName = (props) => {
  if (isEmpty(props.selectedGroup)) {
    return <div className="col-md-4 col-sm-5 col-xs-3"></div>;
  }

  function checkGroupnameLength(groupName) {
    if (groupName.length > 16) {
      return `${groupName.substring(0, 16)}...`;
    }
    return groupName;
  }

  return (
    <div className="col-md-4 col-sm-5 col-xs-3 brand">
      <ul style={noMarginBottom}>
        <h4 className="group-name">{checkGroupnameLength(props.selectedGroup.name)}</h4>
        <li role="presentation" className="dropdown">
          <a className="dropdown-toggle options" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
            <span className="caret"></span>
          </a>
          <ul className="dropdown-menu group-members-dropdown">
            <li><a
              data-toggle="modal" data-target="#groupMembers"
              onClick={props.openModal}
              href="#">
              View Group Members
            </a></li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

/**
 * Header component for message board
 * Child components: GroupName Add User modal and Group members modals
 */
class Header extends React.Component {

  /**
   * Constructor
   * @param {object} props
   */
  constructor(props) {
    super(props);

    /**
     * @type {object}
     * @prop {boolean} isOpen Tells if a modal is open or not
     * @prop {string} newUser Email/Username of user to be added to group
     * @prop {boolean} isLoading Tells if the request to add user has been completed or not
     * @prop {string} error Error message if the user was not added successfully
     */
    this.state = {
      isOpen: false,
      newUser: '',
      isLoading: false,
      error: ''
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.onChange = this.onChange.bind(this);
    this.newUserSubmit = this.newUserSubmit.bind(this);
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
   * Updates isOpen, newUser and error states
   * @param {SyntheticEvent} e
   * @returns {void}
   */
  closeModal(e) {
    e.preventDefault();
    this.setState({
      isOpen: false,
      newUser: '',
      error: ''
    });
  }

  /**
   * Handles change event of New User input form
   * Updates isOpen and newUser states
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
   * Handles Submit New User event
   * Dispatches submitNewUser action to add the new user record to the DB
   * If the submission was successful, it adds a success flash message
   * If submission was not successful, it returns the appropriate error message
   * @param {SyntheticEvent} e
   * @returns {void}
   */
  newUserSubmit(e) {
    this.setState({ error: '', isLoading: true });
    e.preventDefault();
    this.props.submitNewUser({
      groupId: this.props.selectedGroup.id,
      identifier: this.state.newUser
    }).then(
      () => {
        this.props.addFlashMessage({
          type: 'success',
          text: 'User has been successfully added to group'
        });
        $('[data-dismiss=modal]').trigger({ type: 'click' });
      },
      ({ response }) => { this.setState({ error: response.data, isLoading: false }); }
    );
  }

  /**
   * Handles logout event
   * Dispatches logout action
   * Deletes selected group and group messages from the state
   * Redirects to the sign in page
   * @param {SyntheticEvent} e
   * @returns {void}
   */
  logout(e) {
    e.preventDefault();
    this.props.logout();
    this.props.setSelectedGroup({});
    this.props.setGroupMessages({});
    this.props.history.push('/signin');
  }

  /**
   * Render
   * @returns {ReactElement} Header markup
   */
  render() {
    const { username, selectedGroup } = this.props;

    return (
      <div>
        <section className="nav-bar">
          <div className="nav-container">
            <div className="row">

              <GroupName selectedGroup={selectedGroup} openModal={this.openModal}/>

              <div className="col-md-8 col-sm-7 col-xs-9 lg-stack">
                <ul className='cta'>
                  <li className="username"><i className="glyphicon glyphicon-user"></i> @{username}</li>
                  <AddUserBtn selectedGroup={selectedGroup} openModal={this.openModal}/>
                  <li>
                    <Link
                      to="/signin"
                      className="btn waves-effect waves-light red darken-2"
                      onClick={this.logout.bind(this)}
                    >
                      Sign Out
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="col-md-9 col-sm-7 col-xs-8 mobile-stack">
                <ul className='cta'>
                  <li className="username"><i className="glyphicon glyphicon-user"></i> @{username}</li>
                  <li role="presentation" className="dropdown">
                    <a className="dropdown-toggle options" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
                      Options <span className="caret"></span>
                    </a>
                    <ul className="dropdown-menu">
                      <li><a onClick={this.openModal} data-toggle="modal" data-target="#addUser">Add User</a></li>
                      <li><a href="#" onClick={this.logout.bind(this)}>Log Out</a></li>
                    </ul>
                  </li>
                </ul>
              </div>
            
            </div>
          </div>
        </section>

        {/*Add User Modal*/}
        <ModalFrame id='addUser' show={this.state.isOpen}>
          <ModalHeader header='Add New User' onClose={this.closeModal}/>

          <ModalBody
            label='Username or Email'
            field='newUser'
            onChange={this.onChange}
            value={this.state.newUser}
            errors={this.state.error}
          />

          <ModalFooter>
            <CancelButton onClick={this.closeModal} />
            <SubmitButton onSubmit={this.newUserSubmit} isLoading={this.state.isLoading}/>
          </ModalFooter>
        </ModalFrame>

        {/*Group Members Modal*/}
        <ModalFrame id='groupMembers' membersLoading={this.props.membersLoading}>
          <ModalHeader header='Group Members' onClose={this.closeModal}/>

          <div className="modal-body">
            <Table />
          </div>

          <ModalFooter>
            <CloseButton onClick={this.closeModal} />
          </ModalFooter>
        </ModalFrame>
      </div>
    );
  }
}

/**
 * Maps pieces of the redux state to props
 * Whatever is returned will show up as props in Headbar
 * @param {object} state Redux state
 * @returns {object} Username, selected group and member's loading status
 */
function mapStateToProps(state) {
  return {
    username: state.signedInUser.user.username,
    selectedGroup: state.selectedGroup,
    membersLoading: state.groupMembers.isLoading
  };
}

/**
 * Maps action creators to redux dispatch function
 * Action creators bound will be available as props in Header
 * Actions generated by the action creators flows though all the reducers
 * @param {function} dispatch Redux dispatch function
 * @returns {function} Action cretaors bound to redux dispatch function
 */
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    logout,
    setSelectedGroup,
    setGroupMessages,
    submitNewUser,
    addFlashMessage
  }, dispatch);
}

Header.propTypes = {
  logout: PropTypes.func.isRequired,
  setSelectedGroup: PropTypes.func.isRequired,
  setGroupMessages: PropTypes.func.isRequired,
  submitNewUser: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired,
  selectedGroup: PropTypes.object,
  username: PropTypes.string.isRequired,
  membersLoading: PropTypes.bool.isRequired
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
