import React from 'react';
import ClientFrame from './ClientFrame';

class MessageBoard extends React.Component {
  render() {
    return (
      <ClientFrame>
        <div>
          <h5>I am the Test Page</h5>
        </div>
       </ClientFrame>
    );
  }
}

module.exports = MessageBoard;
