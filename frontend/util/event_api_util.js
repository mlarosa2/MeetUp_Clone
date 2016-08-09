const EventApiUtil = {
  fetchAllEvents(groupId, successCallback) {
    $.ajax({
      url    : `/api/events?group_id=${groupId}`,
      method : "GET",
      success(dat) {
        successCallback(dat);
      },
      error(dat) {
        return dat;
      }
    });
  },

  fetchSingleEvent(id, successCallback) {
    $.ajax({
      url    : `/api/events/${id}`,
      method : "GET",
      success(dat) {
        successCallback(dat);
      },
      error(dat) { return dat; }
    });
  },

  createEvent(data, successCallback, errorCallback) {
    $.ajax({
      url    : "/api/events",
      method : "POST",
      data   : { event : data },
      success(dat) {
        successCallback(dat);
      },
      error(dat) {
        errorCallback(dat);
      }
    });
  },

  editEvent(data, successCallback, errorCallback) {
    $.ajax({
      url    : `/api/events/${data.id}`,
      method : "PATCH",
      data   : { event : data },
      success(dat) {
        successCallback(dat);
      },
      error(dat) { errorCallback(dat); }
    });
  },

  deleteEvent(id, successCallback) {
    $.ajax({
      url    : `/api/events/${id}`,
      method : "DELETE",
      success(dat) {
        successCallback(dat);
      },
      error(dat) { return dat; }
    });
  }
};

module.exports = EventApiUtil;
