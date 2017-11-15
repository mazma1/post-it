import React from 'react';

/**
  * Displays the sidebar toggle button on mobile devices
  *
  * @returns {JSX} Toggle button mark up
  */
const MobileToggleButton = () => (
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

export default MobileToggleButton;
