import React from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import moment from 'moment';

class MessageCard extends React.Component {
  render() {
    const hasGroup = this.props.userGroups.hasGroup;
    const messageLoading = this.props.message.isLoading;
    const messageLoadingError = this.props.message.error;
    const messages = this.props.message.messages;
    const divPadding = {
      paddingLeft: '20px',
      paddingTop: '20px'
    };

    if (messageLoading) {
      return <div style={divPadding}>Loading...</div>;
    }

    if (!messageLoading) {
      if (hasGroup && !messageLoadingError && isEmpty(messages)) {
        return (
          <div style={divPadding}>
            <p>This group currently has no messages</p>
          </div>
        );
      } else if (hasGroup && messageLoadingError) {
        return (
          <div style={divPadding}>
            <p>Unable to load messages. Please try again later</p>
          </div>
        );
      } else if (!hasGroup) {
        return <div></div>;
      }
    }

    const messageItem = messages.map((message) => {
      const time = moment(message.sent_at).format('ddd, MMM Do. h:mm a');
      return (
        <div className="card-panel" key={message.message_id}>
          <div className="">
            <span className="blue-text text-darken-2"><b>@{message.sent_by.username}</b></span>
            <span className="blue-text text-darken-2"> {time}</span>
          </div>
          <p className="msg_body">{message.message}</p>
        </div>
      );
    });

    return (
      <div>
        { messageItem }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    message: state.groupMessages,
    userGroups: state.userGroups
  };
}
export default connect(mapStateToProps)(MessageCard);
