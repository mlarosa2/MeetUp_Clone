const EventApiUtil   = require('../util/event_api_util');
const EventConstants = require('../constants/event_constants');
const Dispatcher     = require('../dispatcher/dispatcher');
const ErrorActions   = require('./error_actions');

const EventActions = {
  fetchAllEvents() {
    EventApiUtil.fetchAllEvents(this.receiveEvents);
  },

  fetchSingleEvent(data) {
    EventApiUtil.fetchSingleEvent(data, this.receveEvent);
  },

  createEvent(data) {
    EventApiUtil.createEvent(data, this.addNewEvent);
  },

  editEvent(data) {
    EventApiUtil.editEvent(data, this.updateEvent);
  },

  deleteEvent(data) {
    EventApiUtil.deleteEvent(data, this.destroyEvent);
  },

  receiveEvents(events) {
    Dispatcher.dispatch({
      actionType : EventConstants.RECEIVE_EVENTS,
      events     : events
    });
  },

  receiveEvent(event) {
    Dispatcher.dispatch({
      actionType : EventConstants.RECEIVE_EVENT,
      event      : event
    });
  },

  addNewEvent(event) {
    Dispatcher.dispatch({
      actionType : EventConstants.CREATE_EVENT,
      event      : event
    });
  },

  updateEvent(event) {
    Dispatcher.dispatch({
      actionType : EventConstants.EDIT_EVENT,
      event      : event
    });
  },

  destroyEvent(event) {
    Dispatcher.dispatch({
      actionType : EventConstants.DELETE_EVENT,
      event      : event
    });
  }
};

module.exports = EventActions;
