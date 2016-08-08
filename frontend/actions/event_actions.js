const EventApiUtil   = require('../util/event_api_util');
const EventConstants = require('../constants/event_constants');
const Dispatcher     = require('../dispatcher/dispatcher');
const ErrorActions   = require('./error_actions');

const EventActions = {
  fetchAllEvents() {
    EventApiUtil.fetchAllEvents();
  },

  fetchSingleEvent() {
    EventApiUtil.fetchSingleEvent();
  },

  createEvent() {
    EventApiUtil.createEvent();
  },

  editEvent() {
    EventApiUtil.editEvent();
  },

  deleteEvent() {
    EventApiUtil.deleteEvent();
  },

  receiveGroups() {},

  receiveGroup() {},

  addNewEvent() {},

  updateEvent() {},

  destroyGroup() {}
};

module.exports = EventActions;
