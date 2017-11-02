import React from 'react';
import Sidebar from '../client-frame/sidebar/Sidebar';
import Header from './Header';

const ClientFrame = () => ({
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
