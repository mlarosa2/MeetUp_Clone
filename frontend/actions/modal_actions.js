const Dispatcher       = require('../dispatcher/dispatcher');
const ModalConstants   = require('../constants/modal_constants');
const ErrorActions     = require('../actions/error_actions');

const ModalActions = {
  closeModal() {
    Dispatcher.dispatch({
      actionType: ModalConstants.CLOSE
    });
  }
};

module.exports = ModalActions;
