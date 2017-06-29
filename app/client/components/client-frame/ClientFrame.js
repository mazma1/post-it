import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const ClientFrame = props => ({
  render() {
    return (
      <div>
        <Sidebar />
        <main id="content-area">
          <Header />
          {props.children}
        </main>
      </div>
    );
  }
});

export default ClientFrame;
