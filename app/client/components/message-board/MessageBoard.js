import React from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import ClientFrame from '../client-frame/ClientFrame';
import MessageCard from './MsgCard';
import MessageForm from './MsgForm';
import FlashMessageList from '../flash-message/FlashMessagesList';
import { getGroupMessages, noGroupMessages } from '../../actions/getGroupMessagesAction';


class MessageBoard extends React.Component {

  // componentWillMount() {
  //   const groupId = this.props.selectedGroup.id;
  //   if (groupId) {
  //     this.props.getGroupMessages(this.props.selectedGroup.id);
  //   }
  // }

  // componentWillReceiveProps(nextProps) {
  //   if (this.props.selectedGroup !== nextProps.selectedGroup) {

  //     const groupId = this.nextProps.selectedGroup.id;
  //     console.log('boardWillReceiveProps', nextProps.selectedGroup);
  //   }
  // }

  render() {
    const { messages } = this.props;
    // console.log(messages);
    return (
      <ClientFrame>
        <section className="cards card-panel-wrapper">
          <div className="msg_card_padding"></div>

          <FlashMessageList/>

          <MessageCard messages={messages}/>

          <div className="msg_card_bottom_padding"></div>

          <MessageForm/>

        </section>
       </ClientFrame>
    );
  }
}

function mapStateToProps(state) {
  return {
    messages: state.groupMessages,
    selectedGroup: state.selectedGroup
  };
}

export default connect(mapStateToProps, { getGroupMessages, noGroupMessages })(MessageBoard);
