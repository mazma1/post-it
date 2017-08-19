import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import moment from 'moment';
import split from 'lodash/split';
import mapKeys from 'lodash/mapKeys';
import includes from 'lodash/includes';
import { getGroupMessagesForCount } from '../../actions/groupMessagesAction';

class MessageItem extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      messageStatus: 'unread',
      filteredMessages: []
    };

    this.onSelect = this.onSelect.bind(this);
    this.filterMessages = this.filterMessages.bind(this);
  }

  componentWillMount() {
    const mappedMessages = mapKeys(this.props.messages, 'message_id');
    const groupId = Object.keys(mappedMessages)[0];
    this.props.getGroupMessagesForCount(groupId).then(
      res => {
        const filtered = this.filterMessages(res.data);
        console.log(this.state);
        console.log(groupId);
      }
    );
  }

  onSelect(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  filterMessages(messages) {
    const filteredMessages = [];
    messages.map(message => {
      const readbyArray = split(message.read_by, ',');
      
      if (this.state.messageStatus === 'unread') {
        if (!includes(readbyArray, this.props.authenticatedUsername)) {
          filteredMessages.push(message);
        }
      }
      
      if (this.state.messageStatus === 'archived') {
        if (includes(readbyArray, this.props.authenticatedUsername)) {
          filteredMessages.push(message);
        }
      }
    });
    console.log(filteredMessages);
    this.setState({ filteredMessages });
  }

  render() {
    const { messages, authenticatedUsername } = this.props;
    // console.log(this.filterMessages(this.props.messages));

    return (
      <div>
          <select className="browser-default msg-filter" name="messageStatus" onChange={this.onSelect} value={this.state.messageStatus}>
            <option value="unread">Unread</option>
            <option value="archived">Archived</option>
          </select>
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
              <div key={index} onClick={() => this.props.onMessageClick({ id: message.message_id, read_by: message.read_by })}>
                <div className="card-panel row" key={message.message_id}>
                    <span className="blue-text text-darken-2"><b>@{message.sent_by.username}</b></span>
                    <span className="blue-text text-darken-2"> {time}</span>
                    <span className={
                      classnames(
                        'label',
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
}

export default connect(null, { getGroupMessagesForCount })(MessageItem);
