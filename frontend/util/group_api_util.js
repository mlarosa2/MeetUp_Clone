const GroupApiUtil = {
  fetchAllGroups(data, successCallback, errorCallback) {
    $.ajax({
      url: "api/groups",
      method: "GET",
      success(dat) {
        successCallback(dat);
      },
      error(dat) {
        errorCallback(dat);
      }
    });
  },
  fetchSingleGroup(data, successCallback, errorCallback) {
    $.ajax({
      url: `api/groups/${data[id]}`,
      method: "GET",
      success(dat) {
        successCallback(dat);
      },
      error(dat) {
        errorCallback(dat);
      }
    });
  },
  editGroup(data, successCallback, errorCallback) {
    $.ajax({
      url: `api/groups/${data[id]}`,
      method: "PATCH",
      data: data,
      success(dat) {
        successCallback(dat);
      },
      error(dat) {
        errorCallback(dat);
      }
    });
  },
  joinGroup(data, successCallback, errorCallback) {
    $.ajax({
      url: "api/memberships",
      method: "POST",
      data: data,
      success(dat) {
        successCallback(dat);
      },
      error(dat) {
        errorCallback(dat);
      }
    });
  },
  leaveGroup(data, successCallback, errorCallback) {
    $.ajax({
      url: `api/memberships/${data[id]}`,
      method: "DELETE",
      success(dat) {
        successCallback(dat);
      },
      error(dat) {
        errorCallback(dat);
      }
    });
  },
  createGroup(data, successCallback, errorCallback) {
    $.ajax({
      url: "api/groups",
      method: "POST",
      data: data,
      success(dat) {
        successCallback(dat);
      },
      error(dat) {
        errorCallback(dat);
      }
    });
  }
};

module.exports = GroupApiUtil;
