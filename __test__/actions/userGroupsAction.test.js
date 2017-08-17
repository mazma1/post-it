import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import * as actions from '../../app/client/actions/userGroupsAction';
import * as types from '../../app/client/actions/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);


describe('User groups action creators tests', () => {
  describe('Sync action creators', () => {
    it('should create an action to set user groups as empty when request has not been fulfilled', () => {
      const group = [];
      const expectedAction = {
        type: types.FETCHING_USER_GROUPS,
        group
      };
      expect(actions.fetchingUserGroups()).toEqual(expectedAction);
    });

    it('should create an action to set returned user groups', () => {
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

  describe('Async action creators', () => {
    afterEach(() => {
      nock.cleanAll();
    });

    it('creates SET_USER_GROUPS when request to get user\'s groups is successful', () => {
      nock('http://localhost')
        .post('/api/user/1/groups')
        .reply(201, { data: { group: [{ id: 1, name: 'Cohort 29' }] } });

      const expectedAction = {
        type: types.SET_CURRENT_USER,
        group: [{
          id: 1,
          name: 'Cohort 29'
        }]
      };
      const store = mockStore();

      store.dispatch(actions.getUserGroups(1)).then(() => {
        // return of async actions
        expect(store.getActions()).toEqual(expectedAction);
      });
    });

    // it('makes request to submit new group', () => {
    //   const userId = 1;
    //   nock('http://localhost')
    //     .post(`/api/user/${userId}/groups`)
    //     .reply(201, { data: { group: [{ id: 1, name: 'Cohort 29' }] } });
    //   const newGroup = {
    //     id: 1,
    //     name: 'Cohort 29'
    //   };
    //   const expectedAction = {
    //     type: types.SET_USER_GROUPS,
    //     newGroup
    //   };
    //   const store = mockStore();

    //   store.dispatch(actions.getUserGroups(userId)).then((newGroup) => {
    //     // return of async actions
    //     expect(store.getActions()).toEqual(expectedAction);
    //   });
    // });
  });
});

