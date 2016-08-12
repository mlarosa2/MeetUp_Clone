const GroupApiUtil = {
  fetchAllGroups(successCallback) {
    $.ajax({
      url    : "/api/groups",
      method : "GET",
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
      url    : `/api/groups/${id}`,
      method : "GET",
      success(dat) {
        successCallback(dat);
      },
      error(dat) {
        return dat;
      }
    });
  },
  editGroup(data, successCallback) {
    debugger
    $.ajax({
      url         : `/api/groups/${data.id}`,
      method      : "PATCH",
      processData : false,
      contentType : false,
      dataType    : 'json',
      data        : data ,
      success(dat) {
        successCallback(dat);
      },
      error(dat) {
        return dat;
      }
    });
  },
  deleteGroup(id, successCallback) {
    $.ajax({
      url    : `/api/groups/${id}`,
      method : "DELETE",
      success(dat) {
        successCallback(dat);
      },
      error(dat) {
        return dat;
      }
    });
  },
  createGroup(data, successCallback, errorCallback) {
    $.ajax({
      url         : "/api/groups",
      method      : "POST",
      processData : false,
      contentType : false,
      dataType    : 'json',
      data        : data ,
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
