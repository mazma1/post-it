import React from 'react';
import { shallow } from 'enzyme';
import { MessageBody } from '../../components/message-board/MessageBody';
import MockLocalStorage from '../MockLocalStorage';

Object.defineProperty(window, 'localStorage', { value: MockLocalStorage });

describe('<MessageBody />', () => {
  let mountedMessageBody;
  const props = {
    updateReadStatus: jest.fn(),
    messages: undefined,
    username: undefined,
    selectedGroup: undefined,
    match: {},
    history: { push: jest.fn() }
  };
  const event = {
    preventDefault: jest.fn()
  };
  const messageBody = () => {
    if (!mountedMessageBody) {
      mountedMessageBody = shallow(
        <MessageBody {...props} />
      );
    }
    return mountedMessageBody;
  };

  beforeEach(() => {
    mountedMessageBody = undefined;
    props.messages = [
      {
        id: 1,
        group: 1,
        message: 'Hello',
        sentBy: {
          username: 'mazma'
        }
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
    props.username = 'mazma';
    props.updateReadStatus = jest.fn(() => Promise.resolve());
  });

  it('should mount with handleBackClick()', () => {
    const handleBackClickSpy = jest.spyOn(messageBody().instance(), 'handleBackClick');
    messageBody().instance().handleBackClick();
    expect(handleBackClickSpy).toHaveBeenCalledTimes(1);
  });

  it('should mount with updateMessageDetails()', () => {
    const updateMessageDetailsSpy = jest.spyOn(messageBody().instance(), 'updateMessageDetails');
    messageBody().instance().updateMessageDetails();
    expect(updateMessageDetailsSpy).toHaveBeenCalledTimes(1);
  });

  it('should mount with openModal()', () => {
    const openModalSpy = jest.spyOn(messageBody().instance(), 'openModal');
    messageBody().instance().openModal(event);
    expect(openModalSpy).toHaveBeenCalledTimes(1);
  });

  it('should mount with closeModal()', () => {
    const closeModalSpy = jest.spyOn(messageBody().instance(), 'closeModal');
    messageBody().instance().closeModal(event);
    expect(closeModalSpy).toHaveBeenCalledTimes(1);
  });
});

