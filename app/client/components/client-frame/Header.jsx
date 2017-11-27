import React from 'react';
import $ from 'jquery';
import toastr from 'toastr';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import { bindActionCreators } from 'redux';
import { withRouter, Link } from 'react-router-dom';
import ModalFrame from '../modal/ModalFrame';
import {
  ModalHeader,
  ModalBody,
  ModalFooter,
  CloseButton,
  CancelButton,
  SubmitButton } from '../modal/SubModals';
import { logout } from '../../actions/signIn';
import { submitNewUser } from '../../actions/groupMembers';
import GroupMembersTable from '../tables/GroupMembersTable';
import AddUserButton from '../partials/AddUserButton';
import SearchButton from '../partials/SearchButton';
import GroupName from '../partials/GroupName';


/**
 * Displays Header component
 *
 * @class Header
 *
 * @extends {React.Component}
 */
export class Header extends React.Component {

  /**
    * Creates an instance of Header
    *
    * @param {object} props
    *
    * @memberof Header
    */
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      newUser: '',
      isLoading: false,
      error: ''
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.onChange = this.onChange.bind(this);
    this.submitNewUser = this.submitNewUser.bind(this);
    this.logout = this.logout.bind(this);
    this.onSearchClick = this.onSearchClick.bind(this);
    this.isValid = this.isValid.bind(this);
  }


  /**
    * Sets an active group id to the local storage when the search icon is 
    * clicked
    *
    * @returns {void} null
    */
  onSearchClick() {
    localStorage.setItem('group', this.props.match.params.groupId);
  }


  /**
    * Handles change event of New User input form
    *
    * @param {SyntheticEvent} event
    *
    * @returns {void}
    */
  onChange(event) {
    this.setState({
      error: '',
      [event.target.name]: event.target.value
    });
  }


  /**
    * Handles Open Modal event
    *
    * @param {SyntheticEvent} event
    *
    * @returns {void}
    */
  openModal(event) {
    event.preventDefault();
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
      newUser: '',
      error: ''
    });
  }


  /**
  * Handles input validation for adding user to group
  *
  * @returns {boolean} Whether an input is valid or not
  */
  isValid() {
    const error = {};
    if (!this.state.newUser) {
      error.error = 'Username is required';
      return this.setState({ error });
    }
    if (this.state.newUser.trim().length === 0) {
      error.error = 'Username cannot be empty';
      return this.setState({ error });
    }
    return isEmpty(error);
  }


  /**
   * Submits a new user's record to the database
   *
   * @param {SyntheticEvent} event
   *
   * @returns {void}
   */
  submitNewUser(event) {
    event.preventDefault();
    if (this.isValid()) {
      this.setState({ error: '', isLoading: true });
      this.props.submitNewUser({
        groupId: this.props.selectedGroup.id,
        identifier: this.state.newUser
      }).then(
        () => {
          toastr.success('User has been successfully added to group');
          $('[data-dismiss=modal]').trigger({ type: 'click' });
        },
        ({ response }) => {
          let error = '';
          if (response.status >= 500) {
            error = { error: response.statusText };
          } else {
            error = response.data;
          }
          this.setState({
            error,
            isLoading: false
          });
        }
      );
    }
  }


  /**
   * Logs a user out
   *
   * @param {SyntheticEvent} event
   *
   * @returns {void}
   */
  logout(event) {
    event.preventDefault();
    this.props.logout();
    this.props.history.push('/signin');
  }


  /**
   * Renders Header component
   *
   * @returns {ReactElement} Sidebar markup
   */
  render() {
    const { username, selectedGroup } = this.props;

    return (
      <div>
        <section className="nav-bar">
          <div className="nav-container">
            <div className="row">

              <GroupName
                selectedGroup={selectedGroup}
                openModal={this.openModal}
              />

              <div className="col-md-8 col-sm-7 col-xs-9 lg-stack">
                <ul className="cta">
                  <SearchButton
                    onSearchClick={this.onSearchClick}
                    selectedGroup={selectedGroup}
                  />
                  <li className="username">
                    <i className="glyphicon glyphicon-user pr6" />
                     @{username}
                  </li>
                  <AddUserButton
                    selectedGroup={selectedGroup}
                    openModal={this.openModal}
                  />
                  <li>
                    <Link
                      to="/signin"
                      className="btn waves-effect waves-light red darken-2"
                      onClick={this.logout}
                    >
                      Sign Out
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="col-md-9 col-sm-7 col-xs-8 mobile-stack">
                <ul className="cta">
                  <SearchButton
                    onSearchClick={this.onSearchClick}
                    selectedGroup={selectedGroup}
                  />
                  <li className="username">
                    <i className="glyphicon glyphicon-user" />
                     @{username}
                  </li>
                  <li role="presentation" className="dropdown">
                    <a
                      className="dropdown-toggle options"
                      data-toggle="dropdown" role="button"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Options <span className="caret" />
                    </a>
                    <ul className="dropdown-menu">
                      <li>
                        <a
                          onClick={this.openModal}
                          data-toggle="modal"
                          data-target="#addUser"
                        >
                          Add User
                        </a>
                      </li>
                      <li><a onClick={this.logout}>Log Out</a></li>
                    </ul>
                  </li>
                </ul>
              </div>

            </div>
          </div>
        </section>

        <ModalFrame id="addUser" show={this.state.isOpen}>
          <ModalHeader header="Add New User" onClose={this.closeModal} />

          <ModalBody
            label="Username or Email"
            field="newUser"
            onChange={this.onChange}
            value={this.state.newUser}
            errors={this.state.error}
            onSubmit={this.submitNewUser}
          />

          <ModalFooter>
            <CancelButton onClick={this.closeModal} />
            <SubmitButton
              onSubmit={this.submitNewUser}
              isLoading={this.state.isLoading}
            />
          </ModalFooter>
        </ModalFrame>

        <ModalFrame
          id="groupMembers"
          membersLoading={this.props.membersLoading}
        >
          <ModalHeader header="Group Members" onClose={this.closeModal} />

          <div className="modal-body">
            <GroupMembersTable groupMembers={this.props.groupMembers} />
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
 *
 * @param {object} state Redux state
 *
 * @returns {object} Username, selected group and member's loading status
 */
function mapStateToProps(state) {
  return {
    username: state.signedInUser.user.username,
    selectedGroup: state.selectedGroup,
    membersLoading: state.groupMembers.isLoading,
    groupMembers: state.groupMembers.members
  };
}

/**
 * Maps action creators to redux dispatch function and avails them  as props
 *
 * @param {function} dispatch Redux dispatch function
 *
 * @returns {function} Action cretaors bound to redux dispatch function
 */
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    logout,
    submitNewUser
  }, dispatch);
}

Header.propTypes = {
  logout: PropTypes.func.isRequired,
  submitNewUser: PropTypes.func.isRequired,
  selectedGroup: PropTypes.object,
  username: PropTypes.string,
  membersLoading: PropTypes.bool.isRequired,
  groupMembers: PropTypes.array.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

Header.defaultProps = {
  selectedGroup: {},
  username: ''
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
