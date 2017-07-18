import React from 'react';
import isEmpty from 'lodash/isEmpty';

function MessageCard(props) {
  const messages = props.messages;
  console.log('Message card:', messages);

  if (isEmpty(messages)) { // undefined
    return <div>Loading...</div>;
  }

  const emptyMessage = (
    <div>
      <p>No message available in this group</p>
    </div>
  );

  const messageItem = messages.map((message) => {
    return (
      <div className="card-panel">
        <div className="">
          <span className="blue-text text-darken-2"><b>@{message.sent_by.username}</b></span> <span className="blue-text text-darken-2">2:00pm</span>
        </div>
        <p className="msg_body">{message.message}</p>
      </div>
    );
  });

  return (
    <div>
      { messages.length === 0 ? emptyMessage : messageItem }
    </div>
  );
};

module.exports = MessageCard;
