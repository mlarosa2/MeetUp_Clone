const SessionApiUtil   = require('../util/session_api_util');
const Dispatcher       = require('../dispatcher/dispatcher');
const SessionConstants = require('../constants/session_constants');

const SessionActions = {
  signup(user, callback) {
    SessionApiUtil.signup(user, this.receiveCurrentUser);
  },
  login(user, callback) {
    SessionApiUtil.login(user, this.receiveCurrentUser);
  },
  logout(user, callback) {
    SessionApiUtil.logout(this.receiveCurrentUser);
  },
  receiveCurrentUser(user) {
    let loginOrLogout = Object.keys(user) !== 0 ? SessionConstants.LOGIN : SessionConstants.LOGOUT;
    Dispatcher.dispatch({
      actionType: loginOrLogout,
      user: user
    });
  }
};

module.exports = SessionActions;
