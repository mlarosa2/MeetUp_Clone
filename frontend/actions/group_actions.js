const GroupApiUtil   = require('../util/group_api_util');
const GroupConstants = require('../constants/group_constants');
const Dispatcher     = require('../dispatcher/dispatcher');

const GroupActions = {
  fetchAllGroups(successCallback) {
    GroupApiUtil.fetchAllGroups(this.receiveGroups);
  },

  fetchSingleGroup(group, successCallback) {
    GroupApiUtil.fetchSingleGroup(group, this.receiveGroup);
  },

  editGroup(data, successCallback) {
    GroupApiUtil.editGroup(data, this.receiveGroup);
  },

  joinGroup(data, successCallback) {
    GroupApiUtil.joinGroup(data, this.receiveGroup);
  },

  leaveGroup(data, successCallback) {
    GroupApiUtil.leaveGroup(data, this.receiveGroup);
  },

  createGroup(data, successCallback) {
    GroupApiUtil.createGroup(data, this.receiveGroup);
  },

  deleteGroup(id, successCallback) {
    GroupApiUtil.deleteGroup(id, this.receiveGroup);
  },

  receiveGroups(groups) {
    console.log(groups);
    // Dispatcher.dispatch({
    //   actionType: GroupConstants.FETCH_GROUPS,
    //   groups    : groups
    // });
  },

  receiveGroup(group) {
    console.log(group);
    // Dispatcher.dispatch({
    //   actionType: GroupConstants.FETCH_GROUP,
    //   group     : group
    // });
  }
};

module.exports = GroupActions;
