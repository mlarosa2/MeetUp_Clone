const Store            = require('flux/utils').Store;
const Dispatcher       = require('../dispatcher/dispatcher');
const SessionConstants = require('../constants/session_constants');

const ErrorStore = new Store(Dispatcher);

let _errors = [];
let _form   = "";

ErrorStore.errors = function (form) {
  
};


module.exports = ErrorStore;
