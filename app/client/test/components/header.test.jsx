import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { mount, shallow } from 'enzyme';
import { Header } from '../../components/client-frame/Header';
import AddUserButton from '../../components/partials/AddUserButton';
import GroupName from '../../components/partials/GroupName';
import GroupMembers from '../../components/tables/GroupMembersTable';
import ModalFrame from '../../components/modal/ModalFrame';
import MockLocalStorage from '../MockLocalStorage';
import {
  ModalHeader,
  ModalBody,
  ModalFooter
} from '../../components/modal/SubModals';

Object.defineProperty(window, 'localStorage', { value: MockLocalStorage });
Object.defineProperty(window.location, 'href', {
  writable: true,
  value: '/'
});

describe('<Header />', () => {
  let mountedHeader;
  const props = {
    logout: jest.fn(),
    setSelectedGroup: jest.fn(),
    setGroupMessages: jest.fn(),
    submitNewUser: jest.fn(),
    newUserSubmit: jest.fn(),
    username: '',
    membersLoading: false,
    groupMembers: [],
    selectedGroup: undefined,
    match: { params: {} },
    history: { push: jest.fn() }
  };
  const header = () => {
    if (!mountedHeader) {
      mountedHeader = mount(
        <MemoryRouter>
          <Header {...props} />
        </MemoryRouter>
      );
    }
    return mountedHeader;
  };

  beforeEach(() => {
    props.groupMembers = [
      {
        id: 1,
        firstname: 'Mary',
        lastname: 'Mazi',
        username: 'mazma',
        email: 'mazi.mary.o@gmail.com'
      }
    ];
    props.selectedGroup = {
      id: 1,
      name: 'Cohort 29'
    };
    props.submitNewUser = jest.fn(() => Promise.resolve());
  });

  it('should mount with submitNewUser()', () => {
    const event = { target: {}, preventDefault: jest.fn() };
    const submitNewUserSpy = jest.spyOn(Header.prototype, 'submitNewUser');
    const shallowHeader = shallow(<Header {...props} />);
    shallowHeader.instance().submitNewUser(event);
    expect(submitNewUserSpy).toHaveBeenCalledTimes(1);
  });

  it('should mount with onSearchClick()', () => {
    const onSearchClickSpy = jest.spyOn(Header.prototype, 'onSearchClick');
    const shallowHeader = shallow(<Header {...props} />);
    shallowHeader.instance().onSearchClick();
    expect(onSearchClickSpy).toHaveBeenCalledTimes(1);
  });

  it('should mount with logout()', () => {
    const event = { target: {}, preventDefault: jest.fn() };
    const logoutSpy = jest.spyOn(Header.prototype, 'logout');
    const shallowHeader = shallow(<Header {...props} />);
    shallowHeader.instance().logout(event);
    expect(logoutSpy).toHaveBeenCalledTimes(1);
  });

  it('should always render a wrapping div', () => {
    const divs = header().find('div');
    expect(divs.length).toBeGreaterThan(0);
  });

  describe('rendered wrapping div', () => {
    it('should contain everything else that gets rendered', () => {
      const divs = header().find('div');
      const wrappingDiv = divs.first();
      expect(wrappingDiv.children()).toEqual(header().children());
    });
  });

  it('should always render <GroupName/> with two props', () => {
    expect(header().find(GroupName).length).toBe(1);

    const groupnameDisplay = header().find(GroupName);
    expect(Object.keys(groupnameDisplay.props()).length).toBe(2);
  });

  it('should always render <GroupMembers/> with one prop', () => {
    expect(header().find(GroupMembers).length).toBe(1);

    const groupMembersDisplay = header().find(GroupMembers);
    expect(Object.keys(groupMembersDisplay.props()).length).toBe(1);
  });

  it('should always render <AddUserButton/> with two props', () => {
    expect(header().find(AddUserButton).length).toBe(1);

    const addUserButtonDisplay = header().find(AddUserButton);
    expect(Object.keys(addUserButtonDisplay.props()).length).toBe(2);
  });

  it('should always render addUser and groupMembers Modals', () => {
    expect(header().find(ModalFrame).length).toBe(2);
    expect(header().find(ModalHeader).length).toBe(2);
    expect(header().find(ModalBody).length).toBe(1);
    expect(header().find(ModalFooter).length).toBe(2);
  });
});
