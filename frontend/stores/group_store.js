const Store            = require('flux/utils').Store;
const Dispatcher       = require('../dispatcher/dispatcher');
const GroupConstants   = require('../constants/group_constants');

const GroupStore = new Store(Dispatcher);

let _groups = {};

GroupStore.all = function () {
  let groups = [];

  for (let prop in _groups) {
    if (_groups.hasOwnProperty(prop)) {
      groups.push(_groups[prop]);
    }
  }

  return groups;
};

GroupStore.find = function (id) {
  return _groups[id];
};

function _resetGroups(groups) {
  _groups = {};

  for (let prop in groups) {
    if (groups.hasOwnProperty(prop)) {
      _groups[prop] = groups[prop];
    }
  }

  GroupStore.__emitChange();
}

GroupStore.filterByLocation = function (address, distance) {
  if (distance === "any distance") {
    return;
  }

  for (let prop in _groups) {
    if (_groups.hasOwnProperty(prop)) {
      let lat1, lng1, lat2, lng2;
      $.ajax({
        url    : `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&region=us&key=AIzaSyC7mHejYETsrCCXPm_ncRFkfAVxuAOS7yM`,
        method : "GET",
        success(dat) {}
      });
    }
  }
};

function _addGroup(group) {
  _groups[group.group.id] = group;

  GroupStore.__emitChange();
}
function _removeGroup(group) {
  delete _groups[group.id];

  GroupStore.__emitChange();
}

GroupStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case GroupConstants.FETCH_GROUPS:
      _resetGroups(payload.groups);
      break;
    case GroupConstants.FETCH_GROUP:
      _addGroup(payload.group);
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
