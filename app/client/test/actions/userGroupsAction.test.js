import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import * as actions from '../../../client/actions/userGroups';
import * as types from '../../actions/types';
import setSelectedGroup from '../../../client/actions/setSelectedGroup';
import { getGroupMessages } from '../../../client/actions/groupMessages';
import { getGroupMembers } from '../../../client/actions/groupMembers';

const middlewares = [thunk];
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
    afterEach(() => {
      nock.cleanAll();
    });

    it('should create SET_USER_GROUPS to update store when request to get user\'s groups is successful', () => {
      nock('http://localhost')
        .post('/api/v1/users/1/groups')
        .reply(201, { data: { groups: [{ id: 1, name: 'Cohort 29' }] } });

      const expectedAction = {
        type: types.SET_CURRENT_USER,
        groups: [{ id: 1, name: 'Cohort 29' }]
      };
      const store = mockStore({ group: [] });

      store.dispatch(actions.getUserGroups(1)).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
    });
  });

  describe('#submitNewGroup', () => {
    it('should make request to save new group to the database', () => {
      const userId = 1;
      const groupName = 'Cohort 29';
      nock('http://localhost').post('/api/v1/groups').reply(201, {});
      const store = mockStore();

      store.dispatch(actions.submitNewGroup({ groupName, userId })).then(() => {
        store.dispatch(actions.setNewGroupActive({ userId }));
      });
    });
  });

  describe('#setNewGroupActive', () => {
    it('should set the most recent group as active', () => {
      const userId = 1;
      nock('http://localhost').get('/api/v1/users/1/groups').reply(201, {});
      const store = mockStore();

      store.dispatch(actions.setNewGroupActive({ userId })).then(() => {
        store.dispatch(actions.setUserGroups({ id: 1, name: 'Cohort 29' }));
        store.dispatch(setSelectedGroup({ id: 1, name: 'Cohort 29' }));
        store.dispatch(getGroupMessages(1));
        store.dispatch(getGroupMembers(1));
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
});

