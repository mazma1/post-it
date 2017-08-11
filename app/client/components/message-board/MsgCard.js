import React from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import classnames from 'classnames';
import moment from 'moment';
import { updateReadStatus } from '../../actions/groupMessagesAction';
import ModalFrame from '../modal/ModalFrame';
import {
  ModalHeader,
  ModalFooter,
  CloseButton } from '../modal/SubModals';
import ReadByTable from '../tables/ReadByTable';

/** MessageCard component for message board */
class MessageCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      messageId: ''
    };

    this.setMessageId = this.setMessageId.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
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

    const messageItem = messages.map((message, index) => {
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

      const time = moment(message.sent_at).format('ddd, MMM Do. h:mm a');
      const onReadByClick = () => this.setMessageId(message.message_id);
      return (
        <div key={index}>
          <div className="card-panel row" key={message.message_id}>
            <div className="col s12 m4 l11">
              <span className="blue-text text-darken-2"><b>@{message.sent_by.username}</b></span>
              <span className="blue-text text-darken-2"> {time}</span>
              <span className={
                classnames('label',
                            'priority-label',
                            { 'label-default': normalPriority },
                            { 'label-warning': urgentPriority },
                            { 'label-danger': criticalPriority })}>{message.priority}</span>
            </div>

            <div className="col s12 m4 l1">
              <ul>
                <li role="presentation" className="dropdown">
                  <a className="dropdown-toggle options" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
                    Options <span className="caret"></span>
                  </a>
                  <ul className="dropdown-menu msg-read-by">
                    <li><a
                      data-toggle="modal" data-target="#readBy"
                      onClick={onReadByClick}
                      href="#">Read by</a></li>
                  </ul>
                </li>
              </ul>
            </div>
            <p className="msg_body">{message.message}</p>
          </div>

          {/* Read By Modal */}
          <ModalFrame id='readBy'>
            <ModalHeader header='Message Read By' onClose={this.closeModal}/>

            <div className="modal-body">
              <ReadByTable messageId={this.state.messageId}/>
            </div>

            <ModalFooter>
              <CloseButton onClick={this.closeModal} />
            </ModalFooter>
        </ModalFrame>
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

export default connect(mapStateToProps, { updateReadStatus })(MessageCard);
