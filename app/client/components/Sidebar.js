import React from 'react';

const Brand = () => ({
  render() {
    return (
      <div id="brand-name">
        Post It
      </div>
    );
  }
});

class Sidebar extends React.Component {
  render() {
    return (
      <aside className="navbar-default mobile-navbar">
        <div id="sidebar">
          <Brand />
          <h1>I am the Sidebar</h1>
          <h3>Testing Autoscrolling</h3>
        </div>
      </aside>
    );
  }
}

module.exports = Sidebar;
