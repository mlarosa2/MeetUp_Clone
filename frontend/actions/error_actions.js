const Dispatcher     = require('../dispatcher/dispatcher');
const ErrorConstants = require('../constants/session_constants');

const ErrorActions = {
  setErrors(err, form) {
    Dispatcher.dispatch({
      actionType : ErrorConstants.SET_ERRORS,
      errors     : err,
      form       : form
    });
  },
  clearErrors(err) {
    Dispatcher.dispatch({
      actionType : ErrorConstants.CLEAR_ERRORS,
      errors     : err
    });
  }
};

module.exports = ErrorActions;
