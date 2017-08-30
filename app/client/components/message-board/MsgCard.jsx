import React from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import { updateReadStatus, getGroupMessages } from '../../actions/groupMessages';
import MessageBody from '../message-board/MessageBody.jsx';
import MessageItem from '../message-board/MessageItem.jsx';

/** MessageCard component for message board */
class MessageCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      messageId: '',
      clickedMessageId: '',
      messageOpen: false
    };

    this.setMessageId = this.setMessageId.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.onMessageClick = this.onMessageClick.bind(this);
    this.closeMessageBody = this.closeMessageBody.bind(this);
  }


  openModal(e) {
    e.stopPropagation();
    this.setState({
      isOpen: true
    });
  }

  closeModal(e) {
    e.preventDefault();
    this.setState({
      isOpen: false
    });
  }

  setMessageId(id) {
    // e.preventDefault();
    this.setState({
      messageId: id
    });
  }

  closeMessageBody(groupId) {
    // e.preventDefault();
    this.props.getGroupMessages(groupId);
    this.setState({ messageOpen: false });
  }

  onMessageClick(clickedMsgProps) {
    // e.preventDefault();
    const clickedMessageId = clickedMsgProps.id;
    this.setState({
      clickedMessageId,
      messageOpen: true
    });
    const messageDetails = {
      message_id: clickedMessageId,
      username: this.props.authenticatedUsername,
      read_by: clickedMsgProps.read_by,
      group_id: this.props.userGroups.groups[0].id
    };
    return this.props.updateReadStatus(messageDetails);
  }
  /**
   * Render
   * @prop {boolean} hasGroup If a signed in user belongs to a group
   * @prop {boolean} messageLoading if group messages are still being fetched
   * @prop {array} messages Group messages
   * @returns {ReactElement} MessageCard markup
   */

  render() {
    const hasGroup = this.props.userGroups.hasGroup;
    const messageLoading = this.props.message.isLoading;
    const messageLoadingError = this.props.message.error;
    const messages = this.props.message.messages;
    const divPadding = {
      paddingLeft: '20px',
      paddingTop: '20px'
    };
    const props = {
      messages: this.props.message.messages,
      onMessageClick: this.onMessageClick,
      onReadByClick: this.setMessageId,
      clickedMessageId: this.state.clickedMessageId,
      authenticatedUsername: this.props.authenticatedUsername
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
    return (
      <div>
        { this.state.messageOpen ?
        <MessageBody
          closeMessage={this.closeMessageBody}
          clickedMessageId={this.state.clickedMessageId}
          closeModal={this.closeModal}
          openModal={this.openModal}
          messages={this.props.message.messages}/>
        :
        <div>
          <MessageItem {...props} />
        </div>
        }
      </div>
    );
  }
}

/**
 * Maps pieces of the redux state to props
 * @param {object} state Redux state
 * @returns {object} Details of active group messages and groups a user belongs to
 */
function mapStateToProps(state) {
  return {
    message: state.groupMessages,
    userGroups: state.userGroups,
    authenticatedUsername: state.signedInUser.user.username
  };
}

export default connect(mapStateToProps, { updateReadStatus, getGroupMessages })(MessageCard);
