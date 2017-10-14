import React from 'react';
import isEmpty from 'lodash/isEmpty';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import checkGroupnameLength from '../../utils/checkGroupNameLength';

export const AddUserBtn = (props) => {
  if (isEmpty(props.selectedGroup)) {
    return null;
  }
  return (
    <button
      className="btn waves-effect waves-light blue lighten-1"
      data-toggle="modal" data-target="#addUser"
      onClick={props.openModal}
    >
      Add User
    </button>
  );
};

AddUserBtn.propTypes = {
  selectedGroup: PropTypes.object,
  openModal: PropTypes.func.isRequired
};

AddUserBtn.defaultProps = {
  selectedGroup: {}
};

export const SearchBtn = (props) => {
  if (isEmpty(props.selectedGroup)) {
    return null;
  }
  return (
    <li>
      <Link to="/search" onClick={props.onSearchClick}>
        <i className="glyphicon glyphicon-search pointer" />
      </Link>
    </li>
  );
};

SearchBtn.propTypes = {
  selectedGroup: PropTypes.object,
  onSearchClick: PropTypes.func.isRequired
};

SearchBtn.defaultProps = {
  selectedGroup: {}
};


const noMarginBottom = {
  marginBottom: 0
};

export const GroupName = (props) => {
  if (isEmpty(props.selectedGroup)) {
    return <div className="col-md-4 col-sm-5 col-xs-3" />;
  }

  return (
    <div className="col-md-4 col-sm-5 col-xs-3 brand">
      <ul style={noMarginBottom}>
        <h4 className="group-name">
          {checkGroupnameLength(props.selectedGroup.name)}
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

