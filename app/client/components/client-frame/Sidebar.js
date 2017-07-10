import React from 'react';
import { BrowserRouter, Route, NavLink, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

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
  render() {
    const { isAuthenticated } = this.props.signedInUser;  // signedInUser.user.data{id, firstname,....}

    return (
      <aside className="navbar-default mobile-navbar">
        <div id="sidebar">
          <Brand brand_name='Post It'/>
          <MobileToggleBtn />

          <ul className="nav nav-pills nav-stacked navbar-fixed-side navbar-collapse collapse" id="menu-content">
            <li role="presentation" className="active">
              <NavLink activeClassName="active" to="#" >
                Group 1
              </NavLink>
            </li>
            <li role="presentation">
              <NavLink activeClassName="active" to="#" >
                Group 2
              </NavLink>
            </li>
            <li role="presentation">
              <NavLink activeClassName="active" to="#" >
                Group 3
              </NavLink>
            </li>
            <li role="presentation">
              <NavLink activeClassName="active" to="#" >
                Group 4
              </NavLink>
            </li>
            <li role="presentation">
              <NavLink activeClassName="active" to="#" >
                Group 5
              </NavLink>
            </li>
          </ul>
        </div>
      </aside>
    );
  }
}

function mapStateToProps(state) {
  // Whatever is returned will show up as props in Sidebar
  return {
    signedInUser: state.signedInUser
  };
}

export default connect(mapStateToProps)(Sidebar);
