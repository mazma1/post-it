import React from 'react';
import PropTypes from 'prop-types';


/**
  * Displays the brand name
  *
  * @param {object} props
  *
  * @returns {JSX} Brand Name mark up
  */
const Brand = props => (
  <div id="brand-name">
    {props.brandName}
  </div>
);

Brand.propTypes = {
  brandName: PropTypes.string.isRequired
};

export default Brand;
