'use strict';

System.register(['./autocompletecontroller'], function (_export, _context) {
  "use strict";

  var AutoCompleteController;
  function configure(config) {
    config.globalResources('./autocomplete');
  }

  _export('configure', configure);

  return {
    setters: [function (_autocompletecontroller) {
      AutoCompleteController = _autocompletecontroller.AutoCompleteController;
    }],
    execute: function () {
      _export('AutoCompleteController', AutoCompleteController);
    }
  };
});