import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Dashboard from '../Dashboard';
import MessageForm from './MessageForm';
import {
  updateReadStatus,
  getGroupMessages } from '../../actions/groupMessages';
import MessageItem from '../message-board/MessageItem';


/**
  * A collection of MessageItems that sisplays the available messages
  * on the message board
  *
  * @class MessageCard
  *
  * @extends {React.Component}
  */
export class MessageCard extends React.Component {
  /**
    * Creates an instance of MessageCard
    *
    * @param {any} props
    *
    * @memberof MessageCard
    */
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      messageId: '',
      clickedMessageId: '',
      messageOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.onMessageClick = this.onMessageClick.bind(this);
  }

   /**
   * Updates the read status of a message when clicked
   *
   * @param {object} clickedMsgProps - Id and readStatus of clicked message
   *
   * @returns {func} request to update read status
   */
  onMessageClick(clickedMsgProps) {
    const clickedMessageId = clickedMsgProps.id;
    this.setState({
      clickedMessageId,
      messageOpen: true
    });
    const messageDetails = {
      messageId: clickedMessageId,
      username: this.props.authenticatedUsername,
      readBy: clickedMsgProps.readBy,
      groupId: this.props.userGroups.groups[0].id
    };
    return this.props.updateReadStatus(messageDetails);
  }

  /**
   * Handles Open Modal event
   *
   * @param {SyntheticEvent} event
   *
   * @returns {void} null
   */
  openModal(event) {
    event.preventDefault();
    this.setState({
      isOpen: true
    });
  }

  /**
   * Handles Close Modal event
   *
   * @param {SyntheticEvent} event
   *
   * @returns {void}
   */
  closeModal(event) {
    event.preventDefault();
    this.setState({
      isOpen: false
    });
  }

  /**
   * Renders MessageCard componet
   *
   * @returns {ReactElement} MessageCard markup
   */
  render() {
    const { selectedGroup } = this.props;
    const { messages } = this.props.message;
    const { hasGroup } = this.props.userGroups;
    const messageLoading = this.props.message.isLoading;
    const messageLoadingError = this.props.message.error;
    const props = {
      messages,
      onMessageClick: this.onMessageClick,
      clickedMessageId: this.state.clickedMessageId,
      authenticatedUsername: this.props.authenticatedUsername
    };

    if (messageLoading) {
      return <div className="group-spinner loading-padding">Loading...</div>;
    }

    if (!messageLoading) {
      if (hasGroup && !messageLoadingError && !isEmpty(selectedGroup) && isEmpty(messages)) {
        return (
          <div className="loading-padding">
            <Dashboard message="This group currently has no messages" />


            <div className="msg_card_bottom_padding" />
            <MessageForm />
          </div>
        );
      }
      if (hasGroup && !messageLoadingError && isEmpty(selectedGroup) && isEmpty(messages)) {
        return (
          <div>
            <Dashboard message="Select a group on the sidebar to continue" />
          </div>
        );
      }
      if (hasGroup && messageLoadingError) {
        return (
          <div className="loading-padding">
            <p>Unable to load messages. Please try again later</p>
          </div>
        );
      }
      if (!hasGroup) {
        return <div />;
      }
    }
    return (
      <div>
        <MessageItem {...props} />
      </div>
    );
  }
}

/**
 * Maps pieces of the redux state to props in Sidebar
 *
 * @param {object} state Redux state
 *
 * @returns {object} authenticated user and active group details
 */
function mapStateToProps(state) {
  return {
    message: state.groupMessages,
    userGroups: state.userGroups,
    selectedGroup: state.selectedGroup,
    authenticatedUsername: state.signedInUser.user.username
  };
}

/**
 * Maps action creators to redux dispatch function and avails them as props
 *
 * @param {function} dispatch Redux dispatch function
 *
 * @returns {function} Action cretaors bound to redux dispatch function
 */
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    updateReadStatus,
    getGroupMessages
  }, dispatch);
}

MessageCard.propTypes = {
  getGroupMessages: PropTypes.func.isRequired,
  updateReadStatus: PropTypes.func.isRequired,
  authenticatedUsername: PropTypes.string,
  selectedGroup: PropTypes.object.isRequired,
  userGroups: PropTypes.object,
  message: PropTypes.object
};

MessageCard.defaultProps = {
  userGroups: {},
  message: {},
  authenticatedUsername: ''
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageCard);
