import React from 'react';
import Sidebar from '../client-frame/sidebar/Sidebar';
import Header from './Header';


/**
  * Consists of components that are common to other child components
  *
  * @returns {JSX} The sidebar, header and specified child component
  */
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
