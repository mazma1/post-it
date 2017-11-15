import React from 'react';
import moment from 'moment';
import toastr from 'toastr';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import lodashSplit from 'lodash/split';
import includes from 'lodash/includes';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import MessageForm from './MessageForm';
import {
  getGroupMessagesCount,
  archiveMessage, updateArchivedMessage } from '../../actions/groupMessages';


/**
  * Displays a single message on the message board
  *
  * @class MessageItem
  *
  * @extends {React.Component}
  */
export class MessageItem extends React.Component {

   /**
    * Creates an instance of MessageItem
    *
    * @param {object} props
    *
    * @memberof MessageForm
    */
  constructor(props) {
    super(props);

    this.state = {
      messageStatus: '',
      unreadMsgs: [],
      archivedMsgs: [],
      currentPage: 1,
      messagesPerPage: 10
    };

    this.onCategorySelect = this.onCategorySelect.bind(this);
    this.archiveMessageRequest = this.archiveMessageRequest.bind(this);
    this.filterMessages = this.filterMessages.bind(this);
    this.checkMessageLength = this.checkMessageLength.bind(this);
    this.updatePageNumber = this.updatePageNumber.bind(this);
  }


  /**
  * Sets messageStatus in state to 'unread'
  *
  * @returns {void} null
  */
  componentWillMount() {
    this.setState({ messageStatus: 'unread' });
  }

  /**
   * Fetches messages and filters them as unread/read and archived
   *
   * @returns {void} null
   */
  componentDidMount() {
    this.filterMessages(this.props.messages);
  }

  /**
    * Filters new array of messages when a new message is posted
    *
    * @param {object} nextProps - New props passed to MessageItem component
    *
    * @returns {void}
    *
    */
  componentWillReceiveProps(nextProps) {
    this.filterMessages(nextProps.messages);
  }


  /**
   * Handles message category select event
   *
   * @param {SyntheticEvent} event
   *
   * @returns {void} null
   */
  onCategorySelect(event) {
    this.setState({ messageStatus: event.target.value });
  }


  /**
   * Updates the current page state with the clicked page number
   *
   * @param {SyntheticEvent} event
   *
   * @returns {void} null
   */
  updatePageNumber(event) {
    this.setState({ currentPage: Number(event.target.id) });
  }


  /**
   * Filters messages based on the message category a user selects
   *
   * @param {array} messages messages to be filtered
   *
   * @returns {void} null
   */
  filterMessages(messages) {
    const unreadMsgs = [];
    const archivedMsgs = [];
    messages.map((message) => {
      if (!includes(message.isArchived, this.props.authenticatedUsername)) {
        unreadMsgs.push(message);
      }
      if (includes(message.isArchived, this.props.authenticatedUsername)) {
        archivedMsgs.push(message);
      }
    });
    this.setState({ unreadMsgs, archivedMsgs });
  }


  /**
   * Checks the length of a given message and truncates it
   * if it is more than 300
   *
   * @param {string} message - Message to be transformed
   *
   * @returns {string} Message or transformed message (if length > 300)
   */
  checkMessageLength(message) {
    if (message.length > 300) {
      return `${message.substring(0, 299)}...`;
    }
    return message;
  }


  /**
   * Archives a given message and updates the messages displayed
   * in both categories
   *
   * @param {object} messageId - Id of message to be archived
   *
   * @returns {void} null
   */
  archiveMessageRequest(messageId) {
    const { messages } = this.props;
    this.props.archiveMessage(messageId).then(
      () => {
        this.props.messages.map((message) => {
          if (message.id === this.props.archivedMessage.id) {
            const messageIndex = messages.indexOf(message);
            messages[messageIndex] = this.props.archivedMessage;
            this.props.updateArchivedMessage(messages);
            this.filterMessages(this.props.messages);
          }
        });
        toastr.success('Message successfully archived');
      }
    );
  }


  /**
   * Renders Message Item component
   *
   * @returns {ReactElement} Markup for a single message item
   */
  render() {
    let filteredMessages;
    const { authenticatedUsername } = this.props;
    const {
      messagesPerPage,
      currentPage,
      messageStatus } = this.state;
    if (this.state.messageStatus === 'unread') {
      filteredMessages = this.state.unreadMsgs;
    } else {
      filteredMessages = this.state.archivedMsgs;
    }

    const ArchiveBtn = (props) => {
      if (!includes(props.message.isArchived, authenticatedUsername)) {
        return (
          <i
            className="material-icons pull-right archive-btn"
            data-toggle="tooltip" data-placement="left" title="Archive Message"
            onClick={() => this.archiveMessageRequest({
              messageId: props.message.id
            })}
          >
            archive
          </i>
        );
      }
      return null;
    };

    // render page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredMessages.length / messagesPerPage); i += 1) {
      pageNumbers.push(i);
    }
    const renderPagination = pageNumbers.map(number => (
      <li
        className={classnames({
          active: this.state.currentPage === number
        })}
        key={number}
        onClick={this.updatePageNumber}
      >
        <a id={number}>{number}</a>
      </li>
    ));

    // pagination logic
    const lastMessageIndex = currentPage * messagesPerPage;
    const firstMessageIndex = lastMessageIndex - messagesPerPage;
    const currentMessages = filteredMessages.slice(
      firstMessageIndex, lastMessageIndex
    );
    return (
      <div>
        <select
          className="browser-default msg-filter form-control"
          name="messageStatus"
          onChange={this.onCategorySelect}
          value={this.state.messageStatus}
        >
          <option value="unread">Unread / Read</option>
          <option value="archived">Archived</option>
        </select>
        {
          currentMessages.map((message) => {
            const time = moment(message.sentAt).format('ddd, MMM Do. h:mm a');
            const readBy = message.readBy;
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
              <div key={message.id}>
                <div className="card-panel row">
                  <span className="blue-text text-darken-2 font18">
                    <b>@{message.sentBy.username} </b>
                  </span>
                  <span className="blue-text text-darken-2 font18">
                    {time}
                  </span>
                  <span
                    className={classnames(
                      'label',
                      'priority-label',
                      { 'label-default': normalPriority },
                      { 'label-warning': urgentPriority },
                      { 'label-danger': criticalPriority }
                    )}
                  >
                    {message.priority}
                  </span>
                  <span className="font18">
                    {
                      includes(readByArray, authenticatedUsername) ?
                        <ArchiveBtn message={message} />
                      : ' | Unread'
                    }
                  </span>
                  <p
                    className="msg_body"
                    data-id={this.props.match.params.groupId}
                    onClick={(event) => {
                      const groupId = event.target.dataset.id;
                      this.props.history.push(
                        `/message-board/${groupId}/message/${message.id}`
                      );
                      localStorage.setItem('groupId', event.target.dataset.id);
                    }}
                  >
                    {this.checkMessageLength(message.message)}
                  </p>
                </div>
              </div>
            );
          })
        }

        <div className="col s12 pagination-container">
          <ul className="pagination center-align">
            {pageNumbers.length > 1 ?
              renderPagination
              : null}
          </ul>
        </div>

        {
          messageStatus === 'unread' ?
            <div>
              <div className="msg_card_bottom_padding" />
              <MessageForm />
            </div>
          : null
        }
      </div>
    );
  }
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
    getGroupMessagesCount,
    archiveMessage,
    updateArchivedMessage
  }, dispatch);
}


/**
 * Maps pieces of the redux state to props in MessageItem
 *
 * @param {object} state Redux state
 *
 * @returns {object} Details of the active group and archived message
 */
function mapStateToProps(state) {
  return {
    selectedGroup: state.selectedGroup,
    archivedMessage: state.archivedMessage[0]
  };
}

MessageItem.propTypes = {
  messages: PropTypes.array,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  archiveMessage: PropTypes.func.isRequired,
  archivedMessage: PropTypes.object,
  updateArchivedMessage: PropTypes.func.isRequired,
  authenticatedUsername: PropTypes.string.isRequired,
};

MessageItem.defaultProps = {
  messages: [],
  archivedMessage: {}
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MessageItem)
);
