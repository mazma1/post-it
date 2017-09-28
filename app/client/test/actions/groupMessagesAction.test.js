import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import * as actions from '../../../client/actions/groupMessages';
import * as types from '../../actions/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);


describe('Group Messages Action\'s', () => {
  describe('#getGroupMessages', () => {
    afterEach(() => {
      nock.cleanAll();
    });

    it('should create SET_GROUP_MEMBERS after successfully fetching messages of a group', () => {
      nock('http://localhost')
        .get('/api/v1/groups/1/messages')
        .reply(201, {});

      const expectedAction = {
        type: types.SET_GROUP_MEMBERS,
        messages: {}
      };
      const store = mockStore({});

      store.dispatch(actions.getGroupMessages({ groupId: 1 })).then(() => {
        store.dispatch(actions.setGroupMessages({ messages: {} }));
        expect(store.getActions()).toEqual(expectedAction);
      });
    });
  });

  describe('#postNewMessage', () => {
    afterEach(() => {
      nock.cleanAll();
    });

    it('should make a request to post a new message to a group', () => {
      nock('http://localhost')
        .post('/api/v1/groups/1/user')
        .reply(201, {});
      const messageDetails = {
        priority: 'normal',
        groupId: 1,
        message: 'Hello',
        readBy: 'mazma'
      };
      const store = mockStore();

      store.dispatch(actions.postNewMessage(messageDetails));
    });
  });

  describe('#getGroupMessagesCount', () => {
    afterEach(() => {
      nock.cleanAll();
    });

    it('should make a request to get the count of messages in a group', () => {
      nock('http://localhost')
        .get('/api/v1/groups/1/messages')
        .reply(201, {});
      const store = mockStore();

      store.dispatch(actions.getGroupMessagesCount(1));
    });
  });

  describe('#updateReadStatus', () => {
    afterEach(() => {
      nock.cleanAll();
    });

    it('should make a request to update a user that has read a message', () => {
      nock('http://localhost')
        .patch('/api/v1/messages/1/read');
      const store = mockStore();

      store.dispatch(actions.updateReadStatus({ groupId: 1, messageId: 1 })).then(() => {
        store.dispatch(actions.getGroupMessages(1));
      });
    });
  });

  describe('#archiveMessage', () => {
    afterEach(() => {
      nock.cleanAll();
    });

    it('should make a request to archive a message', () => {
      nock('http://localhost')
        .patch('/api/v1/messages/1/archive');
      const store = mockStore();

      store.dispatch(actions.updateReadStatus({ groupId: 1, messageId: 1 })).then(() => {
        store.dispatch(actions.archiveMessage(1));
      });
    });
  });

  describe('#fetchingGroupMessages', () => {
    it('should set group messages as empty when request has not been fulfilled', () => {
      const expectedAction = {
        type: types.FETCHING_GROUP_MESSAGES,
        messages: []
      };
      expect(actions.fetchingGroupMessages()).toEqual(expectedAction);
    });
  });

  describe('#setGroupMessages', () => {
    it('should set group messages when request is successful', () => {
      const expectedAction = {
        type: types.SET_GROUP_MESSAGES,
        messages: {}
      };
      expect(actions.setGroupMessages({})).toEqual(expectedAction);
    });
  });
});

