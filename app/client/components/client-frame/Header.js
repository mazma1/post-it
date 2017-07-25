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
}
const GroupName = (props) => {
  if (isEmpty(props.selectedGroup)) {
    return <div className="col-md-4 col-sm-5 col-xs-3"></div>;
  }

  return (
    <div className="col-md-4 col-sm-5 col-xs-3 brand">
      <ul style={noMarginBottom}>
        <h4 className="group-name">{props.selectedGroup.name}</h4>
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

class Header extends React.Component {
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
    this.newUserSubmit = this.newUserSubmit.bind(this);
  }

  openModal(e) {
    e.stopPropagation();
    this.setState({
      isOpen: true
    });
  }

  closeModal() {
    // e.preventDefault();
    this.setState({
      isOpen: false,
      newUser: '',
      error: ''
    });
  }

  onChange(e) {
    this.setState({
      error: '',
      [e.target.name]: e.target.value
    });
  }

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

  logout(e) {
    e.preventDefault();
    this.props.logout();
    this.props.setSelectedGroup({});
    this.props.setGroupMessages({});
    this.props.history.push('/signin');
  }

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
                  <button
                    className="btn waves-effect waves-light blue lighten-1"
                    data-toggle="modal" data-target="#addUser"
                    onClick={this.openModal}>
                    Add User
                  </button>
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
                      <li><a href="#">Create Group</a></li>
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

function mapStateToProps(state) {
  return {
    username: state.signedInUser.user.username,
    selectedGroup: state.selectedGroup,
    membersLoading: state.groupMembers.isLoading
  };
}

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
  selectedGroup: PropTypes.object,
  username: PropTypes.string.isRequired
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
