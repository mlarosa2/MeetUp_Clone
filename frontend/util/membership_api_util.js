const MembershipApiUtil = {
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
};

module.exports = MembershipApiUtil;
