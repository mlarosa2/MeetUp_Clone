const Store            = require('flux/utils').Store;
const Dispatcher       = require('../dispatcher/dispatcher');
const MembershipConstants = require('../constants/membership_constants');

let _memberships = {};

const MembershipStore = new Store(Dispatcher);

MembershipStore.all = function () {
  const memberships = [];
  for (let membership in _memberships) {
    if (_memberships.hasOwnProperty(membership)) {
      memberships.push(_memberships[membership]);
    }
  }

  return memberships;
};

MembershipStore.findMembershipId = function(memberId) {
  let members = this.all();
  for (let i = 0; i < members.length; i++) {
    if (memberId === members[i].user.id) {
      return members[i].membership_id;
    }
  }
};


MembershipStore.isMember = function (memberId) {
  let members = this.all();
  for (let i = 0; i < members.length; i++) {
    if (memberId === members[i].user.id) {
      return true;
    }
  }

  return false;
};

function _resetMemberships(memberships) {
  _memberships = {};
  memberships.forEach(membership => {
    _memberships[membership.membership_id] = membership;
  });

  MembershipStore.__emitChange();
}

function _addMembership(membership) {
  _memberships[membership.membership_id] = membership;

  MembershipStore.__emitChange();
}

function _deleteMembership(membership) {
  delete _memberships[membership.id];

  MembershipStore.__emitChange();
}


MembershipStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case MembershipConstants.RECEIVE_MEMBERSHIPS:
      _resetMemberships(payload.memberships);
      break;
    case MembershipConstants.JOIN_GROUP:
      _addMembership(payload.membership);
      break;
    case MembershipConstants.LEAVE_GROUP:
      _deleteMembership(payload.membership);
      break;
  }
};

module.exports = MembershipStore;
