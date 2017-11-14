import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';


/**
  * Displays button used to add a user to a group
  *
  * @param {object} props
  *
  * @returns {JSX} Add User button mark up
  */
const AddUserButton = (props) => {
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

AddUserButton.propTypes = {
  selectedGroup: PropTypes.object,
  openModal: PropTypes.func.isRequired
};

AddUserButton.defaultProps = {
  selectedGroup: {}
};

export default AddUserButton;
