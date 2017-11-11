import React from 'react';
import PropTypes from 'prop-types';


/**
  * Displays the brand name
  *
  * @param {object} props
  *
  * @returns {JSX} Brand Name mark up
  */
export const Brand = props => (
  <div id="brand-name">
    {props.brandName}
  </div>
);

Brand.propTypes = {
  brandName: PropTypes.string.isRequired
};


/**
  * Displays the sidebar toggle button on mobile devices
  *
  * @returns {JSX} Toggle button mark up
  */
export const MobileToggleBtn = () => (
  <button
    type="button"
    className="mobile-nav-btn navbar-toggle collapsed"
    data-toggle="collapse"
    data-target="#menu-content"
    aria-expanded="false"
    aria-controls="menu-content"
  >
    <span className="sr-only">Toggle navigation</span>
    <span className="icon-bar" />
    <span className="icon-bar" />
    <span className="icon-bar" />
  </button>
);

