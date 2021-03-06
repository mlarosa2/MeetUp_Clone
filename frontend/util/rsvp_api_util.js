const RsvpApiUtil = {
  fetchAllRsvps(eventId, successCallback) {
    $.ajax({
      url    : `/api/rsvps?eventId=${eventId}`,
      method : "GET",
      success(dat) {
        successCallback(dat);
      },
      error(err) { return err; }
    });
  },

  createRsvp(data, successCallback, errorCallback) {
    $.ajax({
      url    : "/api/rsvps",
      method : "POST",
      data   : { rsvp : data },
      success(dat) {
        successCallback(dat);
      },
      error(err) { errorCallback(err); }
    });
  },

  destroyRsvp(id, successCallback) {
    $.ajax({
      url    : `/api/rsvps/${id}`,
      method : "DELETE",
      success(dat) {
        successCallback(dat);
      },
      error(err) { return err; }
    });
  }
};

module.exports = RsvpApiUtil;
