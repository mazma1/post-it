import React from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import capitalizeFirstLetter from '../../../utils/capitalizeFirstLetter';

/**
  * Displays a list of groups a user belongs to on the sidebar
  *
  * @param {object} props - User's groups details and required helper functions
  *
  * @returns {JSX} Unordered list of a user's groups (if any),
  * Defined 'emptyGroup' constant if a user belongs to no group,
  * A 'Loading...' indicator when the groups are still being fetched
  */
const GroupList = (props) => {
  const { hasGroup } = props.userGroups;
  const groupsArray = props.userGroups.groups;
  const { onGroupSelect } = props;
  let groups;

  if (props.userGroups.isLoading === true) {
    return <div className="loading-padding">Loading...</div>;
  }

  const emptyGroup = (
    <div className="loading-padding">
      <p>No groups available.</p>
      <Link
        to={{
          pathname: '/message-board/create-group',
          state: { previousPath: props.pathName }
        }}
      >
        Click to create new group
      </Link>
    </div>
  );

  const createGroup = (
    <li role="presentation" className="new-group">
      <Link
        to={{
          pathname: '/message-board/create-group',
          state: { previousPath: props.pathName }
        }}
        id="createNewGroup"
      >
        Create New Group
      </Link>
    </li>
  );

  if (groupsArray) {
    groups = groupsArray.map((group) => {
      const isSelected = props.selectedGroup.id === group.id;
      const onGroupClick = () => onGroupSelect(group);

      return (
        <li
          id="singleGroup"
          role="presentation"
          onClick={onGroupClick}
          key={group.id}
          className={classnames({ active: isSelected })}
        >
          <Link to="#">{capitalizeFirstLetter(group.name)}</Link>
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
};

GroupList.propTypes = {
  selectedGroup: PropTypes.object,
  userGroups: PropTypes.object.isRequired,
  onGroupSelect: PropTypes.func.isRequired,
  pathName: PropTypes.string.isRequired
};

GroupList.defaultProps = {
  selectedGroup: {},
  unreadCount: []
};

export default GroupList;
