import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import moment from 'moment';
import toastr from 'toastr';
import lodashSplit from 'lodash/split';
import mapKeys from 'lodash/mapKeys';
import includes from 'lodash/includes';
import { getGroupMessagesCount, archiveMessage } from '../../actions/groupMessages';

class MessageItem extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      messageStatus: 'unread',
      filteredMessages: []
    };

    this.onSelect = this.onSelect.bind(this);
    this.archiveMessageRequest = this.archiveMessageRequest.bind(this);
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

  onSelect(e) {
    this.setState({ [e.target.name]: e.target.value });
    const mappedMessages = mapKeys(this.props.messages, 'message_id');
    const groupId = Object.keys(mappedMessages)[0];
    this.props.getGroupMessagesCount(groupId).then(
      (res) => {
        this.filterMessages(res.data);
      }
    );
  }

  filterMessages(messages) {
    const filteredMessages = [];
    messages.map((message) => {
      if (this.state.messageStatus === 'unread') {
        if (!includes(message.isArchived, this.props.authenticatedUsername)) {
          filteredMessages.push(message);
        }
      }

      if (this.state.messageStatus === 'archived') {
        if (includes(message.isArchived, this.props.authenticatedUsername)) {
          filteredMessages.push(message);
        }
      }
    });
    this.setState({ filteredMessages });
  }

  checkMessageLength(message) {
    if (message.length > 300) {
      return `${message.substring(0, 299)}...`;
    }
    return message;
  }

  archiveMessageRequest(groupId) {
    this.props.archiveMessage(groupId).then(
      (res) => {
        toastr.success('Message successfully archived');
      }
    );
  }

  render() {
    const { authenticatedUsername } = this.props;
    const ArchiveBtn = (props) => {
      if (!includes(props.message.isArchived, this.props.authenticatedUsername)) {
        return (
          <i className="material-icons pull-right archive-btn"
            data-toggle="tooltip" data-placement="left" title="Archive Message"
            onClick={() => this.archiveMessageRequest({ messageId: props.message.message_id })}>
            archive
          </i>
        );
      }
      return null;
    };
    return (
      <div>
           <select className="browser-default msg-filter" name="messageStatus" onChange={this.onSelect} value={this.state.messageStatus}>
            <option value="unread">Unread</option>
            <option value="archived">Archived</option>
          </select>
        {
          this.state.filteredMessages.map((message, index) => {
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
              <div key={index}>
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
                    <span className='font18'> { includes(readByArray, authenticatedUsername) ? <ArchiveBtn message={message}/> : ' | Unread' }</span>
                  <p className="msg_body"
                    onClick={() => this.props.onMessageClick({
                      id: message.message_id,
                      read_by: message.read_by }
                    )}>
                    {this.checkMessageLength(message.message)}
                  </p>
                </div>
              </div>
            );
          })
        }
      </div>
    );
  }
}

export default connect(null, { getGroupMessagesCount, archiveMessage })(MessageItem);
