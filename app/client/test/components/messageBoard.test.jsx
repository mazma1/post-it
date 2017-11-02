import React from 'react';
import { shallow } from 'enzyme';
import MessageBoard from '../../components/message-board/MessageBoard';
import MessageCard from '../../components/message-board/MessageCard';
import ClientFrame from '../../components/client-frame/ClientFrame';

let mountedMessageBoard;
const messageBoard = () => {
  if (!mountedMessageBoard) {
    mountedMessageBoard = shallow(
      <MessageBoard />
    );
  }
  return mountedMessageBoard;
};

describe('<MessageBoard />', () => {
  it('should always render a wrapping <ClientFrame/>', () => {
    const clientFrame = messageBoard().find(ClientFrame);
    expect(clientFrame.length).toBe(1);
    expect(clientFrame.children()).toEqual(messageBoard().children());
  });

  it('should always render <MessageCard/>', () => {
    expect(messageBoard().find(MessageCard).length).toBe(1);
  });
});
