const Store          = require('flux/utils').Store;
const Dispatcher     = require('../dispatcher/dispatcher');
const RsvpConstants = require('../constants/rsvp_constants');

const RsvpStore = new Store(Dispatcher);

let _rsvps = {};

RsvpStore.all = function () {
  let rsvps = [];

  for (let prop in _rsvps) {
    if (_rsvps.hasOwnProperty(prop)) {
      rsvps.push(_rsvps[prop]);
    }
  }
  return rsvps;
};

RsvpStore.findByUser = function (id) {
  let rsvp = "";
  for (let prop in _rsvps) {
    if (_rsvps.hasOwnProperty(prop)) {
      if (_rsvps[prop].rsvp.user_id === id) {
        rsvp = _rsvps[prop];
      }
    }
  }

  return rsvp;
};

function _resetRsvps(rsvps) {
  _rsvps = {};

  for (let prop in rsvps) {
    if (rsvps.hasOwnProperty(prop)) {
      _rsvps[prop] = rsvps[prop];
    }
  }

  RsvpStore.__emitChange();
}

function _addRsvp (rsvp) {
  _rsvps[rsvp.rsvp.id] = rsvp;

  RsvpStore.__emitChange();
}

function _deleteRsvp(rsvp) {
  delete _rsvps[rsvp.rsvp.id];

  RsvpStore.__emitChange();
}

RsvpStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case RsvpConstants.RECEIVE_RSVPS:
      _resetRsvps(payload.rsvps);
      break;
    case RsvpConstants.CREATE_RSVP:
      _addRsvp(payload.rsvp);
      break;
    case RsvpConstants.DELETE_RSVP:
      _deleteRsvp(payload.rsvp);
      break;
  }
};

module.exports = RsvpStore;
