import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/signinAction';
import { setSelectedGroup } from '../../actions/setSelectedGroupAction';
import { setGroupMessages } from '../../actions/getGroupMessagesAction';

const GroupName = (props) => {
  return (
    <div className="col-md-3 col-sm-5 col-xs-3 brand">
      <h4 className="group-name">{props.groupname}</h4>
    </div>
  );
};

class Header extends React.Component {
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
      <section className="nav-bar">
        <div className="nav-container">
          <div className="row">
            <GroupName groupname={selectedGroup ? selectedGroup.name : ''}/>

            <div className="col-md-9 col-sm-7 col-xs-9 lg-stack">
              <ul>
                <li className="username"><i className="glyphicon glyphicon-user"></i> @{username}</li>
                <button type="" className="btn waves-effect waves-light blue lighten-1" data-toggle="modal" data-target="#addUser">Add User</button>
                <li><Link to="/signin" className="btn waves-effect waves-light red darken-2" onClick={this.logout.bind(this)}>Sign Out</Link></li>
              </ul>
            </div>

            <div className="col-md-9 col-sm-7 col-xs-8 mobile-stack">
              <ul>
                <li className="username"><i className="glyphicon glyphicon-user"></i> @{username}</li>
                <li role="presentation" className="dropdown">
                  <a className="dropdown-toggle options" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
                    Options <span className="caret"></span>
                  </a>
                  <ul className="dropdown-menu">
                    <li><a href="#">Add User</a></li>
                    <li><a href="#">Create Group</a></li>
                    <li><a href="#" onClick={this.logout.bind(this)}>Log Out</a></li>
                  </ul>
                </li>
              </ul>
            </div>
          
          </div>
        </div>
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    username: state.signedInUser.user.data.username,
    selectedGroup: state.selectedGroup
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    logout,
    setSelectedGroup,
    setGroupMessages
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
