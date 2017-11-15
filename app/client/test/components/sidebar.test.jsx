import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { mount, shallow } from 'enzyme';
import { Sidebar } from '../../components/client-frame/sidebar/Sidebar';
import Brand from '../../components/partials/Brand';
import MobileToggleButton from '../../components/partials/MobileToggleButton';
import GroupList from '../../components/client-frame/sidebar/GroupList';
import MockLocalStorage from '../MockLocalStorage';

Object.defineProperty(window, 'localStorage', { value: MockLocalStorage });

describe('<Sidebar />', () => {
  let mountedSidebar;
  const props = {
    getUserGroups: jest.fn(),
    setSelectedGroup: jest.fn(),
    submitNewGroup: jest.fn(),
    getGroupMembers: jest.fn(),
    getGroupMessages: jest.fn(),
    getGroupMessagesCount: jest.fn(),
    signedInUser: undefined,
    selectedGroup: undefined,
    userGroups: undefined,
    pathName: '',
    history: { push: jest.fn() },
    match: {}
  };
  const sidebar = () => {
    if (!mountedSidebar) {
      mountedSidebar = mount((
        <MemoryRouter>
          <Sidebar {...props} />
        </MemoryRouter>
      ), { context: this });
    }
    return mountedSidebar;
  };

  beforeEach(() => {
    mountedSidebar = undefined;
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
    props.signedInUser = {
      isAuthenticated: true,
      user: {
        id: 1,
        username: 'mazma'
      }
    };
    props.getGroupMessagesCount = jest.fn(() => Promise.resolve());
    props.getUserGroups = jest.fn(() => Promise.resolve());
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
    const CWMSpy = jest.spyOn(sidebar().instance(), 'componentWillMount');
    sidebar().instance().componentWillMount();
    expect(CWMSpy).toHaveBeenCalledTimes(1);
  });

  it('should mount with onGroupSelect()', () => {
    const group = { id: 1 };
    const onGroupSelectSpy = jest.spyOn(Sidebar.prototype, 'onGroupSelect');
    const shallowSidebar = shallow(<Sidebar {...props} />);
    shallowSidebar.instance().onGroupSelect(group);
    expect(onGroupSelectSpy).toHaveBeenCalledTimes(1);
  });

  it('should always render <Brand/> with one prop', () => {
    expect(sidebar().find(Brand).length).toBe(1);

    const brandDisplay = sidebar().find(Brand);
    expect(Object.keys(brandDisplay.props()).length).toBe(1);
    expect(brandDisplay.props().brandName).toBe('Post It');
  });

  it('should always render <MobileToggleButton /> with no prop', () => {
    expect(sidebar().find(MobileToggleButton).length).toBe(1);

    const mobileToggleBtnDisplay = sidebar().find(MobileToggleButton);
    expect(Object.keys(mobileToggleBtnDisplay.props()).length).toBe(0);
  });

  it('should always render <GroupList/> with six props', () => {
    expect(sidebar().find(GroupList).length).toBe(1);

    const groupListDisplay = sidebar().find(GroupList);
    expect(Object.keys(groupListDisplay.props()).length).toBe(6);
    expect(groupListDisplay.props().userGroups).toBe(props.userGroups);
    expect(groupListDisplay.props().selectedGroup).toBe(props.selectedGroup);
  });
});
