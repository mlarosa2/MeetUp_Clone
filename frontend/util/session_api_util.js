const SessionApiUtil = {
  signup(data, successCallback, errorCallback) {
    $.ajax({
      url         : "/api/users",
      method      : "POST",
      processData : false,
      contentType : false,
      dataType    : 'json',
      data        : data,
      success(dat) {
        successCallback(dat, "Login");
      },
      error(er){ errorCallback(er); }
    });
  },

  login(data, successCallback, errorCallback) {
    $.ajax({
      url    : "/api/session",
      method : "POST",
      data   : data,
      success(dat) {
        successCallback(dat, "Login");
      },
      error(er) {
        errorCallback(er);
      }
    });
  },

  logout(successCallback, errorCallback) {
    $.ajax({
      url    : "/api/session",
      method : "DELETE",
      success(dat) {
        successCallback(dat, "Logout");
      },
      error(er) {
        errorCallback(er);
      }
    });
  }
};

module.exports = SessionApiUtil;
