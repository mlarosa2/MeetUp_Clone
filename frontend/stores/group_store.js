const Store            = require('flux/utils').Store;
const Dispatcher       = require('../dispatcher/dispatcher');
const GroupConstants   = require('../constants/session_constants');

const GroupStore = new Store(Dispatcher);

let _groups = {};

GroupStore.all = function () {
  return _groups;
};

GroupStore.find = function (id) {
  return _groups.id;
};

function _resetGroups(groups) {
  _groups = {};
  for (let prop in groups) {
    if (groups.hasOwnProperty(prop)) {
      _groups[prop] = groups[prop];
    }
  }
}

function _showGroup(group) {
  GroupStore.find(group.id);
}

function _addGroup(group) {
  let keyNumber = Object.keys(_groups).length;
  _groups[keyNumber] = group;
}
function _removeGroup(group) {
  delete _groups[group.id];
}

GroupStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case GroupConstants.FETCH_GROUPS:
      _resetGroups(payload.groups);
      break;
    case GroupConstants.FETCH_GROUP:
      _showGroup(payload.group);
      break;
    case GroupConstants.CREATE_GROUP:
      _addGroup(payload.group);
      break;
    case GroupConstants.DELETE_GROUP:
      _removeGroup(payload.group);
      break;
  }
};

module.exports = GroupStore;
