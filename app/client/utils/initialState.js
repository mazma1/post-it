
/** Reducer's initial states */
const InitialState = {
  auth: { isAuthenticated: false, user: {} },
  groupMembers: { isLoading: false, members: [] },
  groupMessages: { isLoading: false, messages: [] },
  userGroups: { isLoading: false, groups: [] }
};

export default InitialState;

