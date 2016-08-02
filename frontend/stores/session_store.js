const Store            = require('flux/utils').Store;
const Dispatcher       = require('../dispatcher/dispatcher');
const SessionConstants = require('../constants/session_constants');

const SessionStore = new Store(Dispatcher);

let _currentUser = {};

SessionStore.currentUser = function () {
  return _currentUser;
};
SessionStore.isUserLoggedIn = function () {
  if (!!Object.keys(_currentUser).length) {
    return true;
  } else {
    return false;
  }
};
function _login(user) {
  for (let prop in user) {
    if(user.hasOwnProperty(prop)) {
      _currentUser[prop] = user[prop];
    }
  }

  SessionStore.__emitChange();
}
function _logout() {
  _currentUser = {};
}


SessionStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case SessionConstants.LOGIN:
      _login(payload.user);
      break;
    case SessionConstants.LOGOUT:
      _logout();
      break;
  }

  SessionStore.__emitChange();
};

module.exports = SessionStore;
