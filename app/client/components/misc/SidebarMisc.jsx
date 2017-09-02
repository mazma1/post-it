import React from 'react';
import PropTypes from 'prop-types';

export const Brand = (props) => {
  return (
    <div id="brand-name">
      {props.brandName}
    </div>
  );
};


export const MobileToggleBtn = () => {
  return (
    <button
      type="button"
      className="mobile-nav-btn  navbar-toggle collapsed"
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
};

Brand.propTypes = {
  brandName: PropTypes.string.isRequired
};
