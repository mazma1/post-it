import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { Link } from 'react-router-dom';

/**
  * Displays the search icon
  *
  * @param {object} props
  *
  * @returns {JSX} Search icon mark up
  */
const SearchButton = (props) => {
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

SearchButton.propTypes = {
  selectedGroup: PropTypes.object,
  onSearchClick: PropTypes.func.isRequired
};

SearchButton.defaultProps = {
  selectedGroup: {}
};

export default SearchButton;
