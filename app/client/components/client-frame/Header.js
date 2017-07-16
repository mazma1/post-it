import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link, Redirect } from 'react-router-dom';
import { logout } from '../../actions/signinAction';

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
    this.props.history.push('/signin');
  }

  render() {
    const { username, groupname } = this.props;
    return (
      <section className="nav-bar">
        <div className="nav-container">
          <div className="row">
            <GroupName groupname={groupname}/>

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
  // Whatever is returned will show up as props in Sidebar
  return {
    username: state.signedInUser.user.data.username,
    groupname: state.selectedGroup.name
  };
}

export default withRouter(connect(mapStateToProps, { logout })(Header));
