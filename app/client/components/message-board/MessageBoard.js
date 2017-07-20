import React from 'react';
import ReactDOM from 'react-dom';
import ClientFrame from '../client-frame/ClientFrame';
import MessageCard from './MsgCard';
import MessageForm from './MsgForm';
import FlashMessageList from '../flash-message/FlashMessagesList';


class MessageBoard extends React.Component {
  constructor(props) {
    super(props);

    this.callback = this.callback.bind(this);
    this.scrollToBottom = this.scrollToBottom.bind(this);
  }

  callback(el) {
    this.messagesEnd = el;
  }

  scrollToBottom(){
    this.messagesEnd.scrollIntoView({ behavior: 'smooth' });
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }
  
  render() {
    return (
      <ClientFrame>
        <section className="cards card-panel-wrapper">
          <div className="msg_card_padding"></div>

          <FlashMessageList/>

          <MessageCard />

          <div className="msg_card_bottom_padding" ref={this.callback}></div>

          <MessageForm/>

        </section>
       </ClientFrame>
    );
  }
}

export default MessageBoard;
