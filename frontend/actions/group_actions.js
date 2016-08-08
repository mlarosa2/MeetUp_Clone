const GroupApiUtil   = require('../util/group_api_util');
const GroupConstants = require('../constants/group_constants');
const Dispatcher     = require('../dispatcher/dispatcher');
const ErrorActions   = require('./error_actions');

const GroupActions = {
  fetchAllGroups() {
    GroupApiUtil.fetchAllGroups(this.receiveGroups);
  },

  fetchSingleGroup(group, successCallback) {
    GroupApiUtil.fetchSingleGroup(group, this.receiveGroup);
  },

  editGroup(data, successCallback) {
    GroupApiUtil.editGroup(data, this.receiveGroup);
  },

  createGroup(data) {
    GroupApiUtil.createGroup(data, this.addNewGroup, ErrorActions.setErrors);
  },

  deleteGroup(id) {
    GroupApiUtil.deleteGroup(id, this.destroyGroup);
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
  },

  destroyGroup(group) {
    Dispatcher.dispatch({
      actionType: GroupConstants.DELETE_GROUP,
      group     : group
    });
  },

  addNewGroup(group) {
    Dispatcher.dispatch({
      actionType: GroupConstants.CREATE_GROUP,
      group     : group
    });
  }
};

module.exports = GroupActions;
