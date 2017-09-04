import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import * as actions from '../../../client/actions/userGroups';
import * as types from '../../actions/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);


describe('User Groups Actions', () => {
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
      const group = [
        {
          id: 1,
          name: 'Cohort 29'
        }
      ];
      const expectedAction = {
        type: types.SET_USER_GROUPS,
        group
      };
      expect(actions.setUserGroups(group)).toEqual(expectedAction);
    });
  });

  describe('#getUserGroups', () => {
    afterEach(() => {
      nock.cleanAll();
    });

    it('should create SET_USER_GROUPS to update store when request to get user\'s groups is successful', () => {
      nock('http://localhost')
        .post('/api/user/1/groups')
        .reply(201, { data: { group: [{ id: 1, name: 'Cohort 29' }] } });

      const expectedAction = [
        { type: types.FETCHING_USER_GROUPS, group: [] },
        { type: types.SET_CURRENT_USER, group: [{ id: 1, name: 'Cohort 29' }] }
      ];
      const store = mockStore({ group: [] });

      store.dispatch(actions.getUserGroups(1)).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
    });

    it('should update store with error message when request to get user\'s groups fails', () => {
      nock('http://localhost')
        .post('/api/user/1/groups')
        .reply(201, { data: { group: [{ id: 1, name: 'Cohort 29' }] } });

      const expectedAction = [
        { type: types.FETCHING_USER_GROUPS, group: [] },
        { type: types.FETCH_USER_GROUPS_FAILURE, error: {} }
      ];
      const store = mockStore();

      store.dispatch(actions.getUserGroups(1)).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
    });
  });

  // describe('#submitNewGroup', () => {
  //   it('should make request to save new group to the database', () => {
  //     const userId = 1;
  //     nock('http://localhost')
  //       .post('/api/group')
  //       .reply(201, {});
  //     const newGroup = {
  //       id: 1,
  //       name: 'Cohort 29'
  //     };
  //     const expectedAction = {
  //       type: types.SET_USER_GROUPS,
  //       newGroup
  //     };
  //     const store = mockStore();

  //     store.dispatch(actions.getUserGroups(userId)).then((newGroup) => {
  //       // return of async actions
  //       expect(store.getActions()).toEqual(expectedAction);
  //     });
  //   });
  // });
});

