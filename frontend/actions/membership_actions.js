const MembershipApiUtil   = require('../util/membership_api_util');
const MembershipConstants = require('../constants/membership_constants');
const Dispatcher     = require('../dispatcher/dispatcher');
const ErrorActions   = require('./error_actions');

const MembershipActions = {
  joinGroup(data, successCallback) {
    GroupApiUtil.joinGroup(data, this.receiveGroup);
  },

  leaveGroup(data, successCallback) {
    GroupApiUtil.leaveGroup(data, this.receiveGroup);
  }
};

module.exports = MembershipActions;
