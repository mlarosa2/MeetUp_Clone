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
  debugger
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
  let calculatedDistanceInMeters = (function () {
    const radianLat = (lat2 - lat1) * (Math.PI / 180);
    const radianLng = (lng2 - lng1) * (Math.PI / 180);
    const alpha     =
      Math.sin(radianLat / 2) * Math.sin(radianLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(radianLng / 2) * Math.sin(radianLng / 2);
    const beta = 2 * Math.atan2(Math.sqrt(alpha), Math.sqrt(1 - alpha));
    return EARTH_RADIUS * beta;
  })();
  let distanceQueryInMeters       = distance * 1609.344;
  if (calculatedDistanceInMeters <= distanceQueryInMeters) {
    groups[prop] = _groups[prop];
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
