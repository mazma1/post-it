import React from 'react';
import { Link, MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import GroupList from '../../components/client-frame/sidebar/GroupList';

describe('<GroupList />', () => {
  let props;
  let mountedGroupList;

  const groupList = () => {
    if (!mountedGroupList) {
      mountedGroupList = mount(
        <MemoryRouter>
          <GroupList {...props} />
        </MemoryRouter>
      );
    }
    return mountedGroupList;
  };

  beforeEach(() => {
    props = {
      onGroupSelect: jest.fn(),
      openModal: jest.fn(),
      userGroups: undefined,
      selectedGroup: undefined,
      pathName: ''
    };
    mountedGroupList = undefined;
  });

  describe('When a user\'s groups are still being fetched', () => {
    beforeEach(() => {
      props.userGroups = {
        isLoading: true
      };
    });

    it("should render the 'Loading...' indicator", () => {
      expect(groupList().find('div').text()).toBe('Loading...');
    });
  });

  describe('When `groupsArray` exists', () => {
    beforeEach(() => {
      props.userGroups = {
        isLoading: false,
        hasGroup: true,
        groups: [
          { id: 1, name: 'Cohort 29' }
        ]
      };
      props.selectedGroup = {
        id: 1,
        name: 'Cohort 29'
      };
    });

    it('should render a Link with the given group name', () => {
      expect(groupList().find('li').length).toBeGreaterThan(0);
      expect(groupList().find(Link).length).toBe(2);
      expect(Link.children).toBe(props.userGroups.groups.group_name);
    });

    it('should render the button to create a new group', () => {
      expect(groupList().find('#createNewGroup').text()).toBe('Create New Group');
    });

    it('should call `onGroupSelect` function when group is clicked', () => {
      groupList().find('#singleGroup').simulate('click');
      expect(props.onGroupSelect.mock.calls.length).toBe(1);
    });
  });

  describe('When `hasGroup` is false', () => {
    beforeEach(() => {
      props.userGroups = {
        isLoading: false,
        hasGroup: false
      };
    });

    it('should render the empty group const', () => {
      expect(groupList().find('div').length).toBe(2);
      expect(groupList().find('p').text()).toBe('No groups available.');
      expect(groupList().find('a').text()).toBe('Click to create new group');
    });
  });
});
