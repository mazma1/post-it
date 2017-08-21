import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import moment from 'moment';
import lodashSplit from 'lodash/split';
import mapKeys from 'lodash/mapKeys';
import includes from 'lodash/includes';
import { getGroupMessagesCount } from '../../actions/groupMessages';

class MessageItem extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      messageStatus: 'unread',
      filteredMessages: []
    };

    this.onSelect = this.onSelect.bind(this);
    this.filterMessages = this.filterMessages.bind(this);
    this.checkMessageLength = this.checkMessageLength.bind(this);
  }

  componentDidMount() {
    const mappedMessages = mapKeys(this.props.messages, 'message_id');
    const groupId = Object.keys(mappedMessages)[0];
    this.props.getGroupMessagesCount(groupId).then(
      (res) => {
        this.filterMessages(res.data);
      }
    );
  }

  componentDidUpdate() {
    const mappedMessages = mapKeys(this.props.messages, 'message_id');
    const groupId = Object.keys(mappedMessages)[0];
    this.props.getGroupMessagesCount(groupId).then(
      (res) => {
        this.filterMessages(res.data);
      }
    );
  }

  onSelect(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  filterMessages(messages) {
    const filteredMessages = [];

    messages.map((message) => {
      const readbyArray = lodashSplit(message.read_by, ',');

      if (this.state.messageStatus === 'unread') {
        console.log('Unread:', this.state.messageStatus);
      }

      if (this.state.messageStatus === 'read') {
        console.log('Read:', this.state.messageStatus);
      }
    });
  }

  checkMessageLength(message) {
    if (message.length > 300) {
      return `${message.substring(0, 299)}...`;
    }
    return message;
  }

  render() {
    const { messages, authenticatedUsername } = this.props;
    return (
      <div>
          {/* <select className="browser-default msg-filter" name="messageStatus" onChange={this.onSelect} value={this.state.messageStatus}>
            <option value="unread">Unread</option>
            <option value="archived">Archived</option>
          </select> */}
        {
          messages.map((message, index) => {
            const time = moment(message.sent_at).format('ddd, MMM Do. h:mm a');
            const readBy = message.read_by;
            const readByArray = lodashSplit(readBy, ',');

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
                    <span className="blue-text text-darken-2 font18"><b>@{message.sent_by.username}</b></span>
                    <span className="blue-text text-darken-2 font18"> {time}</span>
                    <span className={
                      classnames(
                        'label',
                        'priority-label',
                        { 'label-default': normalPriority },
                        { 'label-warning': urgentPriority },
                        { 'label-danger': criticalPriority })}>{message.priority}</span>
                    <span className='font18'>  <b>|</b> { includes(readByArray, authenticatedUsername) ? 'Read' : 'Unread' }</span>
                  <p className="msg_body">{this.checkMessageLength(message.message)}</p>
                </div>
              </div>
            );
          })
        }
      </div>
    );
  }
}

export default connect(null, { getGroupMessagesCount })(MessageItem);
