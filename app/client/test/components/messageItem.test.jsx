import React from 'react';
import { shallow } from 'enzyme';
import { MessageItem } from '../../components/message-board/MessageItem';
import MockLocalStorage from '../MockLocalStorage';

Object.defineProperty(window, 'localStorage', { value: MockLocalStorage });

describe('<MessageItem />', () => {
  let mountedMessageItem;
  const props = {
    getGroupMessagesCount: jest.fn(),
    archiveMessageRequest: jest.fn(),
    updateArchivedMessage: jest.fn(),
    messages: undefined,
    authenticatedUsername: undefined,
    match: {},
    history: { push: jest.fn() }
  };
  const event = {
    target: {
      dataset: { id: 1 }
    }
  };
  const messageItem = () => {
    if (!mountedMessageItem) {
      mountedMessageItem = shallow(
        <MessageItem {...props} />
      );
    }
    return mountedMessageItem;
  };

  beforeEach(() => {
    props.messages = [
      {
        id: 1,
        group: 1,
        message: 'Hello',
        sentBy: {
          username: 'mazma'
        },
        isArchived: '',
        readBy: 'mazma'
      }
    ];
    props.selectedGroup = {
      id: 1,
      name: 'Cohort 29'
    };
    props.match = {
      params: {
        messageId: 1
      }
    };
    props.authenticatedUsername = 'mazma';
    props.archiveMessage = jest.fn(() => Promise.resolve());
    // props.updateReadStatus = jest.fn(() => Promise.resolve());
  });

  it('should mount with onCategorySelect()', () => {
    const onCategorySelectSpy = jest.spyOn(messageItem().instance(), 'onCategorySelect');
    messageItem().instance().onCategorySelect({
      target: {
        name: 'messageStatus', value: 'unread'
      }
    });
    expect(onCategorySelectSpy).toHaveBeenCalledTimes(1);
  });

  it('should mount with updatePageNumber()', () => {
    const updatePageNumberSpy = jest.spyOn(messageItem().instance(), 'updatePageNumber');
    messageItem().instance().updatePageNumber({
      target: {
        id: 1
      }
    });
    expect(updatePageNumberSpy).toHaveBeenCalledTimes(1);
  });

  it('should mount with checkMessageLength()', () => {
    const checkMessageLengthSpy = jest.spyOn(messageItem().instance(), 'checkMessageLength');
    messageItem().instance().checkMessageLength({
      message: 'This is a sample message for component test'
    });
    expect(checkMessageLengthSpy).toHaveBeenCalledTimes(1);
  });

  it('should mount with filterMessages()', () => {
    const filterMessagesSpy = jest.spyOn(messageItem().instance(), 'filterMessages');
    messageItem().instance().filterMessages(props.messages);
    expect(filterMessagesSpy).toHaveBeenCalledTimes(1);
  });

  it('should mount with archiveMessageRequest()', () => {
    const archiveMessageRequestSpy = jest.spyOn(messageItem().instance(), 'archiveMessageRequest');
    messageItem().instance().archiveMessageRequest(props.messages[0]);
    expect(archiveMessageRequestSpy).toHaveBeenCalledTimes(1);
  });

  it('should open a message item when clicked', () => {
    const message = messageItem().find('p').hasClass('msg_body');
    expect(message).toBe(true);

    messageItem().find('p').simulate('click', event);
    expect(props.history.push.mock.calls.length).toBe(1);
  });
});
