const Store            = require('flux/utils').Store;
const Dispatcher       = require('../dispatcher/dispatcher');
const ModalConstants   = require('../constants/event_constants');

const ModalStore = new Store(Dispatcher);

function _closeModal() {
  ModalStore.__emitChange();
}

ModalStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case ModalConstants.CLOSE:
      _closeModal();
      break;
    default:

  }
};

module.exports = ModalStore;
