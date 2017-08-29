import React from 'react';
import Sidebar from '../client-frame/sidebar/Sidebar.jsx';
import Header from './Header.jsx';

const ClientFrame = props => ({
  render() {
    return (
      <div>
        <Sidebar />
        <main id="content-area">
          <Header />
          {this.props.children}
        </main>
      </div>
    );
  }
});

export default ClientFrame;
