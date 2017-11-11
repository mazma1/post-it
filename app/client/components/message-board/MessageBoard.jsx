import React from 'react';
import ClientFrame from '../client-frame/ClientFrame';
import MessageCard from './MessageCard';


/**
  * Renders the message board
  *
  * @returns {JSX} Message board markup tht consists of the client frame and
  * the MessageCard component
  */
const MessageBoard = () => (
  <ClientFrame>
    <section className="cards card-panel-wrapper">
      <div className="msg_card_padding" />

      <MessageCard />

    </section>
  </ClientFrame>
);

export default MessageBoard;
