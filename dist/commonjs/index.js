'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AutoCompleteController = undefined;
exports.configure = configure;

var _autocompletecontroller = require('./autocompletecontroller');

exports.AutoCompleteController = _autocompletecontroller.AutoCompleteController;
function configure(config) {
  config.globalResources('./autocomplete');
}