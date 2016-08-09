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
        successCallback(dat);
      },
      error(er){ errorCallback(er, "Login"); }
    });
  },

  login(data, successCallback, errorCallback) {
    $.ajax({
      url    : "/api/session",
      method : "POST",
      data   : data,
      success(dat) {
        successCallback(dat);
      },
      error(er) {
        errorCallback(er, "Login");
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
