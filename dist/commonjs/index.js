'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AutoCompleteController = undefined;
exports.configure = configure;

var _autocompletecontroller = require('./autocompletecontroller');

var _autocompleteconfiguration = require('./autocompleteconfiguration');

exports.AutoCompleteController = _autocompletecontroller.AutoCompleteController;
function configure(aurelia, callback) {

  var config = new _autocompleteconfiguration.AutoCompleteConfiguration();

  if (typeof callback === 'function') {
    callback(config);
  }

  aurelia.globalResources('./autocomplete');
}