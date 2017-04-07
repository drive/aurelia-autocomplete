define(['exports', './autocompletecontroller'], function (exports, _autocompletecontroller) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.AutoCompleteController = undefined;
  exports.configure = configure;
  exports.AutoCompleteController = _autocompletecontroller.AutoCompleteController;
  function configure(config) {
    config.globalResources('./autocomplete');
  }
});