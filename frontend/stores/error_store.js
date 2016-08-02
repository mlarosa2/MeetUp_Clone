const Store            = require('flux/utils').Store;
const Dispatcher       = require('../dispatcher/dispatcher');
const ErrorConstants   = require('../constants/session_constants');

const ErrorStore = new Store(Dispatcher);

let _errors = [];
let _form   = "";

ErrorStore.errors = function (form) {
  if (form === _form) {
    return _errors;
  }
};

function _setErrors(form, errors) {
  _form   = form;
  _errors = errors;

  ErrorStore.__emitChange();
}

function _clearErrors() {
  _form   = "";
  _errors = [];

  ErrorStore.__emitChange();
}

ErrorStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case ErrorConstants.SET_ERRORS:
      _setErrors(payload.form, payload.errors);
      break;
    case ErrorConstants.CLEAR_ERRORS:
      _clearErrors();
      break;
  }
};

module.exports = ErrorStore;
