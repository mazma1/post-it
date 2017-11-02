import React from 'react';
import { shallow } from 'enzyme';
import { MessageForm } from '../../components/message-board/MessageForm';

describe('<MessageForm', () => {
  let mountedMessageForm;
  const messageForm = () => {
    if (!mountedMessageForm) {
      mountedMessageForm = shallow(
        <MessageForm {...props} />
      );
    }
    return mountedMessageForm;
  };
  const props = {
    postNewMessage: jest.fn(),
    username: undefined,
    selectedGroup: undefined,
    groupId: undefined
  };

  beforeEach(() => {
    props.selectedGroup = {
      id: 1,
      name: 'Cohort 29'
    };
    props.groupId = props.selectedGroup.id;
    props.username = 'mazma';
  });

  it('should mount with onChange()', () => {
    const event = { target: { messageInput: 'Hello' } };
    const onChangeSpy = jest.spyOn(messageForm().instance(), 'onChange');
    messageForm().instance().onChange(event);
    expect(onChangeSpy).toHaveBeenCalledTimes(1);
  });

  it('should mount with onSelect()', () => {
    const event = { target: { priority: 'normal' } };
    const onSelectSpy = jest.spyOn(messageForm().instance(), 'onSelect');
    messageForm().instance().onSelect(event);
    expect(onSelectSpy).toHaveBeenCalledTimes(1);
  });

  it('should mount with onMessageSend()', () => {
    const event = { preventDefault: jest.fn() };
    const onMessageSendSpy = jest.spyOn(messageForm().instance(), 'onMessageSend');
    messageForm().instance().onMessageSend(event);
    expect(onMessageSendSpy).toHaveBeenCalledTimes(1);
  });

  it('should always render the message form when there is an active group', () => {
    expect(messageForm().find('footer').hasClass('footer')).toBe(true);
    expect(messageForm().find('[name="messageInput"]').length).toBe(1);
  });

  it('should call onMessageSend() when the message send button is clicked', () => {
    const sendButton = messageForm().find('a');
    const event = { preventDefault: jest.fn() };
    const onMessageSendSpy = jest.spyOn(messageForm().instance(), 'onMessageSend');
    expect(sendButton.length).toBe(1);

    sendButton.simulate('click', event);
    expect(onMessageSendSpy.mock.calls.length).toBe(1);
  });

  it('should pass a selected value to the onSelect handler', () => {
    const targetMock = {
      target: { priority: 'urgent' },
    };
    const onSelectSpy = jest.spyOn(messageForm().instance(), 'onSelect');

    messageForm().find('select').simulate('change', targetMock);
    expect(onSelectSpy).toBeCalledWith(targetMock);
  });
});
