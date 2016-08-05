const MembershipApiUtil   = require('../util/membership_api_util');
const MembershipConstants = require('../constants/membership_constants');
const Dispatcher     = require('../dispatcher/dispatcher');
const ErrorActions   = require('./error_actions');

const MembershipActions = {
  joinGroup(data, successCallback) {
    MembershipApiUtil.joinGroup(data, this.receiveMembership);
  },

  leaveGroup(data, successCallback) {
    MembershipApiUtil.leaveGroup(data, this.abandonGroup);
  },

  fetchAllMemberships(data, successCallback) {
    MembershipApiUtil.fetchAllMemberships(data, this.receiveMemberships);
  },

  receiveMemberships(memberships) {
    Dispatcher.dispatch({
      actionType : MembershipConstants.RECEIVE_MEMBERSHIPS,
      memberships: memberships
    });
  },

  receiveMembership(membership) {
    Dispatcher.dispatch({
      actionType: MembershipConstants.JOIN_GROUP,
      membership: membership
    });
  },
  abandonGroup(membership) {
    Dispatcher.dispatch({
      actionType: MembershipConstants.LEAVE_GROUP,
      membership: membership
    });
  }
};

module.exports = MembershipActions;
