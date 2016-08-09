const EventApiUtil   = require('../util/event_api_util');
const EventConstants = require('../constants/event_constants');
const Dispatcher     = require('../dispatcher/dispatcher');
const ErrorActions   = require('./error_actions');

const EventActions = {
  fetchAllEvents(groupId) {
    EventApiUtil.fetchAllEvents(groupId, this.receiveEvents);
  },

  fetchSingleEvent(data) {
    EventApiUtil.fetchSingleEvent(data, this.receiveEvent);
  },

  createEvent(data) {
    EventApiUtil.createEvent(data, this.addNewEvent, ErrorActions.setErrors);
  },

  editEvent(data) {
    EventApiUtil.editEvent(data, this.receiveEvent, ErrorActions.setErrors);
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

  destroyEvent(event) {
    Dispatcher.dispatch({
      actionType : EventConstants.DELETE_EVENT,
      event      : event
    });
  }
};

module.exports = EventActions;
