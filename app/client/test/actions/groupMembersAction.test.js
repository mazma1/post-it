import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import * as actions from '../../../client/actions/groupMembers';
import * as types from '../../actions/types';

const middlewares = [thunk];
const mock = new MockAdapter(axios);
const mockStore = configureMockStore(middlewares);


describe('Group Members Action\'s', () => {
  describe('#getGroupMembers', () => {
    it('should create SET_GROUP_MEMBERS after successfully fetching members of a group', () => {
      mock.onGet('/api/v1/groups/1/members')
        .reply(201, {});

      const expectedAction = {
        type: types.SET_GROUP_MEMBERS,
        memberDetails: {}
      };
      const store = mockStore({});

      store.dispatch(actions.getGroupMembers({ groupId: 1 })).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
    });
  });

  describe('#submitNewUser', () => {
    it('should make a request to add a new user to a group', () => {
      mock.onPost('/api/v1/groups/1/user')
        .reply(201, {});

      const store = mockStore();

      store.dispatch(actions.submitNewUser({ groupId: 1, identifier: 'mazma' })).then(() => {
        store.dispatch(actions.getGroupMembers({}));
      });
    });
  });

  describe('#fetchingGroupMembers', () => {
    it('should set group members as empty when request has not been fulfilled', () => {
      const expectedAction = {
        type: types.FETCHING_GROUP_MEMBERS,
        members: []
      };
      expect(actions.fetchingGroupMembers()).toEqual(expectedAction);
    });
  });

  describe('#setGroupMembers', () => {
    it('should set group members when request is successful', () => {
      const expectedAction = {
        type: types.SET_GROUP_MEMBERS,
        membersDetails: {}
      };
      expect(actions.setGroupMembers({})).toEqual(expectedAction);
    });
  });
});

