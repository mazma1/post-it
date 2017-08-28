import React from 'react';
import ClientFrame from '../client-frame/ClientFrame';
import MessageCard from './MsgCard';

/**
 * MessageBoard Component
 * @returns {ReactElement} MessageBoard Markup
 */
const MessageBoard = () => (
  <ClientFrame>
    <section className="cards card-panel-wrapper">
      <div className="msg_card_padding"></div>

      <MessageCard />

    </section>
  </ClientFrame>
);

export default MessageBoard;
