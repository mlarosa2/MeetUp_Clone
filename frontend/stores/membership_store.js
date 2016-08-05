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

MembershipStore.isMember = function () {
  console.log("mmmm");
};

function _resetMemberships(memberships) {
  _memberships = {};
  for (let membership in memberships.members) {
    if (memberships.members.hasOwnProperty(membership)) {
      _memberships[membership] = memberships.members[membership];
    }
  }

  MembershipStore.__emitChange();
}

function _addMembership(membership) {
  _memberships[membership.id] = membership;

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
