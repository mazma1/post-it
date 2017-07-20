import React from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';

class MessageCard extends React.Component {
  render() {
    const hasGroup = this.props.userGroups.hasGroup;

    if (hasGroup && isEmpty(this.props.messages)) { // group exists but still fetching msgs
      return <div>Loading...</div>;
    } else if (!hasGroup && isEmpty(this.props.userGroups.group)) {
      return <div></div>;
    }

    const emptyMessage = (
      <div>
        <p>No message available in this group</p>
      </div>
    );

    const messageItem = this.props.messages.map((message) => {
      return (
        <div className="card-panel" key={message.message_id}>
          <div className="">
            <span className="blue-text text-darken-2"><b>@{message.sent_by.username}</b></span>
            <span className="blue-text text-darken-2"> 2:00pm</span>
          </div>
          <p className="msg_body">{message.message}</p>
        </div>
      );
    });

    return (
      <div>
        { hasGroup && isEmpty(this.props.messages) ? emptyMessage : messageItem }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    messages: state.groupMessages,
    userGroups: state.userGroups,
  };
}
export default connect(mapStateToProps)(MessageCard);
