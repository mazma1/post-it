import React from 'react';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import mapKeys from 'lodash/mapKeys';
import PropTypes from 'prop-types';

/**
  * Displays a list of groups a user belongs to on the message board
  *
  * @param {object} props User's groups details and required helper functions
  *
  * @returns {JSX} Unordered list of a user's groups (if any),
  * Defined 'emptyGroup' constant if a user belongs to no group,
  * A 'Loading...' indicator when the groups are still being fetched
  */
function GroupList(props) {
  const { hasGroup } = props.userGroups;
  const groupsArray = props.userGroups.groups;
  const { unreadCount, onGroupSelect } = props;
  const mappedUnreadCount = mapKeys(unreadCount, 'id');
  let groups;

  if (props.userGroups.isLoading === true) {
    return <div className="loading-padding">Loading...</div>;
  }

  const emptyGroup = (
    <div className="loading-padding">
      <p>No groups available.</p>
      <a
        href="#createGroup"
        data-toggle="modal" data-target="#createGroup"
        onClick={props.openModal}
      >
        Click to create new group
      </a>
    </div>
  );

  const createGroup = (
    <li role="presentation" className="new-group">
      <a
        id="createNewGroup"
        href="#createGroup"
        data-toggle="modal" data-target="#createGroup"
        onClick={props.openModal}
      >
        Create new group
      </a>
    </li>
  );

  if (groupsArray) {
    groups = groupsArray.map((group) => {
      const id = group.id;
      const isSelected = props.selectedGroup.id === group.id;
      const onGroupClick = () => onGroupSelect({
        id: group.id,
        name: group.name
      });

      return (
        <li
          id="singleGroup"
          role="presentation"
          onClick={onGroupClick}
          key={group.id}
          className={classnames({ active: isSelected })}
        >
          <NavLink to="#">
            {group.name}
            {
              mappedUnreadCount[id] && mappedUnreadCount[id].unreadCount > 0 ?
                <span className="new badge">
                  {mappedUnreadCount[id].unreadCount}
                </span>
              : null
            }
          </NavLink>
        </li>
      );
    });
  }

  return (
    <div>
      <ul
        className="nav nav-pills nav-stacked navbar-fixed-side navbar-collapse collapse"
        id="menu-content"
      >
        { !hasGroup ? emptyGroup : groups }
        { hasGroup && createGroup }
      </ul>
    </div>
  );
}

GroupList.propTypes = {
  unreadCount: PropTypes.array,
  selectedGroup: PropTypes.object,
  openModal: PropTypes.func.isRequired,
  userGroups: PropTypes.object.isRequired,
  onGroupSelect: PropTypes.func.isRequired,
};

GroupList.defaultProps = {
  selectedGroup: {},
  unreadCount: []
};

export default GroupList;
