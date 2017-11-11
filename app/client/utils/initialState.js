
/** Reducer's initial states */
export default {
  auth: { isAuthenticated: false, user: {} },
  groupMembers: { isLoading: false, members: [] },
  groupMessages: { isLoading: false, messages: [] },
  userGroups: { isLoading: false, groups: [] }
};
