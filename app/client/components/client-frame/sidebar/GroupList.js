import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';

function GroupList (props) {
  const groupsArray = props.userGroups.groups;
  const hasGroup = props.userGroups.hasGroup;
  const onGroupSelect = props.onGroupSelect;

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
    const isSelected = props.selectedGroup.id === group.id;
    const onGroupClick = () => onGroupSelect({ id: group.id, name: group.name });
    return (
      <li role="presentation" onClick={onGroupClick} key={group.name} className={classnames({ 'active': isSelected })}>
        <NavLink to="#">
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
  userGroups: PropTypes.object.isRequired,
  selectedGroup: PropTypes.object
};

export default GroupList;
