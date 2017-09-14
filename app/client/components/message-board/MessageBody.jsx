import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import mapKeys from 'lodash/mapKeys';
import PropTypes from 'prop-types';
import { updateReadStatus } from '../../actions/groupMessages';
import ClientFrame from '..//client-frame/ClientFrame.jsx';
import ReadByTable from '../tables/ReadByTable.jsx';
import ModalFrame from '../modal/ModalFrame.jsx';
import {
  ModalHeader,
  ModalFooter,
  CloseButton } from '../modal/SubModals.jsx';


/** Renders the full content of a message */
class MessageBody extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      messageId: this.props.match.params.messageId,
      groupId: this.props.groups[0].id
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.updateMessageDetails = this.updateMessageDetails.bind(this);
  }

   /**
   * It dispatches updateMessageDetails action to update that a user has
   * read a message
   * 
   * @returns {void}
   */
  componentDidMount() {
    console.log(this.state.messageId)
    this.updateMessageDetails();
  }

  /**
   * Handles Open Modal event
   * @param {SyntheticEvent} event
   * 
   * @returns {void}
   */
  openModal(event) {
    event.preventDefault();
    this.setState({
      isOpen: true
    });
  }

  /**
  * Handles Close Modal event
  * @param {SyntheticEvent} event

  * @returns {void}
  */
  closeModal(event) {
    event.preventDefault();
    this.setState({
      isOpen: false
    });
  }

   /**
   * Function that updates that a user has read a message
   * 
   * @param {void} null
   * 
   * @returns {void} null
   */
  updateMessageDetails() {
    const { messageId, groupId } = this.state;
    const mappedMessages = mapKeys(this.props.messages, 'id');
    const clickedMessage = mappedMessages[messageId];
    const messageParams = {
      groupId,
      messageId,
      username: this.props.username,
      readBy: clickedMessage.readBy,
    };
    this.props.updateReadStatus(messageParams);
  }

  /**
   * Render
   * 
   * @returns {ReactElement} Full message markup
   */
  render() {
    const mappedMessages = mapKeys(this.props.messages, 'id');
    const clickedMessage = mappedMessages[this.state.messageId];

    return (
      <ClientFrame>
        <div>
          <div className="row">
            <div className="col s12 m10 offset-m1 message-card">
              <div className="card">
                <div className="card-content">
                  <span className="card-title">
                    @{clickedMessage.sentBy.username}:
                  </span>
                  <hr />
                  <h6 className="message-content full-msg">
                    {clickedMessage.message}
                  </h6>
                </div>

                <ul>
                  <li role="presentation" className="dropdown message-options">
                    <a
                      className="dropdown-toggle options"
                      data-toggle="dropdown"
                      role="button"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Options <span className="caret" />
                    </a>
                    <ul className="dropdown-menu msg-read-by">
                      <li>
                        <a
                          data-toggle="modal"
                          data-target="#readBy"
                        >
                          Read by
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col s12 m10 offset-m1">
              <Link to="/message-board">Back</Link>
            </div>
          </div>

          {/* Read By Modal */}
          <ModalFrame id="readBy">
            <ModalHeader header="Message Read By" onClose={this.closeModal} />

            <div className="modal-body">
              <ReadByTable messageId={Number(this.state.messageId)} />
            </div>

            <ModalFooter>
              <CloseButton onClick={this.closeModal} />
            </ModalFooter>
          </ModalFrame>
        </div>
      </ClientFrame>
    );
  }
}

/**
 * Maps pieces of the redux state to props
 * 
 * @param {object} state Redux state
 * 
 * @returns {object} The groups a user belongs to, the messages in respective
 * groups and the username of logged in user
 */
function mapStateToProps(state) {
  return {
    messages: state.groupMessages.messages,
    username: state.signedInUser.user.username,
    groups: state.userGroups.groups
  };
}

MessageBody.propTypes = {
  messages: PropTypes.array.isRequired,
  username: PropTypes.string.isRequired,
  groups: PropTypes.array.isRequired
};

export default connect(mapStateToProps, { updateReadStatus })(MessageBody);

