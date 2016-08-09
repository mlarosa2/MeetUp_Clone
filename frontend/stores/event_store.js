const Store            = require('flux/utils').Store;
const Dispatcher       = require('../dispatcher/dispatcher');
const EventConstants   = require('../constants/event_constants');

const EventStore = new Store(Dispatcher);

let _events = {};

EventStore.all = function () {
  let events = [];
  for (let prop in _events) {
    if (_events.hasOwnProperty(prop)) {
      events.push(_events[prop]);
    }
  }

  return events;
};

EventStore.find = function (id) {
  return _events[id];
};

function _resetEvents(events) {
  _events = {};

  for (let prop in events) {
    if (events.hasOwnProperty(prop)) {
      _events[prop] = events[prop];
    }
  }

  EventStore.__emitChange();
}

function _addEvent(event) {
  _events[event.event.id] = event;

  EventStore.__emitChange();
}

function _removeEvent(event) {
  delete _events[event.id];

  EventStore.__emitChange();
}

EventStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case EventConstants.RECEIVE_EVENTS:
      _resetEvents(payload.events);
      break;
    case EventConstants.RECEIVE_EVENT:
      _addEvent(payload.event);
      break;
    case EventConstants.CREATE_EVENT:
      _addEvent(payload.event);
      break;
    case EventConstants.DELETE_EVENT:
      _removeEvent(payload.event);
      break;
  }
};

module.exports = EventStore;
