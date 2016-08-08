const EventApiUtil = {
  fetchAllEvents(data, successCallback) {
    $.ajax({
      url    : "/api/events",
      method : "GET",
      success(dat) {
        successCallback(dat);
      },
      error(dat) { return dat; }
    });
  },

  fetchSingleEvent(id, successCallback) {
    $.ajax({
      url: `/api/events/${id}`,
      method: "GET",
      success(dat) {
        successCallback(dat);
      },
      error(dat) { return dat; }
    });
  },

  createEvent(data, successCallback) {
    $.ajax({
      url    : "/api/events/events",
      method : "POST",
      data   : { event : data },
      success(dat) {
        successCallback(dat);
      },
      error(dat) { return dat; }
    });
  },

  editEvent(data, successCallback) {
    $.ajax({
      url    : `/api/events/${data.id}`,
      method : "PATCH",
      data   : { event : data },
      success(dat) {
        successCallback(dat);
      },
      error(dat) { return dat; }
    });
  },

  deleteEvent(id, successCallback) {
    $.ajax({
      url: `/api/events/${id}`,
      method: DELETE,
      success(dat) {
        successCallback(dat);
      },
      error(dat) { return dat; }
    });
  }
};

module.exports = EventApiUtil;
