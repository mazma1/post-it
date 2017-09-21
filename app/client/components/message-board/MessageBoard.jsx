import React from 'react';
import ClientFrame from '../client-frame/ClientFrame';
import MessageCard from './MsgCard';

const MessageBoard = () => (
  <ClientFrame>
    <section className="cards card-panel-wrapper">
      <div className="msg_card_padding" />

      <MessageCard />

    </section>
  </ClientFrame>
);

export default MessageBoard;
