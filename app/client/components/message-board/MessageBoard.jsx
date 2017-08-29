import React from 'react';
import ClientFrame from '../client-frame/ClientFrame.jsx';
import MessageCard from './MsgCard.jsx';

/**
 * MessageBoard Component
 * @returns {ReactElement} MessageBoard Markup
 */
const MessageBoard = () => (
  <ClientFrame>
    <section className="cards card-panel-wrapper">
      <div className="msg_card_padding"></div>

      <MessageCard />

      <div className="msg_card_bottom_padding"></div>
    </section>
  </ClientFrame>
);

export default MessageBoard;
