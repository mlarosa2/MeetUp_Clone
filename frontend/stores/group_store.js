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

function _filterByLocation(lat1, lng1, distance, title) {
  let groups = {};
  for (let prop in _groups) {
    if (_groups.hasOwnProperty(prop)) {
      let distanceInKilometers      = calculateDistanceInKilometers(lat1, _groups[prop].group.lat, lng1, _groups[prop].group.lng);
      let distanceQueryInKilometers = distance * 1.60934;
      if (distanceInKilometers <= distanceQueryInKilometers && _groups[prop].group.title.toLowerCase().indexOf(title.toLowerCase()) !== -1) {
        groups[prop] = _groups[prop];
      }
    }
  }
  _groups = {};
  for (let prop in groups) {
    if (groups.hasOwnProperty(prop)) {
      _groups[prop] = groups[prop];
    }
  }
  GroupStore.__emitChange();
}


function calculateDistanceInKilometers(lat1, lat2, lng1, lng2) {
  const EARTH_RADIUS = 6371;
  const radianLat    = (lat2 - lat1) * (Math.PI / 180);
  const radianLng    = (lng2 - lng1) * (Math.PI / 180);
  const alpha        =
    Math.sin(radianLat / 2) * Math.sin(radianLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(radianLng / 2) * Math.sin(radianLng / 2);
  const beta = 2 * Math.atan2(Math.sqrt(alpha), Math.sqrt(1 - alpha));
  return EARTH_RADIUS * beta;
}

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
    case GroupConstants.FILTER_GROUPS:
      _filterByLocation(payload.lat, payload.lng, payload.distance, payload.title);
      break;
  }
};

module.exports = GroupStore;
