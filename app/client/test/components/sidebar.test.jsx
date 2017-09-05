import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import { spy } from 'sinon';
import { Sidebar } from '../../components/client-frame/sidebar/Sidebar';
import { Brand, MobileToggleBtn } from '../../components/misc/SidebarMisc';
import GroupList from '../../components/client-frame/sidebar/GroupList';
import ModalFrame from '../../components/modal/ModalFrame';
import {
  ModalHeader,
  ModalBody,
  ModalFooter
} from '../../components/modal/SubModals';

describe('Sidebar Component', () => {
  let mountedSidebar;
  const props = {
    getUserGroups: jest.fn(),
    setSelectedGroup: jest.fn(),
    submitNewGroup: jest.fn(),
    getGroupMembers: jest.fn(),
    getGroupMessages: jest.fn(),
    getGroupMessagesCount: jest.fn(),
    signedInUser: undefined,
    unreadCount: undefined,
    selectedGroup: undefined,
    userGroups: undefined
  };
  const sidebar = () => {
    if (!mountedSidebar) {
      mountedSidebar = mount(
        <MemoryRouter>
          <Sidebar {...props} />
        </MemoryRouter>
      );
    }
    return mountedSidebar;
  };

  beforeEach(() => {
    mountedSidebar = undefined;
    props.userGroups = {
      isLoading: false,
      hasGroup: true,
      groups: [
        { id: 1, group_name: 'Cohort 29' }
      ]
    };
    props.selectedGroup = {
      id: 1,
      name: 'Cohort 29'
    };
    props.unreadCount = [{
      id: 1,
      unreadCount: '2'
    }];
    props.signedInUser = {
      isAuthenticated: true,
      user: {
        id: 1,
        username: 'mazma'
      }
    };
    props.getUserGroups = () => {
      return new Promise((resolve, reject) => {
        const resolveGetUserGroups = resolve;
      });
    };
  });

  it('should always render a wrapping div', () => {
    const divs = sidebar().find('div');
    expect(divs.length).toBeGreaterThan(0);
  });

  describe('rendered wrapping div', () => {
    it('should contain everything else that gets rendered', () => {
      const divs = sidebar().find('div');
      const wrappingDiv = divs.first();
      expect(wrappingDiv.children()).toEqual(sidebar().children());
    });
  });

  it('should call componentWillMount() before it mounts', () => {
    spy(Sidebar.prototype, 'componentWillMount');
    sidebar();
    expect(Sidebar.prototype.componentWillMount.calledOnce).toBe(true);
  });

  it('should call componentDidMount() when it mounts', () => {
    spy(Sidebar.prototype, 'componentDidMount');
    sidebar();
    expect(Sidebar.prototype.componentDidMount.calledOnce).toBe(true);
  });

  it('should always render <Brand/> with one prop', () => {
    expect(sidebar().find(Brand).length).toBe(1);

    const brandDisplay = sidebar().find(Brand);
    expect(Object.keys(brandDisplay.props()).length).toBe(1);
  });

  it('should always render <MobileToggleBtn /> with no prop', () => {
    expect(sidebar().find(MobileToggleBtn).length).toBe(1);

    const mobileToggleBtnDisplay = sidebar().find(MobileToggleBtn);
    expect(Object.keys(mobileToggleBtnDisplay.props()).length).toBe(0);
  });

  it('should always render <GroupList/> with four props', () => {
    expect(sidebar().find(GroupList).length).toBe(1);

    const groupListDisplay = sidebar().find(GroupList);
    expect(Object.keys(groupListDisplay.props()).length).toBe(5);
  });

  it('should always render the createGroup Modal', () => {
    expect(sidebar().find(ModalFrame).length).toBe(1);
    expect(sidebar().find(ModalHeader).length).toBe(1);
    expect(sidebar().find(ModalBody).length).toBe(1);
    expect(sidebar().find(ModalFooter).length).toBe(1);
  });
});
