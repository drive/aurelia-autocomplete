define(['exports', './autocompleteoptions'], function (exports, _autocompleteoptions) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.AutoCompleteConfiguration = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var AutoCompleteConfiguration = exports.AutoCompleteConfiguration = function AutoCompleteConfiguration() {
    _classCallCheck(this, AutoCompleteConfiguration);

    this.settings = _autocompleteoptions.autoCompleteOptions;
  };
});