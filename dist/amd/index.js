define(['exports', './autocompletecontroller', './autocompleteconfiguration'], function (exports, _autocompletecontroller, _autocompleteconfiguration) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.AutoCompleteController = undefined;
  exports.configure = configure;
  exports.AutoCompleteController = _autocompletecontroller.AutoCompleteController;
  function configure(aurelia, callback) {

    var config = new _autocompleteconfiguration.AutoCompleteConfiguration();

    if (typeof callback === 'function') {
      callback(config);
    }

    aurelia.globalResources('./autocomplete');
  }
});