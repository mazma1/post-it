import React from 'react';
import mapKeys from 'lodash/mapKeys';
import {
  ModalHeader,
  ModalFooter,
  CloseButton } from '../modal/SubModals';
import ReadByTable from '../tables/ReadByTable';
import ModalFrame from '../modal/ModalFrame';

function MessageBody(props) {
  const { clickedMessageId, messages } = props;
  const mappedMessages = mapKeys(messages, 'message_id');
  return (
    <div>
      <div className="row">
        <div className="col s12 m10 offset-m1 message-card">
          <div className="card">
            <div className="card-content">
              <span className="card-title">{mappedMessages[clickedMessageId].sent_by.username}</span>
              <button onClick={props.closeMessage} className="close"><span>&times;</span></button>
              <hr />
              <h6 className="message-content">{mappedMessages[clickedMessageId].message}</h6>
            </div>

            <ul>
              <li role="presentation" className="dropdown message-options">
                <a className="dropdown-toggle options" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
                  Options <span className="caret"></span>
                </a>
                <ul className="dropdown-menu msg-read-by">
                  <li><a
                    data-toggle="modal" data-target="#readBy"
                    onClick={props.onReadByClick}
                    href="#">Read by</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Read By Modal */}
      <ModalFrame id='readBy'>
        <ModalHeader header='Message Read By' onClose={props.closeModal}/>

        <div className="modal-body">
          <ReadByTable messageId={clickedMessageId}/>
        </div>

        <ModalFooter>
          <CloseButton onClick={props.closeModal} />
        </ModalFooter>
      </ModalFrame>
    </div>
  );
}

export default MessageBody;
