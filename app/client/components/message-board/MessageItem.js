import React, { Component } from 'react';
import classnames from 'classnames';
import moment from 'moment';
import split from 'lodash/split';
import includes from 'lodash/includes';

function MessageItem(props) {
  const { messages, authenticatedUsername } = props;
  console.log('Message Item', messages);

  return (
    <div>
      {
        messages.map((message, index) => {
          const time = moment(message.sent_at).format('ddd, MMM Do. h:mm a');
          const readBy = message.read_by;
          const readByArray = split(readBy, ',');

          let normalPriority;
          let urgentPriority;
          let criticalPriority;
          if (message.priority === 'normal') {
            normalPriority = true;
          } else if (message.priority === 'urgent') {
            urgentPriority = true;
          } else if (message.priority === 'critical') {
            criticalPriority = true;
          }

          return (
            <div key={index} onClick={() => props.onMessageClick({ id: message.message_id, read_by: message.read_by })}>
              <div className="card-panel row" key={message.message_id}>
                  <span className="blue-text text-darken-2"><b>@{message.sent_by.username}</b></span>
                  <span className="blue-text text-darken-2"> {time}</span>
                  <span className={
                    classnames('label',
                                'priority-label',
                                { 'label-default': normalPriority },
                                { 'label-warning': urgentPriority },
                                { 'label-danger': criticalPriority })}>{message.priority}</span>
                  <span>  <b>|</b> <i>{ includes(readByArray, authenticatedUsername) ? 'Read' : 'Unread' }</i></span>
                <p className="msg_body">{message.message}</p>
              </div>
            </div>
          );
        })
      }
    </div>
  );
}

export default MessageItem;
