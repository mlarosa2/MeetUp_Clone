const MembershipApiUtil = {
  joinGroup(data, successCallback) {
    $.ajax({
      url    : "/api/memberships",
      method : "POST",
      data   : data,
      success(dat) {
        successCallback(dat);
      },
      error(dat) { return dat; }
    });
  },
  leaveGroup(data, successCallback) {
    $.ajax({
      url    : `api/memberships/${data.membership.id}`,
      method : "DELETE",
      success(dat) {
        successCallback(dat);
      },
      error(dat) { return dat; }
    });
  },
  fetchAllMemberships(groupId, successCallback) {
    $.ajax({
      url    : `api/memberships?group_id=${(groupId)}`,
      method : "GET",
      success(dat) {
        successCallback(dat);
      },
      error(err) { return err; }
    });
  }
};

module.exports = MembershipApiUtil;
