import React from 'react';
import { BrowserRouter, Route, NavLink, Switch, Redirect } from 'react-router-dom';
import ClientFrame from '../client-frame/ClientFrame';
import MessageCard from './MsgCard';
import MessageForm from './MsgForm';
import FlashMessageList from '../flash-message/FlashMessagesList';


class MessageBoard extends React.Component {
  render() {
    return (
      <ClientFrame>
        <section className="cards card-panel-wrapper">
          <div className="msg_card_padding"></div>

          <FlashMessageList/>

          <MessageCard/>

          <div className="msg_card_bottom_padding"></div>

          <MessageForm/>
          
        </section>
       </ClientFrame>
    );
  }
}

module.exports = MessageBoard;
