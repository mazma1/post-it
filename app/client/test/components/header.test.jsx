import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import { spy } from 'sinon';
import { Header } from '../../components/client-frame/Header';
import { AddUserBtn, GroupName } from '../../components/misc/HeaderMisc';
import GroupMembers from '../../components/tables/GroupMembersTable';
import ModalFrame from '../../components/modal/ModalFrame';
import {
  ModalHeader,
  ModalBody,
  ModalFooter,
  SubmitButton
} from '../../components/modal/SubModals';

describe('Header Component', () => {
  let mountedHeader;
  const props = {
    logout: jest.fn(),
    setSelectedGroup: jest.fn(),
    setGroupMessages: jest.fn(),
    submitNewUser: jest.fn(),
    newUserSubmit: jest.fn(),
    username: '',
    membersLoading: '',
    groupMembers: [],
    selectedGroup: undefined
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
    // props.submitNewUser = () => {
    //   return new Promise((resolve, reject) => {
    //     const resolveSubmitNewUser = resolve;
    //   });
    // };
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

  it('should always render <AddUserBtn/> with two props', () => {
    expect(header().find(AddUserBtn).length).toBe(1);

    const addUserBtnDisplay = header().find(AddUserBtn);
    expect(Object.keys(addUserBtnDisplay.props()).length).toBe(2);
  });

  // it('should call `newUserSubmit` function when new user is submitted', () => {
  //   header().find(SubmitButton).simulate('submit');
  //   expect(props.newUserSubmit.mock.calls.length).toBe(1);
  // });

  it('should always render addUser and groupMembers Modals', () => {
    expect(header().find(ModalFrame).length).toBe(2);
    expect(header().find(ModalHeader).length).toBe(2);
    expect(header().find(ModalBody).length).toBe(1);
    expect(header().find(ModalFooter).length).toBe(2);
  });
});
