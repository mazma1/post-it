import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import * as actions from '../../../client/actions/userGroups';
import * as types from '../../actions/types';

const middlewares = [thunk];
const mock = new MockAdapter(axios);
const mockStore = configureMockStore(middlewares);


describe('User Groups Action\'s', () => {
  describe('#fetchingUserGroups', () => {
    it('should set user groups as empty when request has not been fulfilled', () => {
      const group = [];
      const expectedAction = {
        type: types.FETCHING_USER_GROUPS,
        group
      };
      expect(actions.fetchingUserGroups()).toEqual(expectedAction);
    });
  });

  describe('#setUserGroups', () => {
    it('should update the store with returned user\'s groups', () => {
      const groups = [
        {
          id: 1,
          name: 'Cohort 29'
        },
        {
          id: 2,
          name: 'Teens Code'
        }
      ];
      const expectedAction = {
        type: types.SET_USER_GROUPS,
        groups
      };
      expect(actions.setUserGroups(groups)).toEqual(expectedAction);
    });
  });

  describe('#getUserGroups', () => {
    it('should create SET_USER_GROUPS to update store when request to get user\'s groups is successful', () => {
      mock.onGet('/api/v1/users/1/groups')
        .reply(200, { data: { groups: [{ id: 1, name: 'Cohort 29' }] } });

      const expectedAction = [
        {
          type: types.FETCHING_USER_GROUPS,
          group: []
        },
        {
          type: types.SET_USER_GROUPS,
          groups: [{ id: 1, name: 'Cohort 29' }]
        },
      ];
      const store = mockStore();

      store.dispatch(actions.getUserGroups(1)).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
    });

    it('should report an error when request to fetch user\'s groups fails', () => {
      mock.onGet('/api/v1/users/1/groups')
        .reply(500, { error: 'Internal server error' });

      const expectedAction = {
        type: types.SUBMIT_NEW_GROUP_FAILURE,
        error: {}
      };
      const store = mockStore({ group: [] });

      store.dispatch(actions.getUserGroups(1)).catch(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
    });
  });

  describe('#submitNewGroup', () => {
    it('should make request to save new group to the database', () => {
      const userId = 1;
      const groupName = 'Cohort 29';
      mock.onPost('/api/v1/groups').reply(201, {});

      const store = mockStore();

      store.dispatch(actions.submitNewGroup({ groupName, userId })).then(() => {
        store.dispatch(actions.setNewGroupActive({ userId }));
      });
    });
  });

  describe('#setNewGroupActive', () => {
    it('should set the most recent group as active', () => {
      const userId = 1;
      mock.onGet('/api/v1/users/1/groups').reply(201, {});

      const store = mockStore();

      const expectedAction = {
        type: types.SET_GROUP_MEMBERS,
        memberDetails: [{ id: 1, username: 'mazma' }]
      };

      store.dispatch(actions.setNewGroupActive({ userId })).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
    });
  });

  describe('#submittingNewGroupFailure', () => {
    it('should return an error when the request to submit a new group fails', () => {
      const expectedAction = {
        type: types.SUBMIT_NEW_GROUP_FAILURE,
        error: {}
      };
      expect(actions.submittingNewGroupFailure({})).toEqual(expectedAction);
    });
  });

  describe('#fetchUserGroupFailure', () => {
    it('should return an error when the request to fetch a user\'s groups fails', () => {
      const expectedAction = {
        type: types.FETCH_USER_GROUPS_FAILURE,
        error: {}
      };
      expect(actions.fetchUserGroupsFailure({})).toEqual(expectedAction);
    });
  });
});

