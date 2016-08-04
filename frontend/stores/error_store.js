const Store            = require('flux/utils').Store;
const Dispatcher       = require('../dispatcher/dispatcher');
const ErrorConstants   = require('../constants/session_constants');

const ErrorStore = new Store(Dispatcher);

let _errors = [];
let _form   = "";

ErrorStore.errors = function (form) {
  if (_form === form) {
    return _errors;
  }
};

function _setErrors(form, errors) {
  _errors = [];
  _form   = "";

  for (let i = 0; i < errors.responseJSON.length; i++) {
    _errors.push(errors.responseJSON[i]);
  }
  _form = form;
  
  ErrorStore.__emitChange();
}

function _clearErrors() {
  _errors = [];
  _form   = "";

  ErrorStore.__emitChange();
}


ErrorStore.__onDispatch = function(payload) {
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
