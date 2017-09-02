import React from 'react';
import mapKeys from 'lodash/mapKeys';
import PropTypes from 'prop-types';
import ReadByTable from '../tables/ReadByTable.jsx';
import ModalFrame from '../modal/ModalFrame.jsx';
import {
  ModalHeader,
  ModalFooter,
  CloseButton } from '../modal/SubModals.jsx';


/**
 *Functional component that renders the full body of a message
 *@param {object} props All the properties received from the parent
 *@prop {object} props.closeMessage  Function that closes the component
 *@prop {object} props.clickedMessageId Id of clicked message
 *@prop {function} props.messages Array of messages in a group
 *@prop {function} props.openModal Handles the event to open modal that
 contains users that have read a message
 *@prop {function} props.closeModal Closes the modal that contains users
 that have read a message
 *@returns {JSX} Markup for the full message body
  */
function MessageBody(props) {
  const { clickedMessageId, messages } = props;
  const mappedMessages = mapKeys(messages, 'message_id');
  const clickedMessage = mappedMessages[clickedMessageId];
  const groupId = Object.keys(mappedMessages)[0];
  const closeMessage = () => props.closeMessage(groupId);

  return (
    <div>
      <div className="row">
        <div className="col s12 m10 offset-m1 message-card">
          <div className="card">
            <div className="card-content">
              <span className="card-title">
                @{clickedMessage.sent_by.username}:
              </span>
              <button
                onClick={closeMessage}
                className="close">
                <span>&times;</span>
              </button>
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
      </div>

      {/* Read By Modal */}
      <ModalFrame id="readBy">
        <ModalHeader header="Message Read By" onClose={props.closeModal} />

        <div className="modal-body">
          <ReadByTable messageId={clickedMessageId} />
        </div>

        <ModalFooter>
          <CloseButton onClick={props.closeModal} />
        </ModalFooter>
      </ModalFrame>
    </div>
  );
}

MessageBody.propTypes = {
  clickedMessageId: PropTypes.number.isRequired,
  messages: PropTypes.array.isRequired,
  closeMessage: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired
};

export default MessageBody;
