const GroupApiUtil = {
  fetchAllGroups(successCallback) {
    $.ajax({
      url: "api/groups",
      method: "GET",
      success(dat) {
        successCallback(dat);
      },
      error(dat) {
        return dat;
      }
    });
  },
  fetchSingleGroup(id, successCallback) {
    $.ajax({
      url: `api/groups/${id}`,
      method: "GET",
      success(dat) {
        successCallback(dat);
      },
      error(dat) {
        return dat;
      }
    });
  },
  editGroup(data, successCallback) {
    $.ajax({
      url: `api/groups/${data.group.id}`,
      method: "PATCH",
      data: data,
      success(dat) {
        successCallback(dat);
      },
      error(dat) {
        return dat;
      }
    });
  },
  deleteGroup(data, successCallback) {
    $.ajax({
      url: `api/groups/${data.group.id}`,
      method: "DELETE",
      success(dat) {
        successCallback(dat);
      },
      error(dat) {
        return dat;
      }
    });
  },
  joinGroup(data, successCallback) {
    $.ajax({
      url: "/api/memberships",
      method: "POST",
      data: data,
      success(dat) {
        successCallback(dat);
      },
      error(dat) {
        return dat;
      }
    });
  },
  leaveGroup(data, successCallback) {
    $.ajax({
      url: `api/memberships/${data.membership.id}`,
      method: "DELETE",
      success(dat) {
        successCallback(dat);
      },
      error(dat) {
        return dat;
      }
    });
  },
  createGroup(data, successCallback) {
    $.ajax({
      url: "api/groups",
      method: "POST",
      data: data,
      success(dat) {
        successCallback(dat);
      },
      error(dat) {
        return dat;
      }
    });
  }
};

module.exports = GroupApiUtil;
