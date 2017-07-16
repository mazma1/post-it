import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

function GroupList (props) {
  const groupsArray = props.userGroups.groups;
  const hasGroup = props.userGroups.hasGroup;

  if (!groupsArray) { // undefined
    return <div>Loading...</div>;
  }

  const emptyGroup = (
    <div>
      <p>No groups available.</p>
      <a href='#'>Click to create new group</a>
    </div>
  );

  const groupItems = groupsArray.map((group) => {
    return (
      <li role="presentation" key={group.name} className="active">
        <NavLink activeClassName="active" to="#" >
          {group.name}
        </NavLink>
      </li>
    );
  });

  return (
    <div>
      <ul className="nav nav-pills nav-stacked navbar-fixed-side navbar-collapse collapse" id="menu-content">
        { !hasGroup ? emptyGroup : groupItems }
      </ul>
    </div>
  );
}

GroupList.propTypes = {
  signedInUser: PropTypes.object.isRequired,
  getUserGroups: PropTypes.func.isRequired,
  userGroups: PropTypes.object.isRequired
};

export default GroupList;
