import React from 'react';
import { shallow } from 'enzyme';
import { MessageCard } from '../../components/message-board/MessageCard';
import Dashboard from '../../components/Dashboard';
import MockLocalStorage from '../MockLocalStorage';

Object.defineProperty(window, 'localStorage', { value: MockLocalStorage });

describe('<MessageCard />', () => {
  let props;
  let mountedMessageCard;

  const event = {
    preventDefault: jest.fn()
  };
  const clickedMsgProps = { id: 1 };
  const messageCard = () => {
    if (!mountedMessageCard) {
      mountedMessageCard = shallow(
        <MessageCard {...props} />
      );
    }
    return mountedMessageCard;
  };

  beforeEach(() => {
    props = {
      getGroupMessages: jest.fn(),
      updateReadStatus: jest.fn(),
      authenticatedUsername: undefined,
      message: undefined,
      userGroups: undefined,
      selectedGroup: {},
      history: { push: jest.fn() }
    };
    mountedMessageCard = undefined;
    props.authenticatedUsername = 'mazma';
    props.updateReadStatus = jest.fn(() => Promise.resolve());
  });

  it('should mount with onMessageClick()', () => {
    props.userGroups = {
      isLoading: false,
      hasGroup: true,
      groups: [
        { id: 1, group_name: 'Cohort 29' }
      ]
    };
    const onMessageClickSpy = jest.spyOn(messageCard().instance(), 'onMessageClick');
    messageCard().instance().onMessageClick(clickedMsgProps);
    expect(onMessageClickSpy).toHaveBeenCalledTimes(1);
  });

  it('should mount with openModal()', () => {
    const openModalSpy = jest.spyOn(messageCard().instance(), 'openModal');
    messageCard().instance().openModal(event);
    expect(openModalSpy).toHaveBeenCalledTimes(1);
  });

  it('should mount with closeModal()', () => {
    const closeModalSpy = jest.spyOn(messageCard().instance(), 'closeModal');
    messageCard().instance().closeModal(event);
    expect(closeModalSpy).toHaveBeenCalledTimes(1);
  });

  it('should always render an empty <div /> if a user has no groups', () => {
    props.userGroups = {
      isLoading: false,
      hasGroup: false,
      groups: []
    };
    expect(messageCard().find('div').text()).toBe('');
  });

  describe('When a group\'s messages are still being fetched', () => {
    beforeEach(() => {
      props.message = {
        isLoading: true
      };
    });

    it("should render the 'Loading...' indicator", () => {
      expect(messageCard().find('div').text()).toBe('Loading...');
    });
  });

  describe('When request to fetch group\'s message has been completed', () => {
    beforeEach(() => {
      props.userGroups = {
        isLoading: false,
        hasGroup: true,
        groups: [
          { id: 1, group_name: 'Cohort 29' }
        ]
      };
    });

    it('should always render <Dashboard/> with appropriate message if there is no active group', () => {
      props.message = {
        isLoading: false,
        messages: {}
      };
      props.selectedGroup = {};
      const dashboardDisplay = messageCard().find(Dashboard);
      expect(Object.keys(dashboardDisplay.props()).length).toBe(1);
      expect(dashboardDisplay.props().message).toBe('Select a group on the sidebar to continue');
    });

    it('should always render <Dashboard/> with appropriate message if a group has no messages', () => {
      props.message = {
        isLoading: false,
        messages: {}
      };
      props.selectedGroup = {
        id: 1,
        name: 'Cohort 29'
      };
      const dashboardDisplay = messageCard().find(Dashboard);
      expect(Object.keys(dashboardDisplay.props()).length).toBe(1);
      expect(dashboardDisplay.props().message).toBe('This group currently has no messages');
    });

    it('should always render an error message if there was an error while fetching the messages', () => {
      props.message = {
        isLoading: false,
        error: { error: '' }
      };
      props.selectedGroup = {
        id: 1,
        name: 'Cohort 29'
      };
      expect(messageCard().find('p').text()).toBe('Unable to load messages. Please try again later');
    });
  });
});
