'use strict';

System.register(['./autocompletecontroller', './autocompleteconfiguration'], function (_export, _context) {
  "use strict";

  var AutoCompleteController, AutoCompleteConfiguration;
  function configure(aurelia, callback) {

    var config = new AutoCompleteConfiguration();

    if (typeof callback === 'function') {
      callback(config);
    }

    aurelia.globalResources('./autocomplete');
  }

  _export('configure', configure);

  return {
    setters: [function (_autocompletecontroller) {
      AutoCompleteController = _autocompletecontroller.AutoCompleteController;
    }, function (_autocompleteconfiguration) {
      AutoCompleteConfiguration = _autocompleteconfiguration.AutoCompleteConfiguration;
    }],
    execute: function () {
      _export('AutoCompleteController', AutoCompleteController);
    }
  };
});