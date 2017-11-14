import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import checkGroupNameLength from '../../utils/checkGroupNameLength';
import capitalizeFirstLetter from '../../utils/capitalizeFirstLetter';

/**
  * Displays the name of a group
  *
  * @param {object} props
  *
  * @returns {JSX} Add User button mark up
  */
export const GroupName = (props) => {
  if (isEmpty(props.selectedGroup)) {
    return <div className="col-md-4 col-sm-5 col-xs-3" />;
  }

  return (
    <div className="col-md-4 col-sm-5 col-xs-3 brand">
      <ul className="zero-padding">
        <h4 className="group-name">
          {
            capitalizeFirstLetter(
              checkGroupNameLength(props.selectedGroup.name)
            )
          }
        </h4>
        <li role="presentation" className="dropdown">
          <a
            className="dropdown-toggle options"
            data-toggle="dropdown"
            role="button"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <span className="caret" />
          </a>
          <ul className="dropdown-menu group-members-dropdown">
            <li>
              <a
                data-toggle="modal" data-target="#groupMembers"
                onClick={props.openModal}
              >
                View Group Members
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

GroupName.propTypes = {
  selectedGroup: PropTypes.object,
  openModal: PropTypes.func.isRequired
};

GroupName.defaultProps = {
  selectedGroup: {}
};

export default GroupName;
