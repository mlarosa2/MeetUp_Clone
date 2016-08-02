const SessionApiUtil   = require('../util/session_api_util');
const Dispatcher       = require('../dispatcher/dispatcher');
const SessionConstants = require('../constants/session_constants');
const ErrorActions     = require('../actions/error_actions');

const SessionActions = {
  signup(user, callback, err) {
    SessionApiUtil.signup(user, this.receiveCurrentUser, ErrorActions.setErrors);
  },
  login(user, callback, err) {
    SessionApiUtil.login(user, this.receiveCurrentUser, ErrorActions.setErrors);
  },
  logout(user, callback, err) {
    SessionApiUtil.logout(this.receiveCurrentUser, ErrorActions.setErrors);
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
