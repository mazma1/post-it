import React from 'react';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import mapKeys from 'lodash/mapKeys';
import PropTypes from 'prop-types';

/**
 *Functional component that renders a list of groups
 a user belongs to on the message board
 *Parent component: Sidebar.js
 *@param {object} props All the properties received from the parent
 *@prop {object} props.userGroups  Contains a user's groups
 *@prop {object} props.selectedGroup Contains details of the active group
 *@prop {function} props.onGroupSelect Called when a group name is clicked
 *@prop {function} props.openModal Updates the parent component state
 when modal is open
 *@returns {JSX} Unordered list of a user's groups (if any),
 *Defined 'emptyGroup' constant if a user belongs to no group,
 *A 'Loading...' indicator when the groups are still being fetched
  */
function GroupList(props) {
  const hasGroup = props.userGroups.hasGroup;
  const groupsArray = props.userGroups.groups;
  const { unreadCount, onGroupSelect } = props;
  const mappedUnreadCount = mapKeys(unreadCount, 'id');

  const divPadding = {
    paddingLeft: '20px',
    paddingTop: '20px'
  };

  const newGroup = {
    marginTop: '8px',
    borderTop: '1px solid #b5818a',
    borderBottom: '1px solid #b5818a',
    backgroundColor: '#eae5e5' // #ece6e6. #eae0e0, #e2d1ff;
  };

  let groupItems;

  if (props.userGroups.isLoading === true) {
    return <div style={divPadding}>Loading...</div>;
  }

  const emptyGroup = (
    <div style={divPadding}>
      <p>No groups available.</p>
      <a
        href="#createGroup"
        data-toggle="modal" data-target="#createGroup"
        onClick={props.openModal}>
        Click to create new group
      </a>
    </div>
  );

  const createGroup = (
    <li role="presentation" style={newGroup}>
      <a
        id="createNewGroup"
        href="#createGroup"
        data-toggle="modal" data-target="#createGroup"
        onClick={props.openModal}>
        Create new group
      </a>
    </li>
  );

  if (groupsArray) {
    groupItems = groupsArray.map((group) => {
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
        { !hasGroup ? emptyGroup : groupItems }
        { hasGroup && createGroup }
      </ul>
    </div>
  );
}

GroupList.propTypes = {
  userGroups: PropTypes.object.isRequired,
  selectedGroup: PropTypes.object,
  onGroupSelect: PropTypes.func.isRequired,
  unreadCount: PropTypes.array,
  openModal: PropTypes.func.isRequired
};

export default GroupList;
