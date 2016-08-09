const RsvpApiUtil   = require('../util/rsvp_api_util');
const RsvpConstants = require('../constants/rsvp_constants');
const Dispatcher     = require('../dispatcher/dispatcher');
const ErrorActions   = require('./error_actions');

const RsvpActions = {
  fetchAllRsvps(eventId) {
    RsvpApiUtil.fetchAllRsvps(eventId, this.receiveRsvps);
  },
  createRsvp(data) {
    RsvpApiUtil.createRsvp(data, this.addNewRsvp, ErrorActions.setErrors);
  },
  receiveRsvps(rsvps) {
    Dispatcher.dispatch({
      actionType : RsvpConstants.RECEIVE_RSVPS,
      rsvps      : rsvps
    });
  },
  addNewRsvp(rsvp) {
    Dispatcher.dispatch({
      actionType : RsvpConstants.CREATE_RSVP,
      rsvp       : rsvp
    });
  }
};

module.exports = RsvpActions;
