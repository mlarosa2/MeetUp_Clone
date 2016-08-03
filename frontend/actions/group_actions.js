const GroupApiUtil   = require('../util/group_api_util');
const GroupConstants = require('../constants/group_constants');
const Dispatcher     = require('../dispatcher/dispatcher');

const GroupActions = {
  fetchAllGroups(groups, successCallback, errorCallback) {
    GroupApiUtil.fetchAllGroups(groups, this.receiveGroups);
  },

  fetchSingleGroup(group, successCallback, errorCallback) {
    GroupApiUtil.fetchSingleGroup(group, this.receiveGroup);
  },

  editGroup(data, successCallback, errorCallback) {
    GroupApiUtil.editGroup(data, this.receiveGroup);
  },

  joinGroup(data, successCallback, errorCallback) {
    GroupApiUtil.joinGroup(data, this.receiveGroup);
  },

  leaveGroup(data, successCallback, errorCallback) {
    GroupApiUtil.leaveGroup(data, this.receiveGroup);
  },

  createGroup(data, successCallback, errorCallback) {
    GroupApiUtil.createGroup(data, this.receiveGroup);
  },

  receiveGroups(groups) {
    Dispatcher.dispatch({
      actionType: GroupConstants.FETCH_GROUPS,
      groups    : groups
    });
  },

  receiveGroup(group) {
    Dispatcher.dispatch({
      actionType: GroupConstants.FETCH_GROUP,
      group     : group
    });
  }
};

moduel.exports = GroupActions;
